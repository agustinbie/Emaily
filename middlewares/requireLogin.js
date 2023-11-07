module.exports = (req, res, next) => { //next es similar al "done" de passport, pasa la request al siguiente middleware.
    if (!req.user) {
        return res.status(401).send({error: "you must log in!"});
    }

    next(); // si esta logueado deja pasar la request 
}