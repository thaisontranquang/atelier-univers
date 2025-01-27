window.addEventListener('load', event => {
  // Référence à l'image
  const image = document.getElementById('universeImg')
  console.log(image)

  // Écouter les messages du parent
  window.addEventListener('message', event => {
    if (event.data.type === 'updateImage') {
      const color = event.data.color; // Déclaration de color ici

      // Mettre à jour la source de l'image en fonction de la couleur
      image.src = `/assets/images/universes/${color}.png`;
    }
  });
});
