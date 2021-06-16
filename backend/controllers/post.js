require('dotenv').config();
const mysql = require('../msqlConnect').connection;
const fs = require("fs");
require('../middleware/auth');
require('../middleware/multer-config');

const decodeToken = require('../utils/decodeToken');

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
        console.log("Data pour post", data);                                                   
        mysql.query(newPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "L'article est crée !" });
        });
    }
};

exports.deletePost = (req, res, next) => { 
    let postId = req.params.id;

    let selectImage = "SELECT postImageUrl FROM post WHERE postId=?";
    let deletePost = "DELETE FROM post WHERE postId=?";
    
    mysql.query(selectImage, [postId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        
        if (result[0].postImageUrl !== "") {                          // Si l'image existe
            const filename = res[0].postImageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, (e) => { // Supprime le fichier d'image
                if(err) {
                    return res.status(500).json(err.message);
                }
                res.status(200).json({ message: "L'image est enlevée !" });
            })
        }
    })
    mysql.query(deletePost, [postId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(200).json({ message: "L'article est supprimé !" });
    });
};

exports.getOnePost = (req, res, next) => {
    let postId = req.params.id;

    let getPost = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    post.postId AS postId,
                    post.date AS postDate,
                    post.title AS postTitle,
                    post.postImageUrl AS postImageUrl,
                    post.content AS postContent

                    FROM post

                    JOIN user ON post.authorId = user.userId
                    WHERE post.authorId=? AND postId=? GROUP BY post.authorId`;
    
    let selectAuthor = "SELECT authorId FROM post WHERE postId=?";
    
    mysql.query(selectAuthor, [postId], function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        //res.status(200).json({ message: "L'autheur est séléctionné !", result })
        console.log("L'auteur est sélectionné !");
    
        let authorId = result[0].authorId;
        console.log("authorId", authorId);
        let data = [authorId, postId];
        console.log("get data", data);
        mysql.query(getPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            if (result == 0) {
                return res.status(400).json({ message: "L'article n'existe pas !" });
            }
            console.log("result de get one post", result);
            res.status(200).json(result);
        });
    })
};

exports.getAllPosts = (req, res, next) => {

    let getPosts = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    post.postId AS postId,
                    post.date AS postDate,
                    post.title AS postTitle,
                    post.postImageUrl AS postImageUrl

                    FROM post
                    
                    JOIN user ON post.authorId = user.userId
                    GROUP BY post.postId ORDER BY postDate DESC`;

    mysql.query(getPosts, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result == 0) {
            return res.status(400).json({ message: "Le post n'existe pas !" });
        }
        res.status(200).json(result);
    });
};

exports.oneUserPosts = (req, res, next) => {
    let authorId = req.params.id;

    let getUserPosts = `SELECT user.userId AS postAuthorId,
                        user.firstName AS postAuthorFirstName,
                        user.lastName AS postAuthorLastName,
                        post.postId AS postId,
                        post.date AS postDate,
                        post.title AS postTitle,
                        post.postImageUrl AS postImageUrl,
                        post.content AS postContent

                        FROM post

                        JOIN user ON post.authorId = user.userId
                        WHERE post.authorId=?
                        GROUP BY post.postId ORDER BY postDate DESC`;


    mysql.query(getUserPosts, [authorId], function (error, posts) {
        if (error) {
            res.status(400).json({ error: "Aucune publication trouvée !" });
        }
        res.status(200).json(posts);
    });
};