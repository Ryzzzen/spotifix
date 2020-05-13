/*
* Cette fonction affiche les informations récupérées de l'utilisateur sur la page
*/
Spotifix.ui.displayUser = function(userData) {
  Spotifix.profileName.textContent = userData.display_name + ` (${userData.followers.total} abonnés)`;

  console.dir(userData);

  if (userData.images.length > 0)
    Spotifix.element.style.backgroundImage = 'url(\'' + userData.images[0].url + '\');';

  Spotifix.element.style.display = 'block';

  if (userData.product !== 'premium') {
    Spotifix.isPremiumElement.classList.add('not');
    Spotifix.isPremiumElement.textContent = 'Cet utilisateur n\'est pas premium.';
  }
};
