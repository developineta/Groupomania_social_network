const express = require('express');                 // Importer le paquet Express
const router = express.Router();                    // La création du router

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');                             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');                  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
const passwordValidation = require('../middleware/password');           // Importation du middlewares de vérification de mot de passe
const passwordModification = require('../middleware/password-modify');

// Les routes de user disponibles
router.post("/signup", passwordValidation, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.getOneUser);
router.delete("/delete", auth, userCtrl.delete);
router.put("/modify", auth, passwordModification, multer, userCtrl.modify);

module.exports = router;                            // Exportation du routeur