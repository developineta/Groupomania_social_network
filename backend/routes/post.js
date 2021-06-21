const express = require('express');         // Importer le paquet Express
const router = express.Router();            // La création du router

const postCtrl = require('../controllers/post');        // Création de 'controller post' utilisant le fichier indiqué
const auth = require('../middleware/auth');             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
const adminPost = require('../middleware/admin-post');  // Middleware de vérification si le user est un admin ou pas

// Les routes de publications disponibles
router.post('/', auth, multer, postCtrl.createPost); // remettre auth
router.delete('/:id', auth, adminPost, postCtrl.deletePost); // remettre auth
router.get('/:id', auth, postCtrl.getOnePost); // remettre auth
router.get('/', auth, postCtrl.getAllPosts); // remettre auth

module.exports = router;                    // Exportation du router