require('dotenv').config();
const mysql = require('../msqlConnect').connection;
const jwt = require("jsonwebtoken");

// Sur la route de publication on trouve userId dans le token et après trouve s'il est admin ou pas
function decodeToken(req) {                                                    
    let token = req.headers.authorization.split(' ')[1];              // Récupère uniquement le token du header de la requête
    let decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    decode = [decode.userId, decode.admin];
    return decode;
};
module.exports = (req, res, next) => {
    try {
        let tokenData = decodeToken(req);
        let authorId = tokenData[0];
        let adminUser = "SELECT admin FROM user WHERE userId=?";

        mysql.query(adminUser, [authorId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }

            if(result[0].admin){
                console.log("Vous êtes admin");
                next();
            }else{
                return res.status(401).json("Vous n'êtes pas admin !!");
            }
        });
    } catch {
         res.status(401).json({
             error: new Error("Vous n'avez pas les droits requis !!!")
         });
     }
};