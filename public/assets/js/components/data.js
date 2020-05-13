// Créé avec https://developer.spotify.com/dashboard/applications, constante à ne pas changer
const CLIENT_ID = '965b9d210aaa429f8beb136d2ba53d54'; // Change the client ID, it won't work unless it's on spotifx.now.sh domain so you won't be able to use it

/*
* Cette fonction télécharge des données avec un endpoint Spotify donné
*/
function getData(accessToken, endpoint = '/v1/me') {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.spotify.com' + endpoint);
		xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

		xhr.onload = function() {
			if (xhr.status === 200)
			resolve(JSON.parse(xhr.responseText));
			else reject(xhr.responseText);
		};

		xhr.send();
	});
}

/*
* Fonctions asynchrones qui utilisant les API de Spotify
*/
Spotifix.getUserData = async function(accessToken) {
  return await getData(accessToken, '/v1/me');
};

Spotifix.getTopArtists = async function(accessToken, limit = 3) {
  return await getData(accessToken, '/v1/me/top/artists?time_range=long_term&limit=' + limit);
};

Spotifix.getTopTracks = async function(accessToken, limit = 50) {
  return await getData(accessToken, '/v1/me/top/tracks?time_range=long_term' + (limit ? '&limit=' + limit : ''));
}

Spotifix.getAlbum = async function(accessToken, id) {
  return await getData(accessToken, '/v1/albums/' + id);
};
