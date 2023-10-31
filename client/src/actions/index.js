import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () =>  //esto es un action creator, en redux estos action creator pasa "acciones" a los reducers y estos ultimos cambiar el state en el redux store y asi vuelven a loguear los componentes. 
    async dispatch => { //con reduxThunk, en vez de retornar directamente una accion, vamos a retornar una funcion que actua de dispensador, el dispatch va a acumular acciones hasta que las request se completen, y ahi recien va a enviar las acciones a los reducers.
    const res = await axios.get("/api/current_user")
    dispatch({type:FETCH_USER, payload: res.data}); //data es una propiedad del response object, es la unica que nos interesa porque contiene el user id
    } //relative path porque en development mode el proxy se encarga de pasar la request al express. En produccion no hay proxy
;//agrega una ruta en el proxy de package json del client, pero ya no se hace asi, me parece que ya está contemplado en el setupProxy donde tiene /api como parametro (en package josn agregaba /api/* para que pueda redirigir para todas las rutas que pasen por /api)


export const handleToken = (token) => async dispatch => {
    const res = await axios.post("/api/stripe", token);

    dispatch({type: FETCH_USER, payload:res.data});
    //este action creator envia el token a nuestro backend, hay que llamarlo desde el Payment component cada vez que llegue un token de stripe por haber pagado
    
}