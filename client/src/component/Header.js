import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                    <a href="" className="left brand-logo">Emaly</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="">Login with Google</a></li>
                        
                    </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;

//npm install --save materialize-css dentro del client package.json
//una vez instalada la libreria, se puede importar al principio del index.js del client side, referenciando al archivo css minimizado que está dentro de la carpeta node modules del directorio client.
