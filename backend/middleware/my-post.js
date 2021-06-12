require('dotenv').config();
const mysql = require('../msqlConnect').connection;
const jwt = require("jsonwebtoken");

// Sur la route de publication on trouve userId dans le token et après trouve s'il est admin ou pas
function decodeToken(req) {                                                    
    let token = req.headers.authorization.split(' ')[1];              // Récupère uniquement le token du header de la requête
    let decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    decode = [decode.userId];
    return decode;
};
module.exports = (req, res, next) => {
    try {
        let tokenData = decodeToken(req);
        let authorId = tokenData[0];
        let myProfile = "SELECT userId FROM user WHERE userId=?";

        mysql.query(myProfile, [authorId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }

            if(result[0].userId === authorId){
                console.log("C'est votre profil d'utilisateur !");
                next();
            }else{
                return res.status(401).json("Ce n'est pas votre profil d'utilisateur !!");
            }
        });
    } catch {
         res.status(401).json({
             error: new Error("Vous n'avez pas les droits requis !!!")
         });
     }
};