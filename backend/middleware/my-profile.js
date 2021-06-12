const mysql = require('../msqlConnect').connection;

module.exports = (req, res, next) => {
    try {
        console.log("Utilisateur connecté", req.params.id);
        const userId = req.params.id                        // Utilisateur qui est connecté
        let myProfile = "SELECT userId FROM user WHERE userId=?";
        mysql.query(myProfile, [userId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }

            if(result[0].userId === userId){
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