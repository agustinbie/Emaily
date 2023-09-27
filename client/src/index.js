import "materialize-css/dist/css/materialize.min.css";  //cuando no pones from "./", webpack interpreta que se trata de un npm module y lo busca directamente en el directorio de node_modules. Y como no va a guardar nada como una variable, no hace falta importar como materializeCSS from "materiliaze"; solo import
import React from "react";
import ReactDOM from "react-dom";  //en el front react usa webpack y babel, que funcionan bien con ES2015 modules, por eso usamos import sintax. En cambio en el back de express usamos node js que funciona solo con common js 
import {Provider} from "react-redux";
import { createStore, applyMiddleware} from "redux";
import reduxThunk from "redux-thunk";



import App from "./component/App";
import reducers from "./reducers";

//redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
    <Provider store={store}><App /></Provider>, //el Provider es un react component padre que va a estar leyendo el state store de redux. Cada vez que se produzca un cambio en el state, Provider va a re renderizar todos los demas componentes hijos a travez del app component que està loguenado.
    document.querySelector("#root"));


//revisar nota nro 74 despues de ver el video 75