require('dotenv').config();
const mysql = require('../msqlConnect').connection;
const fs = require("fs");
const jwt = require("jsonwebtoken");

// Utilise le token pour récuperer les donnés d'utilisateur sur les routes de publications
function decodeToken(req) {                                                    
    let token = req.headers.authorization.split(' ')[1];              // Récupère uniquement le token du header de la requête
    let decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    decode = [decode.userId];
    return decode;
};

exports.createPost = (req, res, next) => {
    let tokenData = decodeToken(req);
    let authorId = tokenData[0];
    console.log("Id utilisateur", authorId);
    let title = req.body.title;
    let content = req.body.content;
    let newPost = "INSERT INTO post SET authorId=?, title=?, postImageUrl=?, content=?";

    if (req.file !== undefined) {    // Si le post contient l'image
        let postImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        let data = [authorId, title, postImageUrl, content];                                                   
        mysql.query(newPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "L'article avec image est crée !" });
        });
    } else {                        // Si le post ne contient pas d'image        
        let postImageUrl = "";
        let data = [authorId, title, postImageUrl, content];                                                   
        mysql.query(newPost, data, function (err, res) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "L'article est crée !" });
        });
    }
};

/*function insertPost(){
    let authorId = "14";
    let title = "Test post";
    let content = "C'est le premier post qui est super interessant !";      
    let postImageUrl = "";
    let data = [authorId, title, postImageUrl, content];
                                                      
    mysql.query("INSERT INTO post SET authorId=?, title=?, postImageUrl=?, content=?", data, function (err, res) {
        if (err) {
            return res.status(400).json(err.message);
        } else (res) =>{
            res.status(201).json({ message: "Post créé !" });
        }
    });
};
insertPost();*/

exports.deletePost = (req, res, next) => { 
    const postId = req.params.id;

    let selectPost = "SELECT postImageUrl FROM post WHERE postId=?";
    mysql.query(selectPost, [postId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        const filename = result[0].postImageUrl.split("/images/")[1];
        if (filename !== "") {                                          // Si l'image existe
            fs.unlink(`images/${filename}`, (e) => { // Supprime le fichier d'image
                if(err) {
                    console.log(err);
                }
            });
        }
        let deletePost = "DELETE FROM post WHERE postId=?";
        mysql.query(deletePost, [postId], function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(200).json({ message: "L'article est supprimé !" });
        });
    });
};

exports.getOnePost = (req, res, next) => {
    let tokenData = decodeToken(req);
    let authorId = tokenData[0];
    let postId = req.params.id;

    let getPost = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    post.postId AS postId,
                    post.postDate AS postDate,
                    post.title AS postTitle,
                    post.postImageUrl AS postImageUrl,
                    post.content AS postContent,

                    FROM posts AS post

                    JOIN users AS user ON post.userId = user.id
                    WHERE post.id = ? GROUP BY post.id`;
    let data = [authorId, postId];
    let getPostById = mysql.format(getPost, data);
    mysql.query(getPostById, data, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result == 0) {
            return res.status(400).json({ message: "Le post n'existe pas !" });
        }
        res.status(200).json(result);
    });
};
exports.getAllPosts = (req, res, next) => {
    let tokenData = decodeToken(req);
    let authorId = tokenData[0];

    let getPosts = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    post.postId AS postId,
                    post.postDate AS postDate,
                    post.title AS postTitle,
                    post.postImageUrl AS postImageUrl,

                    FROM posts AS post
                    
                    JOIN users AS user ON post.userId = user.id
                    GROUP BY post.id ORDER BY postDate DESC`;

    getPosts = mysql.format(getPosts, [authorId]);
    mysql.query(getPosts, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result == 0) {
            return res.status(400).json({ message: "Le post n'existe pas !" });
        } else {
            res.status(200).json(result);
        }
    });
};

exports.oneUserPosts = (req, res, next) => {

    let getUserPosts = `SELECT
                       user.id AS postByUserId,
                        user.firstName AS publicationCreateByUserNom,
                        user.lastName AS publicationCreateByUserPrenom,
                        post.postId AS postId,
                        post.postDate AS postDate,
                        post.title AS postTitle,
                        post.postImageUrl AS postImageUrl,

                        FROM posts AS post
                        
                        JOIN users AS user ON post.authorId = user.id
                        WHERE user.id=?
                        GROUP BY post.id ORDER BY postDate DESC`;

    let data = [authorId, userId];
    getUserPosts = mysql.format(getUserPosts, data);

    mysql.query(getUserPosts, (error, posts) => {
        if (error) {
            res.status(400).json({ error: "Aucune publication trouvée !" });
        } else {
            res.status(200).json(posts);
        }
    });
};