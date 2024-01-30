//SurveyField contains logic to render a single label an text input
import React from "react";

export default ({input, label}) => { //destructuring input es el prop que trae por defecto redux, pero label lo creamos nosotros en el Field tag
    //console.log(props.input); //son las funciones que proporciona redux a travez del <Field> tag


    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    )
}