const mysql = require('../msqlConnect').connection;
const fs = require("fs"); 

exports.createPost = (req, res, next) => {
    const userId = res.locals.userId;
    const title = req.body.title;
    const content = req.body.content;

    if (req.file !== undefined) {    // Si le post contient l'image
        let postImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;                                                          
        let newPost = "INSERT INTO post VALUES (NULL, ?, ?, ?, ?, NULL, NULL, NOW())";     
        let data = [userId, title, postImageUrl, content];                                                   
        mysql.query(newPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "L'article est crée !" });
        });
    } else {                        // Si le post ne contient pas d'image        
        let postImageUrl = "";
        let newPost = "INSERT INTO post VALUES (NULL, ?, ?, ?, ?, NULL, NULL, NOW())";     
        let data = [userId, title, postImageUrl, content];                                                   
        mysql.query(newPost, data, function (err, result) {
            if (err) {
                return res.status(500).json(err.message);
            }
            res.status(201).json({ message: "L'article est crée !" });
        });
    }
};

exports.deletePost = (req, res, next) => { 
    const postId = req.params.postId;
    const userId = res.locals.userId;
    let data = [userId, postId];
    const filename = result[0].postImageUrl.split("/images/")[1];
    let deletePosted = "DELETE FROM post WHERE userId=? AND postId=?";

    let selectPost = "SELECT postImageUrl FROM post WHERE postId=?";
    mysql.query(selectPost, [postId], function (err, res) {
        if (filename !== "") {
            fs.unlink(`images/${filename}`, () => {
                mysql.query(deletePosted, data, function (err, result) {
                    if (err) {
                        return res.status(500).json(err.message);
                    }
                    res.status(200).json({ message: "L'article est supprimé !" });
                });
            });
        } else {
            mysql.query(deletePosted, data, function (err, result) {
                if (err) {
                    return res.status(500).json(err.message);
                }
                res.status(200).json({ message: "L'article est supprimé !" });
            });
        }
        if (err) {
            return res.status(500).json(err.message);
        }
    });
};

exports.getOnePost = (req, res, next) => {
    const userId = res.locals.userId;
    const postId = req.params.postId;

    let getPost = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    post.postId AS postId,
                    post.postDate AS postDate,
                    post.title AS postTitle,
                    post.postImageUrl AS postImageUrl,

                    (SELECT COUNT(if(reaction = 1, 2, NULL)) FROM reactions WHERE postId = postId) AS postLikeCount,
                    (SELECT COUNT(if(reaction = 3, 2, NULL)) FROM reactions WHERE postId = postId) AS postDislikeCount,
                    (SELECT COUNT(if(postId = postId, 1, NULL)) FROM commentaires WHERE postId = postId) AS postCommentCount,
                    (SELECT reaction FROM reactions WHERE userId=? AND postId = reactions.postId) AS myReaction

                    FROM posts AS post

                    JOIN users AS user ON post.userId = user.userId
                    WHERE postId = ? GROUP BY postId;`;
    mysql.query(getPost, [userId, postId], function (err, result) {
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
    const userId = res.locals.userId;
    const page = req.query.page;        // Récupère le No de la page
    let offset = 10;                    // Offset par défaut 10
    offset = offset * (page - 1);       // Multiplication d'offset par le No de la page -1

    let getPosts = `SELECT user.userId AS postAuthorId,
                    user.firstName AS postAuthorFirstName,
                    user.lastName AS postAuthorLastName,
                    post.postId AS postId,
                    post.postDate AS postDate,
                    post.title AS postTitle,
                    post.postImageUrl AS postImageUrl,

                    (SELECT COUNT(if(reaction = 1, 2, NULL)) FROM reactions WHERE postId = post.id) AS postLikeCount,
                    (SELECT COUNT(if(reaction = 3, 2, NULL)) FROM reactions WHERE postId = post.id) AS postDislikeCount,
                    (SELECT COUNT(if(postId = post.id, 1, NULL)) FROM commentaires WHERE postId = post.id) AS postCommentCount,
                    (SELECT reaction FROM reactions WHERE userId=? AND postId = reactions.Id) AS myReaction

                    FROM posts AS post
                    
                    JOIN users AS user ON post.userId = user.userId
                    GROUP BY post.postId ORDER BY postDate DESC
                    LIMIT 10 OFFSET ?`;
    let data = [userId, offset];
    mysql.query(getPosts, data, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        if (result == 0) {
            return res.status(400).json({ message: "Le post n'existe pas !" });
        }
        res.status(200).json(result);
    });
};

exports.postComment = (req, res, next) => {
    const postId = req.params.postId;
    const userId = res.locals.userId;
    const body = req.body.body;

    let postComment = "INSERT INTO post VALUES (NULL, ?, NULL, NULL, NULL, NULL, ?, ?, NOW())";
    let data = [userId, postId, body];
    mysql.query(postComment, data, function (err, result) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.status(201).json({ message: "Le commentaire est crée !" });
    });
};

exports.likesDislikes = (req, res, next) => {
    const userId = res.locals.userId;
    const reaction = req.body.reaction;
    const postId = req.params.postId;
    let data;
    try {
        switch (reaction) {     // Selon la valeur de reaction
            
            case 1:             // Si ajoute like: reaction 1
                let like = "UPDATE reactions SET reaction = 1 WHERE postId=? AND userId=?";
                data = [postId, userId];

                mysql.query(like, data, function (err, res) {
                    if (err) {
                        res.status(400).json({ err: "L'ajout de like a échoué !" });
                    }
                    res.status(201).json(res, { message: "Vous avez ajouté un like !" });
                });
                break;
                
            case 2:             // Si l'utilisateur enlève le like ou dislike: reaction 2
                let neutre = "UPDATE reactions SET reaction = 2 WHERE postId=? AND userId=?";
                data = [postId, userId];
                mysql.query(neutre, data, function (err, res) {
                    if (err) {
                        res.status(400).json({ err: "L'annulation de reaction a échoué !" });
                    }
                    res.status(201).json(res, { message: "Vous avez enlevé la reaction !" });
                });
                break;
            case 3:             // Si ajoute dislike
            let dislike = "UPDATE reactions SET reaction = 3 WHERE postId=? AND userId=?";
            data = [postId, userId];
            mysql.query(dislike, data, function (err, res) {
                if (err) {
                    res.status(400).json({ err: "L'ajout de dislike a échoué !" });
                }
                res.status(201).json(res, { message: "Vous avez ajouté un dislike !" });
            });
            break;

            default:
                return res.status(500).json({ err });
        }
    } catch(err) { res.status(500).json({ err })
    }
};