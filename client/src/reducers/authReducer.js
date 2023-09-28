import { FETCH_USER } from "../actions/types";



export default function(state = null, action) { //state = null para mostrarlo asi hasta que se complete la request de /api/current_user
    //console.log(action)
    switch (action.type) {
        case FETCH_USER:
        return action.payload || false; // si el usuario no está logueado no hay data en la respuesta y devuelve un string vacio que no queremos que se muestre. Queremos mostrar false, entonces agregamos el comparativo || para que javascript muestre false en vez de un string vacio. Un string vacio equivale a false en una comparativa. false or false = false
        default:
            return state;
    }
}
//entonces el reducer va a retornar null, false o el user model (contenido en el action.payload)