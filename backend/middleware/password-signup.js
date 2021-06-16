const passwordSchema = require('../models/Password');

// La vérification de mot de passe à la création
module.exports = (req, res, next) => {
    password = req.body.password;
    if (!passwordSchema.validate(password)) {
        res.status(400).json({ error: "Le format de mot de passe n'est pas correct ! Le mot de passe doit contenir au moins 8 caractères, au moins 1 majuscule, au moins 1 minuscule, au moins 1 chiffre et doit être sans les espaces !" });
    } else {
        next();
    }
};