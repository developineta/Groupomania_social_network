const passwordValidation = require('password-validator');       // Importe le paquet de validation de mot de passe

const passwordSchema = new passwordValidation();                // La schéma de mot de passe

passwordSchema
.is().min(8)                                                    // Longueur minimun : 8
.has().uppercase()                                              // Au moins une majuscule
.has().lowercase()                                              // Au moins une minuscule
.has().digits()                                                 // Au moins un chiffre
.has().not().spaces()                                           // Ne pas des espaces
.is().not().oneOf(["Password1", "Password12", 'Password123']);  // Les mots de passe non acceptés

module.exports = passwordSchema;