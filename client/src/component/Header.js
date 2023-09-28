import React, {Component} from "react";
import { connect } from "react-redux";

class Header extends Component {

renderContent() {
   //console.log(this.props.auth.auth);  // en la function mapStateToProps habia puesta (auth) en vez de ({auth}) entonces me estaba trayendo un objeto y no el boolean que necesitaba para que renderContent() haga bien el switch case, me mostraba siempre el default. Lo arregle con .auth.auth para acceder al bolean pero ya lo volvi a como estaba en el video
   
    switch (this.props.auth) {
        case null:
          return;
        case false:
            return <li><a href="/auth/google">Login With Google</a></li>;
           
        default:
            return <li><a>Logout</a></li>;
    }
}

    render() {
        //console.log(this.props);
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                    <a href="" className="left brand-logo">Emaly</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                       {this.renderContent()}
                        
                    </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

/* function mapStateToProps(state) {
  return {auth: state.auth}; //el state seria entonces el index.js de la carpeta reducers
}; */

function mapStateToProps({auth}) {
    return {auth}; 
  };


export default connect(mapStateToProps)(Header);

//npm install --save materialize-css dentro del client package.json
//una vez instalada la libreria, se puede importar al principio del index.js del client side, referenciando al archivo css minimizado que está dentro de la carpeta node modules del directorio client.
