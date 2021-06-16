const mysql = require('../msqlConnect').connection;

const decodeToken = require('../utils/decodeToken');

module.exports = (req, res, next) => {

    let tokenData = decodeToken(req);
    let authorId = tokenData[0];
    const userId = req.params.id
    console.log("Profil user consulté", req.params.id);
    console.log("Profil user connecté", userId);

    if(userId == authorId){
        console.log("C'est votre profil d'utilisateur !");
        next();
        
    }else{
        return res.status(401).json("Ce n'est pas votre profil d'utilisateur !!");
    }
};