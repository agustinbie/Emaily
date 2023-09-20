import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi There, Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href="/auth/google">Sign In With Google</a>
      </header>
     
    </div>
  );
}//con el setupProxy.js file que agrega, todas las redirects van de los anchor tags van a ir a local host 5000,pero hace falta agregar una URI para la redirect de google oauth porque deja de funcionar como en el server de express 
//este proxy solo es para conectar los dos servidores en development enviroment (localhost 3000 react y localhost 5000 express)
//en produccion, react app se compila con webpack y babel todo en una carpeta build y se sirve al servidor principal que seria el link de render.com
//entonces ya no hay dos servidores, cuando hagan click en sign in, el anchor tag los manda al link correcto y el oauth flow deberia funcionar bien
//Otra razon para usar el proxy en react app es por las cookies que usamos para autenticar cada request. Por default, si la request va dirigida directamente a otro dominio, el browser elimina las cookies (por seguridad). Con el proxy, la request sigue dirigiendose a localhost3000 pero el proxy lo pasa al puerto 5000 entonces no piede cookies
// Otra razon para usar el proxy es porque el browser, tambien como medida de seguridad, a las request que van hacia otro dominio las tilda de CORS (cross origin resource sharing) y lo bloquea, pensando que estas haciendo un request maliciosa con el js que logueó
//Ver video 68. min 17:00 para repasar el Oauth flow

export default App;
