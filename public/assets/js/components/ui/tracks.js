/*
* Cette fonction affiche les chansons (les plus écoutées)
*/
Spotifix.ui.displayTracks = function(data) {
  /*
  * On adapte les données reçues pour les traiter facilement
  */

  let items = {
    albums: {}, // Albums entiers qui seront affichés
    tracks: [] // Musiques seules
  };

  data.items.forEach(x => {
    // Cette chanson n'est pas reliée à un album
    if (x.album.album_type === 'SINGLE') items.tracks.push(x);
    else if (!items.albums[x.album.id]) {
      let filtered = data.items.filter(items => items.album.id === x.album.id);

      /*
      * On vérifie si il y a plusieurs musiques très écoutées par l'utilisateur du même album
      * si c'est pas le cas on les envoie dans la liste de musiques seules
      */
      if (filtered.length > 1)
        items.albums[x.album.id] = filtered;
      else items.tracks.push(filtered[0]);
    }
  });

  console.dir(items);

  /*
  * On les affiche sur la page
  */

  // élément qui contiendra les chansons seules
  let grid = document.querySelector('#tracks > #grid');

  /*
  * On se sert de la fonction map() intégrée dans les tableaux qui permet de transformer un élement au cas par cas
  * (la fonction fléchée traite chaque chanson ici et les convertit en chaîne HTML)
  */
  grid.innerHTML = items.tracks.map(track => {
    return `<div class="track" id="${track.id}" style="background-image: url(${track.album.images[0].url});">
    <div class="text-content">
      <p id="desc">
        ${track.name}, par ${track.artists.map(x => `<a class="link" onclick="Spotifix.open('artist', '${track.artists[0].external_urls.spotify}')">${x.name}</a>`).join(', ')}
      </p>
      <p id="fromAlbum">
        Issu ${track.album.album_type === 'ALBUM' ? 'de l\'album' : 'du single'} <span id="albumName">${track.album.name}</span>,
        ${track.album.album_type === 'ALBUM' && track.album.total_tracks ? 'un album de ' + track.album.total_tracks + ' chansons' : ''}<br>Sorti le ${track.album.release_date}
       </p>
       <iframe src="https://open.spotify.com/embed/track/${track.id}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    </div>`
  }).join('');

  let html = '';

  for (let mostPlayedTracks of Object.values(items.albums)) {
    let album = mostPlayedTracks[0].album;

    html += `<div class="album" id="album-${album.id}"style="background-image: url(${album.images[0].url});">
      <div class="text-content">
        <p class="name"><a class="link" onclick="Spotifix.open('album', '${album.external_urls.spotify}')">${album.name}</a><span class="artistName">, par ${album.artists.map(x => x.name).join(', ')}</span></p>
        <p class="genres">Sorti: ${album.release_date}<br>Album de ${album.total_tracks} chansons</p>
        <p class="popularity"></p>
      </div>
    </div>`;

    Spotifix.getAlbum(Spotifix.token, album.id)
    .then(albumData => {
      console.dir(albumData);
      document.querySelector(`#album-${album.id} > .text-content > .popularity`).innerHTML = `Indice de popularité: ${albumData.popularity}/100`;
      document.querySelector(`#album-${album.id} > .text-content`).innerHTML += `<ul style="list-style: none;">${albumData.tracks.items.map(x => `<li style="color: ${mostPlayedTracks.find(y => x.id === y.id) ? 'unset' : 'white'};">${x.track_number}. ${x.name}</li>`).join('')}</ul>`;
    })
    .catch(console.error);
  }

  Spotifix.albums.innerHTML += html;

  /*
  * On sépare les musiques en ligne de quatre, donc on prend le chiffre égal ou immédiatement supérieur du résultat du nombre de musiques divisées par quatre
  * Je fais ça pour que les éléments aient la même hauteur et ne rendent pas bizarre sur la page
  */
  let maxTrackPerRow = 4;
  let rows = Math.ceil(items.tracks.length / maxTrackPerRow);

  /*
  * On récupère les éléments enfants de #grid, soit les chansons transformées que j'ai créé au-dessus
  * On applique en même temps Array#from parce que l'objet retourné est une HTMLCollection et non un tableau, la fonction permet de convertir
  * Ainsi on pourra utiliser la fonction Array#slice
  */
  let trackElements = Array.from(grid.children);

  for (let i = 1; i <= rows; i++) {
    // On crée un élement qui fera office de ligne
    let row = document.createElement('div');
    row.classList.add('row');

    // On prend trois éléments en trois-par-trois et on les déplace dans la ligne
    trackElements.slice((i * maxTrackPerRow) - maxTrackPerRow, i * maxTrackPerRow).forEach(x => row.appendChild(x));

    // On rajoute la ligne à l'élément qui contient les chansons
    grid.appendChild(row);
  }
};
