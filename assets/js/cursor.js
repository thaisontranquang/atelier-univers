// Cacher le curseur par défaut sur toute la page
document.documentElement.style.cursor = 'none';
document.querySelector('.canvas').style.cursor = 'none'; // Afficher le curseur

// Réafficher le curseur lorsqu'Entrée est pressée
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.documentElement.style.cursor = 'auto'; // Afficher le curseur
    document.querySelector('.canvas').style.cursor = 'auto'; // Afficher le curseur
  }
});

// Re-cacher le curseur lorsqu'une autre touche est pressée (par exemple 'Esc')
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    document.documentElement.style.cursor = 'none'; // Cacher le curseur
    document.querySelector('.canvas').style.cursor = 'none'; // Afficher le curseur
  }
});

// Optionnel : Re-cacher le curseur après un délai (par exemple 3 secondes) après avoir appuyé sur Entrée
let timeoutID;
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    // Si Entrée est pressée, annuler tout délai précédent et réafficher le curseur
    clearTimeout(timeoutID);
    document.documentElement.style.cursor = 'auto'; // Afficher le curseur

    // Planifier de cacher le curseur après 3 secondes
    timeoutID = setTimeout(function() {
      document.documentElement.style.cursor = 'none'; // Cacher le curseur après 3 secondes
    }, 3000);
  }
});
