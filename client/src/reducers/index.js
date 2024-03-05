//este index es para que se lea automaticamente al importar el directorio "reducers"
import {combineReducers} from "redux";
import {reducer as reduxForm} from "redux-form"; // reducer es la variable de la libreria, no la podemos cambiar pero la podemos asignar a otra nuestra como reduxForm
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer
});