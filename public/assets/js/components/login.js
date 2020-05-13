/**
* Obtient un objet des paramètres qui sont dans l'URL
* Permet de récupérer les jetons de connexion de Spotify une fois connecté
* @return Object
*/
function getHashParams() {
	var hashParams = {};
	var e, r = /([^&;=]+)=?([^&;]*)/g,
	q = window.location.hash.substring(1);
	while (e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
}

/*
* Permet d'ouvrir la fenêtre permettant d'autoriser la connexion à Spotify
*/
function login() {
  let scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-library-read streaming';
  let url = 'https://accounts.spotify.com/authorize';

  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(CLIENT_ID);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(window.location.origin);

  window.location = url;
}

/*
* Récupère les jetons de connexion de Spotify du stockage du navigateur ou de l'URL si possible
* @return true si le jeton à été récupéré
*/
function retrieveToken() {
  let params = getHashParams();
  console.dir(params);

	if (params.access_token)
		sessionStorage.setItem('token', Spotifix.token = params.access_token);
	else if (sessionStorage.getItem('token'))
    Spotifix.token = sessionStorage.getItem('token');
  else return false;

  return true;
}
