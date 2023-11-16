const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); //para manejar cookies porque express no puede
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
/* const passportConfig = require("./services/passport"); //para que el server ejecute passport al iniciar */
require("./models/user"); //esto tiene que ir antes que el require de passport para crear la coleccion y que passport la pueda usar
require("./models/survey"); 
require("./services/passport"); //como passport.js no exporta nada, es al pedo asignarlo a una variable passportConfig como la linea anterior, se puede solo ejecutar con require a secas
//const authRoutes = require("./routes/authRoutes");  //asigna el export de authRoutes.js a una variable




mongoose.connect(keys.mongoURI);

const app = express();

//---------
app.use(bodyParser.json()); //middleware para parsear las post u put request que vengan al server
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
require("./routes/billingRoutes")(app);// estas routes exportan una funcion que pasan inmediatamente a la app


/* app.get("/", (req, res) => {
    res.send({hi: "there pal"});
}); */


//---
if (process.env.NODE_ENV === "production") {
    //express will serve up production assets
    //like our main.js file, or main.css file (build)
    app.use(express.static("client/build")); //ni la requests viene con una ruta que no esta definida como handler en el server, que la busque primero en la carpeta client/build


    //express will serve up the index.html file
    //if it doesnt recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); //si la ruta de la request entranto no matchea con ./routes/authRoutes  ; ./routes/billingRoutes ni con alguna ruta dentro de client/build  (porque en ese orden se ejecuta el codigo), entonces entrega el index.html del client build
    })

};


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


//una vez que ejecutes create react app, pasa a agregar 2 scripts mas al packge json para poder correr ambos servidores desde un mismo terminal
//el primero es "client": "npm run start --prefix client" para que ejecute el comando npm dentro de la carpeta react
//"dev": "concurrently \"npm run server\" \"npm run client\" "  es el segundo script que ejecuta los primeros dos scripts al mismo tiempo gracias al modulo concurrently que hay que instalar desde npm
