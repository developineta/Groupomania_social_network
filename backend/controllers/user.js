// La gestion d'utilisateur

require('dotenv').config();                 // Importation de module Dotenv qui charge fichier .env
const mysql = require('../msqlConnect').connection;
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
require('../middleware/auth');
const fs = require("fs");
require('../middleware/multer-config');
const maskData = require('maskdata');   // Importe le paquet pour le masquage d'email

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  // La fonction pour 'hasher' le mot de passe
    .then(hash => {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = maskData.maskEmail2(req.body.email); // Masquage d'email
        const password = hash;

        let data = [firstName, lastName, email, password];
        mysql.query("INSERT INTO user SET firstName=?, lastName=?, email=?, password=?", data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "Utilisateur est créé !" });
        })
    })
    .catch(e => res.status(500).json(e));
};

exports.login = (req, res, next) => {
    const email = maskData.maskEmail2(req.body.email);
    const password = req.body.password;
    const getUser = "SELECT userId, password, admin FROM user WHERE email=?";

    mysql.query(getUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur n'est pas trouvé !" });
        }
        bcrypt.compare(password, result[0].password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: "Mot de passe n'est pas correct !" });
            }
            res.status(200).json({                                                  // Si l'utilisateur est trouvé
                token: jwt.sign(                                                    // La fonction de signature de 'token'
                        { userId: result[0].userId, admin: result[0].admin },       // Pour créer l'objet de l'Id et valeur d'admin de l'utilisateur correspondant
                        process.env.RANDOM_TOKEN_SECRET,                            // Utilisation de clé de 'token' secret, crée avec 'crypto' dans le fichier .env
                        { expiresIn: "24h" }                                        // Expiration du 'token' en 24h
                )
            })
        })
        .catch(e => res.status(500).json(e));
    })
};

exports.getOneUser = (req, res, next) => {
    let getUser = req.params.id;
    let oneUser = "SELECT firstName, lastName, email, role, imageUrl FROM user WHERE userId = ?";
    
    mysql.query(oneUser, [getUser], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length == 0) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
        }
        res.status(200).json(result);
    })
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;

    let getUser = "SELECT imageUrl FROM user WHERE userId=?";
    mysql.query(getUser, [userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result.length == 0) {
            return res.status(401).json({ error: "Utilisateur n'est pas trouvé !" });
        }

        const filename = result[0].imageUrl.split("/images/")[1];
        if (filename !== "imageDefault.png") {
            fs.unlink(`images/${filename}`, (e) => {                    // Supprime le fichier d'image
                if(e) {
                    console.log(e);
                }
            })
        }
        let deleteUser = "DELETE FROM user WHERE userId=?";
        mysql.query(deleteUser, [userId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(200).json({ message: "Votre compte est supprimé !" });
        })
    })
};

exports.modify = (req, res, next) => {
    const userId = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const role = req.body.role;
      
    if (req.body.firstName && req.body.lastName) {

        let changeInfos = "UPDATE user SET firstName=?, lastName=?, role=? WHERE userId=?";
        let data = [firstName, lastName, role, userId];
        mysql.query(changeInfos, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(200).json({ message: "Votre profil a été modifié !" });
        })
    }
};

exports.update_image = (req, res, next) => {

    if (req.file) {                                                 // Si change l'image, deux cas possibles
        const userId = req.params.id;
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

        let findImage = "SELECT imageUrl FROM user WHERE userId = ?";
        mysql.query(findImage, [userId], function (err, result) {
            const filename = result[0].imageUrl.split("/images/")[1];
            let setImage = "UPDATE user SET imageUrl=? WHERE userId=?";
            let data = [imageUrl, userId];
            if (err) {
                return res.status(500).json(err.message);
            }
            if (filename !== "imageDefault.png") {                  // Si l'image existait et on la change             
                fs.unlink(`images/${filename}`, () => {             // On supprime l'ancien fichier d'image
                    mysql.query(setImage, data, function (err, result) {
                        if (err) {
                            return res.status(500).json(err.message);
                        }
                        return res.status(200).json({ message: "L'image modifé !" });
                    });
                });
            } else {                                                // S'il y avait que l'image par défaut
                mysql.query(setImage, data, function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    return res.status(200).json({ message: "L'image est ajouté !" });
                })
            }
        })
        
    }

};

exports.update_password = (req, res, next) => {
    const userId = req.params.id;
    const newPassword = req.body.password;

    if (newPassword) {
        bcrypt.hash(newPassword, 10)
        .then(hash => {
            let changePassword = "UPDATE user SET password=? WHERE userId=?";
            let data = [hash, userId];
            mysql.query(changePassword, data, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                res.status(200).json({ message: "Votre mot de passe a été modifié !" });
            })
        })
        .catch(e => res.status(500).json(e));
    }
}