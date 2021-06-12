const mysql = require('../msqlConnect').connection;

module.exports = (req, res, next) => {
    try {
        console.log("Utilisateur connecté", req.params.id);
        const userId = req.params.id
        let adminUser = "SELECT admin FROM user WHERE userId = ?";

        mysql.query(adminUser, [userId], function (err, result) {
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