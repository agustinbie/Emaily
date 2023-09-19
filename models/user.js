const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const {Schema} = mongoose; //es equivalente a la linea 2

const userSchema = new Schema({
    googleId: String, //el id de google eran todos numeros pero son provistos dentro de un string (no es el googleID de keys en config, es el id de cada usuario que se loguea)
    })

mongoose.model("users", userSchema); //este comando crea una coleccion llamada "users" usando el Schema que creamos mas arriba

