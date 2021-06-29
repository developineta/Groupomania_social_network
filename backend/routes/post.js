const express = require('express');         // Importer le paquet Express
const router = express.Router();            // La création du router

const postCtrl = require('../controllers/post');        // Création de 'controller post' utilisant le fichier indiqué
const auth = require('../middleware/auth');             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
const adminPost = require('../middleware/admin-post');  // Middleware de vérification si le user est un admin ou pas

// Les routes de publications disponibles
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, adminPost, postCtrl.deletePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;                    // Exportation du router