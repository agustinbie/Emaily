const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send({hi: "there"});
});


const PORT = process.env.PORT || 5000; //si estas corriendo el server en la compu local, la variable en entorno no va a estar declarada como con heroku, asiq usa el puerto 5000 en su lugar.

app.listen(PORT);

//pasos previos al deploy

//agrega un config en el package.json para que heroku utilice la version de node mas actualizada que la default que trae heroku
/* engines: {
    node: 20.2.0
    npm: 9.8.1
} */

//tambien hay que agregar un script en package.json para indicar a heroku como arrancar el server "start": "npm index.js"

//por ultimo, agregar el file .gitignore para no hacer commit de la carpeta node_modules que es pesada y no hace falta proveer las dependencias.

// deploy en render con url :   https://emaily-server-7l04.onrender.com