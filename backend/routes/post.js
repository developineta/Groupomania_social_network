const express = require('express');         // Importer le paquet Express
const router = express.Router();            // La création du router

const postCtrl = require('../controllers/post');     // Création de 'controller sauce' utilisant le fichier indiqué
const auth = require('../middleware/auth');             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué

// Les routes de sauces disponibles
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post('/:id/like', auth, postCtrl.likesDislikes);
router.post('/:id/comment', auth, postCtrl.postComment);


module.exports = router;                    // Exportation du router*/