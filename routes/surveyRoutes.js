const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
//const Mailer = require("../services/mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const postmark = require("postmark");
const Survey = mongoose.model("surveys");
const keys = require("../config/keys");

module.exports = app => { 

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


    app.get("/api/surveys/thanks", (req, res) => {// en el template pusimos una url que te manda a esta ruta despues de clickear la survey desde el email
        res.send("Thanks for voting!");
    })

};

//se crea un mailer, un objeto que contiene la instacia de survey junto a un template de email, y este mailer se envia a un provider externo que se encarga de distribuir hacia todos los recipients
//sendgrid.com