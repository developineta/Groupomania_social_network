const express = require('express');         // Importer le paquet Express
const router = express.Router();            // La création du router

const postCtrl = require('../controllers/post');        // Création de 'controller post' utilisant le fichier indiqué
const auth = require('../middleware/auth');             // Définition de middleware d'authentification, utilisant le fichier indiqué
const multer = require('../middleware/multer-config');  // Définition de 'multer' pour la gestion des fichiers, utilisant le fichier indiqué
const adminPost = require('../middleware/admin-post');  // Middleware de vérification si le user est un admin ou pas
const myPost = require('../middleware/my-post');        // Middleware de vérification si c'est le compte d'utilisateur qui est connecté

// Les routes de publications disponibles
router.post('/', multer, postCtrl.createPost); //remettre auth
router.delete('/:id', myPost, adminPost, postCtrl.deletePost); //remettre auth
router.get('/:id', postCtrl.getOnePost); //remettre auth
router.get('/', postCtrl.getAllPosts); //remettre auth
router.get("/user", postCtrl.oneUserPosts); //remettre auth
//router.post('/:id/like', auth, postCtrl.likesDislikes);
//router.post('/:id/comment', auth, postCtrl.postComment);


module.exports = router;                    // Exportation du router