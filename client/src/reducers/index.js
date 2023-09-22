//este index es para que se lea automaticamente al importar el directorio "reducers"
import {combineReducers} from "redux";
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer
});