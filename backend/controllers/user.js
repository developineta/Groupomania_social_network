require('dotenv').config();                 // Importation de module Dotenv qui charge fichier .env
const mysql = require('../msqlConnect').connection;
//console.log(mysql, 'Connection établie !');
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken"); 
const fs = require("fs");
const maskData = require('maskdata');   // Importer le paquet pour le masquage d'email

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)  // La fonction pour 'hasher' le mot de passe
        .then(hash => {
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = maskData.maskEmail2(req.body.email); // Masquage d'email
            const password = hash;

            let userSignup = "INSERT INTO user DATA (NULL, ?, ?, ?, NULL, imageUrl, ?, NOW())";
            let data = [firstName, lastName, email, password];
            mysql.query(userSignup, data, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                res.status(201).json({ message: "Utilisateur est créé !" });
            });
        })
        .catch(e => res.status(500).json(e));
};

exports.login = (req, res, next) => {
    const email = maskData.maskEmail2(req.body.email);
    const password = req.body.password;
    const getUser = "SELECT userId, password FROM user WHERE email=?";

    mysql.query(getUser, [email], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe n'est pas correct !" });
                }
                res.status(200).json({                      // Si l'utilisateur est trouvé
                    token: jwt.sign(                        // La fonction de signature de 'token'
                        { userId: result[0].userId },       // Pour créer l'objet de l'Id de l'utilisateur correspondant
                        process.env.RANDOM_TOKEN_SECRET,    // Utilisation de clé de 'token' secret, crée avec 'crypto' dans le fichier .env
                        { expiresIn: "24h" }                // Expiration du 'token' en 24h
                    )
                });
            })
            .catch(e => res.status(500).json(e));
    });
};

exports.getOneUser = (req, res, next) => {
    const userId = res.locals.userId;
    let getUser = req.params.id;

    if (getUser !== "myAccount") {
        let oneUser = "SELECT firstName, lastName, email, role, imageUrl FROM user WHERE userId = ?";
        mysql.query(oneUser, [userId, getUser], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(200).json(result);
        });
    } else {
        getUser = userId;
    }
};

exports.delete = (req, res, next) => {
    const password = req.body.password;
    const userId = res.locals.userId;

    let getUser = "SELECT password, imageUrl FROM user WHERE userId = ?";
    mysql.query(getUser, [userId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        bcrypt.compare(password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: "Mot de passe n'est pas correct !" });
                }
                const filename = result[0].imageUrl.split("/images/")[1];
                if (filename !== "imageDefault.jpg") {
                    fs.unlink(`images/${filename}`, (e) => { // Supprime le fichier d'image
                        if(err) {
                            console.log(err);
                        }
                    });
                }
                let deleteUser = "DELETE FROM user WHERE userId = ?";
                mysql.query(deleteUser, [userId], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    res.status(200).json({ message: "Utilisateur est supprimé !" });
                });
            })
            .catch(e => res.status(500).json(e));
    });
};

exports.modify = (req, res, next) => {
    const userId = res.locals.userId;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const role = req.body.role;
    const password = req.body.password;
    const filename = result[0].imageUrl.split("/images/")[1];
    
    // Deux cas différents : changement d'image ou changement des infos et changement de mot de passe
    if (req.file) { // Si change l'image, deux cas possibles
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

        let findImage = "SELECT imageUrl FROM user WHERE userId = ?";
        mysql.query(findImage, [userId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            setImage = "UPDATE user SET imageUrl=? WHERE userId=?";
            if (filename !== "imageDefault.jpg") { // Si l'image existait et on la change
                fs.unlink(`images/${filename}`, () => { // On supprime l'ancien fichier d'image
                    mysql.query(setImage, [imageUrl, userId], function (err, result) {
                        if (err) {
                            return res.status(500).json(err.message);
                        }
                        return res.status(200).json({ message: "L'image modifé !" });
                    });
                });
            } else { // S'il y avait que l'image par défaut
                mysql.query(setImage, [imageUrl, userId], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    return res.status(200).json({ message: "L'image est ajouté !" });
                });
            }
        });
    
    } else { // Si change le mot de passe ou les infos de profil
        let findPassword = "SELECT password FROM user WHERE userId = ?"; // Le changement de mot de passe
        mysql.query(findPassword, [userId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            const newPassword = req.body.newPassword;
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe n'est pas correct !" });
                    }
                    if (newPassword) {
                        bcrypt.hash(newPassword, 10)
                            .then(hash => {
                                let changePassword = "UPDATE user SET password=? WHERE userId = ?";
                                let data = [hash, userId];
                                mysql.query(changePassword, data, function (err, result) {
                                    if (err) {
                                        return res.status(500).json(err.message);
                                    }
                                    res.status(200).json({ message: "Le mot de passe est changé !" });
                                });
                            })
                            .catch(e => res.status(500).json(e));

                    } 
                })
                .catch(e => res.status(500).json(e));
        })
        // Si modifie les infos sauf l'image et sauf le mot de passe
        let modifyInfos = "UPDATE user SET email=?, firstName=?, lastName=?, role=? WHERE userId = ?"; // Si ne change pas le mot de passe et pas d'image
        let data = [email, firstName, lastName, role, userId];
        mysql.query(modifyInfos, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(200).json({ message: "Les changements sont pris en compte !" });
        })
    } 
};

