const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require ("mongoose");

const User = mongoose.model("users")  //el comando model se puede usar con un argumento (users) para fetchear los existentes o con dos argumentos ("users", userSchema ) si queres agregar schemas a la coleccion
//usa esta forma de importar la model class porque con require genera errores en el testing porque carga muchas veces y crea muchas colecciones igual, tira error
//siempre que interactuemos con la base de datos nos va a devolver una promesa porque es asincronico


//una vez que identificamos o registramos el usuario ( con GoogleStrategy), hay que proveerle un token dentro de la cookie (para manejar cookies vamos a tener que importar una libreria nueva) para que pueda interactuar con la pagina mediante request.
//npm install --save cookie-session
//passport.seralizeUser es el metodo que se usa para generar este token 
passport.serializeUser((user, done) => { //esto en realidad se ejecuta despues que googlestrategy? usa el user de la DB de la L33
        done(null, user.id)  //user.id es el id automatico de registro de la DB, no es el googleID, facebookID, linkedinID ya que los usuarios pueden tener estos IDs al mismo tiempo 
                                //las strategys de passport entonces solo sirven para brindar los ID de las distintas redes sociales y registrar usuarios, pero luego de hacer ya nos manejamos con nuestros propios IDs de nuestra Mongo DB
})

passport.deserializeUser((id, done) => { //este metodo de passport sirve para deserializar el token cada vez que el cliente haga una request
        User.findById(id)  //tambien se podria hacer con findOne
        .then(user => {
                done(null, user);
        });
})


passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
                    }, (accessToken, refreshToken, profile, done) => {
                            /* console.log("access token: ", accessToken);
                            console.log("refresh token: ", refreshToken); */
                            //console.log("profile: ", profile);
                            User.findOne({googleId: profile.id}) //esto devuelve una promesa
                            .then((existingUser) => {  //.then para analizar la promesa
                                if (existingUser){
                                        //ya existe el usuario con el id de oauth
                                        done(null, existingUser); // done() le indica a GoogleStrategy que ya terminamos de registrar el usuario, que para eso sirve oauth, y puede seguir y finalizar el proceso de autenticación.
                                        //el primer parametro representa un error object, pero como esta todo bien al encontrar el usuario en la DB le pone null
                                        //el segundo parametro es el usuario que necesitabamos identificar o crear
                                }else {
                                        //no existe y hay que crear el ususario
                                        new User({googleId: profile.id}).save() //  .save() guarda la instacia en la coleccion
                                        .then(user => done(null, user)); //antes de hacer el calback con done, dice que necesita asegurarse de que el usuario fue guardado con exito en la DB, por eso le agrega un .then() para esperar la respuesta de la DB
                                        // cuando la DB le responde con el user (parametro de la arrow function) recien ahi ejecuta el don() con ese user respondido por la DB y no con el User instacioado por el passport en este file 
                                }
                            })
                            
                                    })); //GoogleStrategy({},()=>{});  instancia la estrategia con dos parametros: el primer parametro es un objeto con las claves de cliente
                                            // y el segundo parametro es una arrow function
                                            //ID client google oauth:  
                                            //secret client google oauth:  en keys.js