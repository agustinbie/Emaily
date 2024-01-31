//SurveyField contains logic to render a single label an text input
import React from "react";

export default ({input, label, meta: {error, touched}}) => { //destructuring input es el prop que trae por defecto redux, pero label lo creamos nosotros en el Field tag
    //console.log(props.input); //son las funciones que proporciona redux a travez del <Field> tag
    //console.log(meta); //este objeto meta trae el error asignado por reduxForm mediante la funcion validate, para que lo podemos usar para mostrarlo al usuario en el formulario
    //el meta object trae ademas del error property, el touched property, que es un boolean que indica si el usuario clickeo el campo por lo menos una vez. 
    //en el return, si touched es true y hay algun error, luego renderiza el error 
    return (
        <div>
            <label>{label}</label>
            <input {...input}  style={{marginBottom: "5px"}}/>
           <div className="red-text" style={{marginBottom: "20px"}}>{touched && error}</div>
        </div>
    )
}