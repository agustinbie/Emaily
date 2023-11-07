const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    app.post("/api/stripe", requireLogin,  async (req, res) => {// con el segundo argumento que llama al middleware nos aseguramos que se ejecute en cada request que recibamos a este route handler
        //console.log(req.body);
        /* if (!req.user) {
            return res.status(401).send({error: "you must log in!"}); // este check seguro lo vas a tener que usar en distintos routes handlers, entonces para no repetir codigo se crea una carpeta de middlewares para poder llamarlos cuando los necesites
        } */


        const charge = await stripe.charges.create({amount: 500, currency: "usd", description: "$5 for 5 credits", source: req.body.id});
       // console.log(charge);
        
      // req.user siempre se puede acceder a la info del user model porque inicializamos passport en el index
      req.user.credits += 5; //modificar el user de esta request no va a modificar la database, para eso hay que usar la funcion save()
      const user = await req.user.save(); //save() es una request que devuelve el user recien actualizado, y para estar seguros de que estamos usando el model user mas reciente, guardamos en una variable nueva la respuesta de save()
    
      res.send(user)

    })

}
//asi como instalamos stripecheckout para el front, en el back necesitamos un npm module
//npm install --save stripe

//tambien hay que instalar un npm module para parsear las post request y hacerlas legibles o manipulables porque express no lo hace por default
//npm install --save body-parser