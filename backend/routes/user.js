const express = require('express');                 // Importer le paquet Express
const router = express.Router();                    // La création du router

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');                             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');                  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
const passwordValidation = require('../middleware/password');           // Importation du middlewares de vérification de mot de passe
const passwordModification = require('../middleware/password-modify');
const admin = require('../middleware/admin');                           // Middleware de vérification si le user est un admin ou pas
const myProfile = require('../middleware/my-profile');                  // Middleware de vérification si c'est le compte d'utilisateur qui est connecté

// Les routes de user disponibles
router.post("/signup", passwordValidation, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", userCtrl.getOneUser); // remettre auth
router.delete("/:id", myProfile, admin, userCtrl.delete); // remettre auth
router.put("/:id", myProfile, admin, passwordModification, multer, userCtrl.modify); // remettre auth

module.exports = router;                            // Exportation du routeur