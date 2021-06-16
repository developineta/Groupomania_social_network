require('dotenv').config();
const mysql = require('../msqlConnect').connection;

const decodeToken = require('../utils/decodeToken');

module.exports = (req, res, next) => {
    let tokenData = decodeToken(req);
    let userId = tokenData[0];
    let adminUser = "SELECT admin FROM user WHERE userId=?";

    mysql.query(adminUser, [userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }

        if(result[0].admin){
            console.log("Vous êtes admin");
            next();
        }else{
            console.log("Vous n'êtes pas admin mais peut être c'est votre post !!")
            let tokenData = decodeToken(req);
            let userId = tokenData[0]; // Id d'utilisateur connecté
            console.log("userId recupéré dans le module", userId);
            let postId = req.params.id;

            let selectAuthor = "SELECT authorId FROM post WHERE postId=?";

            mysql.query(selectAuthor, [postId], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
        
                let authorId = result[0].authorId;
                console.log("my-post authorId", authorId);
                console.log("my-post userId", userId);

                if(userId == authorId){
                    console.log("C'est votre profil d'utilisateur !");
                    next();
                }else{
                    return res.status(401).json("Ce n'est pas votre profil d'utilisateur !!");
                }
            })
        }
    })
};