// Middleware qui vérifie si l'utilisateur connecté est admin ou l'autheur de la publication pour avoir les droits de supprimer la publication

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
        if(result[0].admin){                        // Si l'utilissateur est admin, on procède l'action (la suppression de la publication)
            next();
        }else{
            let tokenData = decodeToken(req);
            let userId = tokenData[0];              // Id d'utilisateur connecté
            let postId = req.params.id;
            let selectAuthor = "SELECT authorId FROM post WHERE postId=?";

            mysql.query(selectAuthor, [postId], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
        
                let authorId = result[0].authorId;    // Si l'utilisateur connecté est l'autheur de la publication, l'action peut être faite
                if(userId == authorId){
                    next();
                }else{
                    return res.status(401).json();
                }
            })
        }
    })
}