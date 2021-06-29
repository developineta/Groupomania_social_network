// La vérification de mot de passe à la création

const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => {
    password = req.body.password;
    if (!passwordSchema.validate(password)) {
        res.status(400).json();
    } else {
        next();                             // Si le format de mot de passe correspond à la schèma, l'action peut être faite (mot de passe accepté)
    }
};