import "materialize-css/dist/css/materialize.min.css";  //cuando no pones from "./", webpack interpreta que se trata de un npm module y lo busca directamente en el directorio de node_modules. Y como no va a guardar nada como una variable, no hace falta importar como materializeCSS from "materiliaze"; solo import
import React from "react";
import ReactDOM from "react-dom";  //en el front react usa webpack y babel, que funcionan bien con ES2015 modules, por eso usamos import sintax. En cambio en el back de express usamos node js que funciona solo con common js 
import {Provider} from "react-redux";
import { createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";



import App from "./component/App";
import reducers from "./reducers";
import axios from "axios";
window.axios =axios; //video 153

//redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
    <Provider store={store}><App /></Provider>, //el Provider es un react component padre que va a estar leyendo el state store de redux. Cada vez que se produzca un cambio en el state, Provider va a re renderizar todos los demas componentes hijos a travez del app component que està loguenado.
    document.querySelector("#root"));


//revisar nota nro 74 despues de ver el video 75
// npm install --save react-stripe-checkout  

console.log("stripe key is ", process.env.REACT_APP_STRIPE_PBKEY); //no vamos a usar la secret key porque no vamos a ctivar la cuenta de stripe
console.log("Enviroment is ", process.env.NODE_ENV);

//acordarse que cada vez que quieras hacer un deploy hay que hacer el build de create react app 
//npm run build  dentro del directorio client
//en realidad el buiid no se incluye en el deploy, pero todo el seteo que se hace en el index del server express con las rutas de build es porque el build se hace pero en el host (heroku o render)
//para indicarle al host que hay un client side (create react app) que hay que hacer el build hay que agregar un script en el package json del server
//"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
//en render hay que cargarle los scripts en settings, ver nota 127