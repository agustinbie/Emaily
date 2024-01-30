import React from "react";
import {Link} from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
//el <i>add es el icon de materialize css.. esta importado con un link tag en el index de client/public
//buscar materialize css en google para ver los icons que tienen reemplazando la palabra dentro del <i>