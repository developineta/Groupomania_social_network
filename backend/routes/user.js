const express = require('express');                 // Importer le paquet Express
const router = express.Router();                    // La création du router

const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');                             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');                  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
const passwordValidation = require('../middleware/password');           // Importation du middlewares de vérification de mot de passe
const passwordSignup = require('../middleware/password-signup');
const myProfile = require('../middleware/my-profile');                  // Middleware de vérification si c'est le compte d'utilisateur qui est connecté

// Les routes de user disponibles
router.post("/signup", passwordSignup, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.getOneUser); // remettre auth
router.get("/:id/post", auth, postCtrl.oneUserPosts); //remettre auth  One user all posts
router.delete("/:id", auth, myProfile, userCtrl.deleteUser); // remettre myProfile, auth
router.put("/:id", auth, myProfile, userCtrl.modify); // remettre myProfile, auth
router.put("/:id/update_image", myProfile, auth, multer, userCtrl.update_image); // remettre myProfile, auth
router.put("/:id/update_password", myProfile, auth, passwordValidation, userCtrl.update_password); // remettre myProfile, auth

module.exports = router;                            // Exportation du routeur