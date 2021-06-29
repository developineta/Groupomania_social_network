// Middleware qui vérifie si l'utilisateur connecté correspond au profil d'utilisateur qui est consulté

const decodeToken = require('../utils/decodeToken');

module.exports = (req, res, next) => {

    let tokenData = decodeToken(req);
    let authorId = tokenData[0];
    const userId = req.params.id

    if(userId == authorId){                 // Si l'id correspond, l'action peut être faite (les modifications sur le profil d'utilisateur)
        next();
        
    }else{
        return res.status(401).json();
    }
};