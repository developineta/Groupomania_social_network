const express = require('express');                 // Importer le paquet Express
const router = express.Router();                    // La création du router

const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');                             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');                  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
//const passwordValidation = require('../middleware/password');           // Importation du middlewares de vérification de mot de passe
//const passwordSignup = require('../middleware/password-signup');
const myProfile = require('../middleware/my-profile');                  // Middleware de vérification si c'est le compte d'utilisateur qui est connecté

// Les routes de user disponibles
router.post("/signup", userCtrl.signup); //passwordSignup
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/:id/post", auth, postCtrl.oneUserPosts);
router.delete("/:id", auth, myProfile, userCtrl.deleteUser);
router.put("/:id", auth, myProfile, userCtrl.modify); 
router.put("/:id/update_image", myProfile, auth, multer, userCtrl.update_image); 
router.put("/:id/update_password", myProfile, auth, userCtrl.update_password); // passwordValidation

module.exports = router;                            // Exportation du routeur