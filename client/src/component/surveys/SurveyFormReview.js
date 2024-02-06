//SurveyFormReview shows users their form inputs for review
import React from "react";
import {connect} from "react-redux";
import formFields from "./formFields";
import _ from "lodash";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
   const reviewFields = _.map(formFields, ({name, label}) => {
     return (
        <div key={name}>
            <label>{label}</label>
            <div>{formValues[name]}</div>
        </div>
     );
   });
   
    return (
        <div>
            <h5>Please confirm your entries</h5>
           {reviewFields}
            <button className="yellow darken-3 btn-flat white-text" onClick={onCancel}>
            Back
            </button>
            <button onClick={() => submitSurvey(formValues, history)}  className="green btn-flat right white-text">
                Send Survey<i className="material-icons right">email</i></button>
        </div>
    )
}

//reduxStore
function mapStateToProps(state){
   // console.log(state);
    return{
        formValues: state.form.surveyForm.values   
    }
}
// el objeto values que pasamos como props en la funcion mapStateToProps, mediante reduxStore.connect le está pasando esto mismo como props al component SurveyFormReview asiq podemos hacer destructuring mas arriba
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview)); //con withRouter de react router se les pasa un objeto llamado History, que contiene las rutas por donde fue navegando el usuario (esto es para poder usarlo en el action creator ya que history se pasa como props, y actions no tiene react router en el scope)