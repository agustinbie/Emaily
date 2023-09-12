const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
                    }, (accessToken, refreshToken, profile, done) => {
                            console.log("access toke", accessToken);
                            console.log("refresh token", refreshToken);
                            console.log("profile", profile);
                                    })); //GoogleStrategy({},()=>{});  instancia la estrategia con dos parametros: el primer parametro es un objeto con las claves de cliente
                                            // y el segundo parametro es una arrow function
                                            //ID client google oauth:  
                                            //secret client google oauth:  en keys.js

app.get("/auth/google", passport.authenticate("google", {scope: ["profile","email"]}));
                     //.authenticate usa el primer parametro "google" por defecto para referince a la estrategia de autenticacion de google Oauth. El segundo parametro es un objeto que contiene el scope con la info que queremos obtener del usuario de google

app.get("/auth/google/callback", passport.authenticate("google")); //si bien este handler es parecido al line19, en esta request va a venir el codigo de google ya que el usuario dió permiso, GoogleStrategy reconoce este codigo y actua distinto.
//con este handler ahora si probas localhost:5000/auth/google y das permiso, la pagina va a estar esperando pero nos envia el codigo que GoogleStrategy lo toma como el Access Token que pusimos en la linea 12 y lo logue ane la consola (flow raro entre lineas)


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