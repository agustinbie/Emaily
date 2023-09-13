const passport = require("passport");



module.exports = (app) => {
app.get("/auth/google", passport.authenticate("google", {scope: ["profile","email"]}));
                     //.authenticate usa el primer parametro "google" por defecto para referince a la estrategia de autenticacion de google Oauth. El segundo parametro es un objeto que contiene el scope con la info que queremos obtener del usuario de google

app.get("/auth/google/callback", passport.authenticate("google")); //si bien este handler es parecido al line19, en esta request va a venir el codigo de google ya que el usuario dió permiso, GoogleStrategy reconoce este codigo y actua distinto.
//con este handler ahora si probas localhost:5000/auth/google y das permiso, la pagina va a estar esperando pero nos envia el codigo que GoogleStrategy lo toma como el Access Token que pusimos en la linea 12 y lo logue ane la consola (flow raro entre lineas)
}; //exporta una funcion que ejecuta los route handlers recibiendo como parametro a app (express())