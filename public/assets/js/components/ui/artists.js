/*
* Cette fonction affiche les artistes (les plus écoutées)
*/
Spotifix.ui.displayArtists = function(topArtists) {
  let html = '';

  for (let artist of topArtists.items) {
    html += `<div class="artist" style="background-image: url(${artist.images[0].url});">
    <div class="text-content">
    <a class="link" href="${artist.external_urls.spotify}"><p class="name">${artist.name}</p></a>
    <iframe src="https://open.spotify.com/follow/1/?uri=spotify:artist:${artist.id}&size=basic&theme=dark" width="200" height="25" scrolling="no" frameborder="0" style="border:none; overflow:hidden; margin: 2% 0 0 3%;" allowtransparency="true"></iframe>
    <p class="genres">Genres: ${artist.genres.slice(0, 3).join(', ')}</p>
    <p class="popularity">Indice de popularité: ${artist.popularity}/100</p>
    </div>
    </div>`;
  }

  Spotifix.artists.innerHTML += html;
};
