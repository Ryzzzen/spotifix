/*
* Ce script et ses composants requièrent les derniers standards ES6/ESNext donc n'est pas compatible avec Internet Explorer et les vieilles versions de navigateurs
* (const/let, fonctions fléchées, async/await etc)
*/

Spotifix = {
	/* Eléments */
	loginButton: document.getElementById('btn-login'),
	profileName: document.getElementById('profile-name'),
	isPremiumElement: document.getElementById('is-premium'),
	element: document.getElementById('spotify'),
	artists: document.getElementById('artists'),
	tracks: document.getElementById('tracks'),
	albums: document.getElementById('albums'),
	/*
	* Fonction qui permet d'ouvrir un lien facilement
	* TODO: retirer le paramètre type, inutile
	*/
	open: (type, link) => {
		Object.assign(document.createElement('a'), { target: '_blank', href: link }).click();
	},
	ui: {},
	load: async function() {
			// Supprime le bouton de connexion et les informations au dessus
			document.querySelector('header').remove();

			/*
			* Télécharge les données depuis les API Spotify
			*/
			try {
				// Récupère les informations de l'utilisateur connecté et l'affiche
				let userData = await Spotifix.getUserData(Spotifix.token);
				Spotifix.ui.displayUser(userData);

				// Récupère les artistes les plus écoutés de l'utilisateur et les affiche
				let topArtists = await Spotifix.getTopArtists(Spotifix.token);
				Spotifix.ui.displayArtists(topArtists);

				// Récupère les chansons les plus écoutées de l'utilisateur et les affiche
				let topTracks = await Spotifix.getTopTracks(Spotifix.token);
				console.dir(topTracks);
				Spotifix.ui.displayTracks(topTracks);
			}
			catch(err) {
				console.error(err);

				/*
				* Si le texte de l'erreur contient cette phrase, ça veut dire que le jeton de connexion à expiré: il faut le supprimer du cache et actualiser
				* (Les jetons expirent au bout d'une heure)
				*/
				if (err.includes('The access token expired')) {
					/*
					* On supprime les paramètres de l'URL expirée (et actualise en même temps)
					* (ex: 'http://localhost/?test=sdqdqdq' => 'http://localhost/')
					*/
					sessionStorage.clear();
					window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1)
				}
				else alert('Une erreur est survenue.');
		}
	}
}

/*
* Cette fonction s'exécute dès que le site à chargé.
*/
document.addEventListener('DOMContentLoaded', function() {
	Spotifix.enableAnimationsToggle = new Toggle('enableAnimations');
	Spotifix.enableAnimationsToggle.load(true);

	Spotifix.enableAnimationsToggle.onChange = value => document.querySelectorAll('.text-content').forEach(x => x.classList[!value ? 'add' : 'remove']('noblur'));

  /*
  * Charge toute les fonctions de Spotifix et commence la récupération des données
  */
	if (retrieveToken())
  	Spotifix.load();
}, false);
