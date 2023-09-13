const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");


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