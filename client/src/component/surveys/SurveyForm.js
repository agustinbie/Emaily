//SurveyForm shows a form for a user to add input
import React, {Component} from "react";
import {reduxForm, Field} from "redux-form"; //redux form es muy similar a la funcion connect de redux (redux store que esta por encima de todos los componentes para no tener que ir pasando data hasta el componente padre para volver a bajarlo a otro componente)
import SurveyField from "./SurveyField";
import _ from "lodash";


const FIELDS = [
    {label: "Survey Title", name:"title"}, 
    {label: "Subject Line", name:"subject"},
    {label: "Email Body", name:"body"},
    {label: "Recipient List", name:"emails"}
];


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
        return _.map(FIELDS, ({label , name}) => {
            return <Field  key={name} component={SurveyField} type="text" label={label} name={name}/>
        })
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
               {this.renderFields()}
               <button type="submit">Submit</button>
               </form>
            </div>
        )
    }
}

export default reduxForm({form: "surveyForm"})(SurveyForm); //se conecta igual que connect de redux