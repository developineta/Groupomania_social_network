// La vérification de mot de passe à la modification

const passwordSchema = require('../models/Password');

module.exports = (req, res, next) => { 
    newPassword = req.body.password;
    if (!passwordSchema.validate(newPassword)) {
        res.status(400).json();
    } else {
        next();                                     // Si le format de nouveau mot de passe correspond à la schèma, l'action peut être faite (mot de passe modifié)
    }
};