//SurveyNew shows SurveyForm and SurveyFormReview
import React, {Component} from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import {reduxForm} from "redux-form";

class SurveyNew extends Component {
   /*  constructor(props) {
        super(props);
        this.state = {new:true};
    } */

    state = {showFormReview: false}; //esta linea es equivalente a el constructor de mas arriba con las propiedades que les quieras poner
    
    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})} />
        }
        return (<SurveyForm  onSurveySubmit={() => this.setState({showFormReview: true})}/>);
    }

    render() {
        return (
            <div>
              {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: "surveyForm"
})(SurveyNew);   //entonces reduxForm guarda todos los inputs en el redux store bajo el nombre "surveyForm". en SurveyForm.js tambien pusimos redux form pero con el parametro destroyOn Unmount false para que conserve los inputs si navegas hacia otro componente
//pero SurveyNew es el componente padre de SurveyForm y SurveyFormReview, y acá si dejamos destroyOnUnmount: true (eso toma por defecto reduxForm). Entonces siemrpe que naveguemos dentro de SurveyNew (surveyForm y SurveyFormReview) llos datos se conservan. Pero en el momento que desmontamos SurveyNew, por ejemplo al navegar hacia el Dashboard, los inputs del form se borran