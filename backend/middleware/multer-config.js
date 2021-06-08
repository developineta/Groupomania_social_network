const multer = require('multer');   // Importer le paquet 'Multer' pour importer les fichiers

const MIME_TYPES = {                // Définition de 'mime types' pour indiquer les fichiers acceptés
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({                //Fonction qui va enregistrer les fichiers sur le disque
    destination: (req, file, callback) => {
        callback(null, 'images');                   // Définition de dossier de destination des fichiers enregistrés, 'null' est défini pour éviter les erreurs
    },
    filename: (req, file, callback) => {                        // Pour définir le nom de fichier
        const name = file.originalname.split(' ').join('_');    // Pour remplacer les espaces dans le nom de fichier par des '_' pour éviter les erreurs
        const extension = MIME_TYPES[file.mimetype];            // Récuperation de 'mime type' du fichier pour créer l'extension correspondante
        callback(null, name + Date.now() + '.' + extension);    // On indique 'null' pour éviter les erreurs, le nom du fichier, la date, le point et le nom de l'extension
    }
});

module.exports = multer({storage: storage}).single('image');    // On indique l'objet de 'storage' et méthode 'single' pour indiquer qu'un seul fichier est possible