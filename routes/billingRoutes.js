const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey)

module.exports = app => {
    app.post("/api/stripe", (req, res) => {

    })
}
//asi como instalamos stripecheckout para el front, en el back necesitamos un npm module
//npm install --save stripe

//tambien hay que instalar un npm module para parsear las post request y hacerlas legibles o manipulables porque express no lo hace por default
//npm install --save body-parser