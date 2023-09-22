import React from "react";
import {BrowserRouter, Route} from "react-router-dom";


const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = ()=> {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header></Header>
                    <Route path="/" exact component={Landing} />
                    <Route path="/surveys" exact component={Dashboard} />  
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
};//si el path= contiene "/" va a mostrar el landing siempre. Para que esto no suceda hay que agregarle la propiedad exact={true} o simplemente exact (jsx le asigna valor true) para que el react router sea estricto en el matcheo de rutas
// como Header tiene que aparecer todo el tiempo, no hace falta condicionarlo a un path en especifico. No hace falta usar React Router
//todavia no se como agregar dos componentes para que aparezcan en un path especifico
//react router es para decidir cuales componentes mostrar en cada ruta. Para decidir qué contenido mostrar en cada componente se usa el state de redux store


export default App;