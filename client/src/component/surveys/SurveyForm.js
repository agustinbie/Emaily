//SurveyForm shows a form for a user to add input
import React, {Component} from "react";
import {reduxForm, Field} from "redux-form"; //redux form es muy similar a la funcion connect de redux (redux store que esta por encima de todos los componentes para no tener que ir pasando data hasta el componente padre para volver a bajarlo a otro componente)
import SurveyField from "./SurveyField";
import _ from "lodash";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";




class SurveyForm extends Component { //todos los values de este form tag de redux se pueden enviar al backend mediante la funcion handleSubmit provista por redux en los props de este componente
    
   /*  renderFields(){ //el Flied tag de redux tiene un monton de funciones que se pasan como props al componente que está renderizando, en este caso el SurveyField. Asiq dentro de SurveyField se pueden usar 
        return (//label="Survey Title" se pasa como prop al componente que renderiza el Flied tag
            <div>
                <Field label="Survey Title" type="text" name="title" component={SurveyField} />
                <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
                <Field label="Email Body" type="text" name="body" component={SurveyField} />
                <Field label="Recipient List" type="text" name="emails" component={SurveyField} />

            </div>
        )
    } */

    renderFields(){
        return _.map(formFields, ({label , name}) => {
            return <Field  key={name} component={SurveyField} type="text" label={label} name={name}/>
        })
    }
    
    render() {
        return (          ///este console log es ejecutado solo si el form es valido    <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
            <div>
                  <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}> 
               {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                 <button className="teal btn-flat right white-text" type="submit">
                  Next <i className="material-icons right">done</i></button>
                    
               
               </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    /* if (!values.title) {
        errors.title = "You must provide a title"; //reduxForm automaticamente conecta estos errores con los Fields que tengan el mismo nombre para el atributo name
    }; */

    errors.emails = validateEmails(values.emails || "");
    //lodash
    _.each(formFields, ({name})=> {
        if (!values[name]){
            errors[name] =`You must provide a value`
        }
    })

    

    return errors;
}
//reduxForm tiene la funcion validate, que determina si el formulario es valido o no. Si la funcion retorna el objeto "errors" vacio, entonces es valido
export default reduxForm({validate: validate, form: "surveyForm", destroyOnUnmount: false})(SurveyForm); //se conecta igual que connect de redux