const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
//const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const postmark = require("postmark");
const Survey = mongoose.model("surveys");
const keys = require("../config/keys");

//librerias para manipular records de los webhooks
const _ = require("lodash");
const {Path} = require("path-parser");
const {URL} = require("url");
//---------

module.exports = app => { 

    app.get("/api/surveys", requireLogin, async (req, res) => {
        const surveys = await Survey.find({_user: req.user.id})  //esta respuesta puede inlcuir 50 surveys del usuario con 10k recipients cada una
            .select({recipients: false});  //cpon el metodo select() de mongoose se puede incluir o excluir campos del record en la coleccion
        res.send(surveys);
    })


    //                              este async tiene que estar porque mailer.send() es async tambien 
    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {// requireLogin es la funcion que exporta el middleware, se ejecutan todas las funciones que pongamos como argunmentos hasta que llegue a la arrow function del routehandler
        //la req que estamos esperando del front tiene que tener atributos title, subject, body, recipients, _user
        const {title, subject, body, recipients} = req.body; //req.body es el default de js, no es el atributo de la request que estamos desestructurando 
        const survey = new Survey({
            //title: title,    esto se puede abreviar porque es lo mismo (ES)
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email => {return {email: email.trim()}}),  //      req.body.recipients es una lista de emails. Al hacer el split, se transforma en un array. A ese array se le hace un mapeo para genera un array de objetos {email: agusintbielewi@gmail.com}
            //recipients: recipients.split(",").map(email => ({ email})),
            //las propiedades yes y no ya se instancian en 0 por default, no hace falta definirlas
            _user: req.user.id, //id de mongoos
            dateSent: Date.now()
        });

        /* console.log(survey.recipients[0].email);
        console.log(survey.title);
        console.log(survey.subject);
        console.log(survey.body);
        console.log(surveyTemplate(survey)); */

        try {
        const client = new postmark.ServerClient(keys.postmarkKey);
         await client.sendEmail({ "From": "agustin.bielewicz@mi.unc.edu.ar",
            "To": survey.recipients[0].email,
            "Subject": survey.subject,
            "HtmlBody": surveyTemplate(survey, keys.redirectDomain),
            "TextBody": survey.body,
            "MessageStream": "broadcast",
            "TrackLinks": "HtmlAndText"  });

        //great place to send a email!
        //const mailer = new Mailer(survey, surveyTemplate(survey)); //cada vez que creen un survey nuevo se va a generar un mailer con los datos de la survey y un template para el body 
        
        /* try { */
        //await mailer.send();// para testear estos mails no usa postman porque se complica con el requerimiento de estar logueado. En su lugar desde el browser usa el modulo axios para hacer las request al server. Importa Axios desde el index del client side
        //como mailer.send() es async function, está esperando la respuesta de la api de sendgrid. Hay que marcar como async esta arrow function entera del surveyroute handler. linea 12
        
         await survey.save();
         req.user.credits -= 1;
        const user = await  req.user.save(); //EN LA WEB DE MONGODB RECORDAR CAMBIAR DE EMALYPROD A PROJECT 0 SEGUN CORRESPONDA DONDE ESTES HACIENDO LAS PRUBEAS

        res.send(user); // para actualizar el estado del user logueado, con menos creditos
        } catch (err){
                res.status(422).send(err);
        }
        
       
        /* } catch (err) {
            res.status(422).send(err);
        } */
    });


    app.get("/api/surveys/:surveyId/:choice", (req, res) => {// en el template pusimos una url que te manda a esta ruta despues de clickear la survey desde el email
        res.send("Thanks for voting!");
        
    })


    app.post("/api/surveys/webhooks", (req, res) => {  //npm install --save lodash path-parser
        console.log(req.body);
        const p = new Path("/api/surveys/:surveyId/:choice") ;//la Path library sirve para extraer datos de una url, en este caso queremos extraer : survey Id y la choice
      
      
        _.chain(req.body) //la funcion chain de lodash ayuda a encadenar funciones sin tenes que asignar los resultados a distintas variables
        .map(({email, url}) => {  //este mapeo esta diseñado para manipular la webhooks data de sendgrid
            //URL librery sirve para parsear una url y poder manipularla
           const match = p.test(new URL(url).pathname); //no se puede hacer destructuring aca porque p.test(pathname) puede traer todo undefined (si es que no hay nignuna notificacion del webhook con surveryId y choice en el url) y entonces el destructurin va a dar error
            if (match) {// si match existe y no es undefined
                return {email, surveyId: match.surveyId, choice: match.choice};
            }

        })
        .compact() //compact es una funcion de lodash que toma un array y le quita todos los undefined que pueda esta conteniendo dentro
         .uniqBy( "email", "surveyId") //esta funcion de lodash elimina los registros de un array que tengan duplicadas las propiedades que se indiquen como parametros, email y surveyId en este caso. Pero no quiere decir que si hay repetidos email los va a borrar, sino que un mismo email tiene que tener varios records con el mismo surveyId para que se borren
         .each(({surveyId, email, choice}) => {
            Survey.updateOne({
                _id: surveyId,   //en mongo se usa _id para los id de los records
                recipients: {
                    $elemMatch: {email: email, responded: false}
                }
            }, {$inc: {[choice]: 1},    //le survey coleccion tiene como atributo "yes":0 y "no":0 com default. $inc es un operador de mongoose que incrementa un atributo en las unidades que se le indique en este caso en 1. Como no sabemos si la choice del evento (notificado por sendgrid) es yes or no usar key interpolation para reemplazar [choice] por "yes": +1 o "no": +1 segun el caso (encrementa el numero de votos de la survey)
            $set: {"recipients.$.responded": true},  //$set es otro operador de mongoose para setear atributos de una coleccion. Dentro de la survey encontrada en elñ primer parametro de la funcion updateOne() va a buscar dentro del atributo recipients:, el elemento encontrado por $elemMatch y a ese elemnto le va a setear la propiedad responden:, por true
            lastResponded: new Date()  //este es un atributo de la coleccion general Survey, no de cada recipient
            }).exec();  //.exec() se tiene que poner al final de una query mongo para que se ejecute
            //este update a la base de datos es async pero como sendgrid no espera ninguna respuesta de nosotros no vamos a marcar el codigo como await
            // ver video 209 para ver como probar querys de mongo en el terminal con el SLI de node
        })  
         .value(); //la funcion value devuelve el array final y termina la cadena
    
        res.send({});
    })

};

//se crea un mailer, un objeto que contiene la instacia de survey junto a un template de email, y este mailer se envia a un provider externo que se encarga de distribuir hacia todos los recipients
//sendgrid.com






