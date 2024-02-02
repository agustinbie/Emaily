//SurveyFormReview shows users their form inputs for review
import React from "react";
import {connect} from "react-redux";
import formFields from "./formFields";
import _ from "lodash";

const SurveyFormReview = ({onCancel, formValues}) => {
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
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
            Back
            </button>
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
export default connect(mapStateToProps)(SurveyFormReview);