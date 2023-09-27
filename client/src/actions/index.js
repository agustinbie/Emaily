import axsios from "axios";
import { FETCH_USER } from "./types";

const fetchUser = () => {  //esto es un action creator, en redux estos action creator pasa "acciones" a los reducers y estos ultimos cambiar el state en el redux store y asi vuelven a loguear los componentes. 
    return function (dispatch) { //con reduxThunk, en vez de retornar directamente una accion, vamos a retornar una funcion que actua de dispensador, el dispatch va a acumular acciones hasta que las request se completen, y ahi recien va a enviar las acciones a los reducers.
    axios.get("/api/current_user")
    .then(res => dispatch({type:FETCH_USER, payload: res}));
    } //relative path porque en development mode el proxy se encarga de pasar la request al express. En produccion no hay proxy
};//agrega una ruta en el proxy de package json del client, pero ya no se hace asi, me parece que ya está contemplado en el setupProxy donde tiene /api como parametro (en package josn agregaba /api/* para que pueda redirigir para todas las rutas que pasen por /api)