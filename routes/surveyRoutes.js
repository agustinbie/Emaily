const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");

module.exports = app => {
    app.post("/api/surveys"), requireLogin, requireCredits, (req, res) => {// requireLogin es la funcion que exporta el middleware, se ejecutan todas las funciones que pongamos como argunmentos hasta que llegue a la arrow function del routehandler
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
    }

};