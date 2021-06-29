// Récuperation de l'Id de l'utilisateur connecté pour le reconnaître sur les routes de publications (post)

require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports =  (req) => {                                                 
    let token = req.headers.authorization.split(' ')[1];              // Récupère uniquement le token du header de la requête
    let decode = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    decode = [decode.userId];
    return decode;
};