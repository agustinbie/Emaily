const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); //para manejar cookies porque express no puede
const passport = require("passport");
const keys = require("./config/keys");
/* const passportConfig = require("./services/passport"); //para que el server ejecute passport al iniciar */
require("./models/user"); //esto tiene que ir antes que el require de passport para crear la coleccion y que passport la pueda usar
 require("./services/passport"); //como passport.js no exporta nada, es al pedo asignarlo a una variable passportConfig como la linea anterior, se puede solo ejecutar con require a secas
//const authRoutes = require("./routes/authRoutes");  //asigna el export de authRoutes.js a una variable



mongoose.connect(keys.mongoURI);

const app = express();


//--------
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //que exista por 30 dias en microsegundos
        keys: [keys.cookieKey]  //inventa una cualquiera en el config con git ignore
    })
);
app.use(passport.initialize());
app.use(passport.session());
//----------


//authRoutes(app); //usa la variable pasandole el parametro app = express() para que se ejecute el export de authRoutes.js 
//o lo que es lo mismo
require("./routes/authRoutes")(app); //el require equivale a la funcion de export de authRoutes.js y le pasa el parametro (app) inmediatamente.



/* app.get("/", (req, res) => {
    res.send({hi: "there pal"});
}); */



const PORT = process.env.PORT || 5000; //si estas corriendo el server en la compu local, la variable en entorno no va a estar declarada como con heroku, asiq usa el puerto 5000 en su lugar.

app.listen(PORT);

//pasos previos al deploy

//agrega un config en el package.json para que heroku utilice la version de node mas actualizada que la default que trae heroku
/* engines: {
    node: 20.2.0
    npm: 9.8.1
} */

//tambien hay que agregar un script en package.json para indicar a heroku como arrancar el server "start": "npm index.js"

//por ultimo, agregar el file .gitignore para no hacer commit de la carpeta node_modules que es pesada y no hace falta proveer las dependencias.

// deploy en render con url :   https://emaily-server-7l04.onrender.com