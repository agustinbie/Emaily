//keys.js contiene la logica para elegir el set de keys a usar dependiendo si estamos en production o developer enviroment

if (process.env.NODE_ENV === "production") {
    //we are in production - return the prod set of keys
    module.exports = require("./prod");
}else {
    //we are in development  - return de dev keys!
    module.exports = require("./dev") ;//exporta el archivo dev.js que esta en el mismo directorio de la compu local (en produccion no existe por el git ignore)
}//no hace falta cambiar nada del resto de codigo del server, por mas que hagan require keys.js la logica se ejecuta y exporta las keys apropiadas

//Sendgrid no me deja crear la cuenta asiq uso Postmark