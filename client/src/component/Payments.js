import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
    render() {
        //debugger;

        return (
            <StripeCheckout
            name="Emaily" description="$5 for 5 surveys credits" amount={500} token={token => {console.log(token); this.props.handleToken(token)}} stripeKey={process.env.REACT_APP_STRIPE_PBKEY}>
                <button className="btn">Add Credits</button>
                </StripeCheckout>
        );
    }//sin agregar el button child component, stripe pone un boton default que es medio feo.. con el className btn le das algo mas de estilo
}

export default connect(null, actions) (Payments);