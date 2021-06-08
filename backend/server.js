const http = require('http');     // Importer le package HTTP natif de Node pour la création du serveur
const app = require('./app');     // Importer fichier 'app' qui contient 'Express'

// Renforcement de la requête pour la rendre plus stable
const normalizePort = val => {    // Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// Ports à utiliser
const port = normalizePort(process.env.PORT || '3000');  // 'process.env.PORT' si la plateforme de déploiement propose un port par défaut ou le port '3000'
app.set('port', port);

const errorHandler = error => {                          // Recherche et gère les erreurs, ensuite les enregistre dans le serveur
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);      // Création du serveur, en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur

server.on('error', errorHandler);
server.on('listening', () => {              // Ecouteur d'évènements est enregistré, consignant le 'port' sur lequel le serveur s'exécute dans la console
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);                       // Le serveur attend les requêtes au port indiqué
