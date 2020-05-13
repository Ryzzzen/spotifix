/*
* Ce script doit être lancé avec NodeJS et ses modules installés
* Assurez vous qu'il soient installés avec npm install
*/

// Module HTTP de NodeJS -> Requis pour mettre le serveur en ligne
const http = require('http');

// Module mime - permet de définir Content-Type (variable permettant aux navigateurs de savoir le type de fichier) en fonction de l'extension du fichier facilement
const mime = require('mime/lite');

// Module système de fichiers et emplacements
const fs = require('fs'), path = require('path');

// Port sur lequel le serveur écoutera
const port = 80;

// Fonction exécutée à chaque requête sur le serveur
const requestHandler = async (request, response) => {
  // Vérifie si la requête est un retour du jeton de connexion de Spotify
  if (request.url.startsWith('/spotify/callback')) {
    console.dir(request.url);
  }
  // Sinon, sers les fichiers dans le dossier public
  else {
    let file = request.url.slice(1);

    // Le lien de base (/) renverra automatiquement sur index.html
    if (file == '') file = 'index.html';

    try {
      // Vérifie que le fichier est existant et lisible
      await fs.promises.access(file = path.join(__dirname, '/public/', file), fs.constants.R_OK);

      response.statusCode = 200;
      response.setHeader('Content-Type', mime.getType(path.extname(file)));

      // Crée un transfert du fichier
      let read = fs.createReadStream(file);
      read.pipe(response);
    }
    catch(err) {
      response.statusCode = 400;
      response.end(err.toString());
    }
  }
};

// Objet du serveur créé par le module
const server = http.createServer(requestHandler);

/*
* Démarre le serveur HTTP
*/
server.listen(port, (err) => {
  if (err) return console.error(err);

  console.log(`>> Le serveur écoute sur le port ${port}`);
});
