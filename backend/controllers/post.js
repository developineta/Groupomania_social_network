// La gestion de publications

require('dotenv').config();
const mysql = require('../msqlConnect').connection;
const fs = require("fs");
require('../middleware/auth');
require('../middleware/multer-config');

const decodeToken = require('../utils/decodeToken');

exports.createPost = (req, res, next) => {
    let tokenData = decodeToken(req);
    let authorId = tokenData[0];

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
            res.status(201).json({ message: "La publication avec image est ajouté !" });
        });
    } else {                        // Si le post ne contient pas d'image        
        let postImageUrl = "";
        let data = [authorId, title, postImageUrl, content];                                             
        mysql.query(newPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "La publication est ajouté !" });
        })
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
            const filename = result[0].postImageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, (err) => {              // Supprime le fichier d'image
                mysql.query(deletePost, [postId], function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    res.status(200).json({ message: "La publication a été supprimé !" });
                })
            });
        } else {
            mysql.query(deletePost, [postId], function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                res.status(200).json({ message: "La publication a été supprimé !" });
            })
        }
    })
};

exports.getOnePost = (req, res, next) => {
    let postId = req.params.id;

    let getPost = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    user.imageUrl AS postAuthorImageUrl,
                    user.admin AS postAdmin,
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
    
        let authorId = result[0].authorId;
        let data = [authorId, postId];
        mysql.query(getPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            if (result == 0) {
                return res.status(400).json({ message: "L'article n'existe pas !" });
            }
            res.status(200).json(result);
        })
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
        if (result.length == 0) {
            return res.status(400).json(result);
        }
        res.status(200).json(result);
    })
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


    mysql.query(getUserPosts, [authorId], function (err, posts) {
        if (err) {
            res.status(400).json({ error: "Aucune publication trouvée !" });
        }
        res.status(200).json(posts);
    })
}