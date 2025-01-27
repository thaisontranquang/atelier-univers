window.addEventListener('load', event => {
  let canvas = document.getElementById('canv')
  let startButton = document.getElementById('startButton')
  let stopButton = document.getElementById('stopButton')
  let resetButtons = document.querySelectorAll('.reset-button')
  let startScreen = document.getElementById('startScreen')
  let endScreen = document.getElementById('endScreen')

  let audio = null
  let whiteNoise = new Audio('/assets/sounds/white-8D.mp3')
  whiteNoise.currentTime = 0
  whiteNoise.loop = true

  let clickSound = new Audio('/assets/sounds/click.mp3')
  let voiceOverStart = new Audio('/assets/sounds/voice-start.mp3')
  let voiceOverEnd = new Audio('/assets/sounds/voice-end.mp3')
  let backgroundSound = new Audio('/assets/sounds/black-8D.mp3')

  whiteNoise.loop = true
  backgroundSound.loop = true

  whiteNoise.addEventListener('ended', () => {
    whiteNoise.currentTime = 0
    whiteNoise.play()
  })

  whiteNoise.play()

  startButton.addEventListener('click', function () {
    fadeOut(whiteNoise, 1000)
    clickSound.currentTime = 0
    clickSound.play()

    setTimeout(() => {
      voiceOverStart.currentTime = 0
      voiceOverStart.play()
      backgroundSound.currentTime = 0
      backgroundSound.play()
    }, 500)

    setTimeout(() => {
      startScreen.classList.add('hidden')
      startScreen.remove()
      document.getElementById('colorsContainer').classList.remove('hidden')
      document.getElementById('globalControlsContainer').classList.remove('hidden')
      canvas.classList.add('canvas-black')

      resetButtons.forEach(button => {
        button.removeAttribute('disabled')
      })
      stopButton.removeAttribute('disabled')
    }, 1000)
  })

  resetButtons.forEach(button => {
    button.addEventListener('click', function () {
      window.location.reload()
    })
  })

  stopButton.addEventListener('click', function () {
    document.getElementById('controlsContainer').classList.add('hidden')
    document.getElementById('globalControlsContainer').classList.add('hidden')
    canvas.classList.add('hidden')

    if (audio) {
      fadeOut(audio, 1000)
    }

    voiceOverStart.pause()

    fadeOut(whiteNoise, 1000)
    fadeOut(backgroundSound, 1000)

    setTimeout(() => {
      voiceOverEnd.currentTime = 0
      voiceOverEnd.play()
    }, 500)

    setTimeout(() => {
      whiteNoise.currentTime = 0
      whiteNoise.play()

      canvas.remove()
      endScreen.classList.remove('hidden')
      endScreen.classList.add('active')
    }, 1000)

    voiceOverEnd.addEventListener('ended', () => {
      setTimeout(() => {
        window.location.reload()
      }, 5000)
    })
  })

  let voiceOverStartEnded = false
  voiceOverStart.addEventListener('ended', () => {
    voiceOverStartEnded = true
  })

  let colorButtons = document.querySelectorAll('.color-button')

  let activeUniverseSound = null

  let isTransitioning = false; // Verrou pour éviter les actions simultanées

  let particleColor = { color1: 'rgb(255, 255, 255)', color2: 'rgb(0, 0, 0)' }; // Couleurs par défaut en RGB

  colorButtons.forEach(button => {
    button.addEventListener('click', async function () {
      if (isTransitioning || !voiceOverStartEnded) {
        return; // Ignorer si une transition est déjà en cours
      }
      isTransitioning = true; // Activer le verrou

      particleColor = button.id.replace('Button', '').toLowerCase();

      // Émettre un événement pour informer le fichier 2 du changement de couleur
      const colorEvent = new CustomEvent('colorChange', {
        detail: { color: particleColor }
      });
      window.dispatchEvent(colorEvent);

      // Arrêter le son de fond
      backgroundSound.pause();

      // Supprimer les anciennes classes de couleur du canvas
      canvas.classList.remove(
        ...canvas.classList
          .toString()
          .split(' ')
          .filter(className => className.startsWith('canvas-'))
      );

      // Ajouter la nouvelle classe de couleur
      let colorClass = 'canvas-' + button.id.replace('Button', '').toLowerCase();
      canvas.classList.add(colorClass);

      // Arrêter le bruit blanc avec fondu
      fadeOut(whiteNoise, 2000);
      whiteNoise.pause();

      // Récupérer les chemins des sons
      let color = button.id.replace('Button', '').toLowerCase();
      let soundPath = `/assets/sounds/${color}-8D.mp3`;
      let universeSoundPath = `/assets/sounds/universes/univers-${color}.mp3`;

      // Assurer que le son d'univers précédent est terminé
      if (activeUniverseSound && !activeUniverseSound.ended) {
        isTransitioning = false; // Réinitialiser le verrou
        return;
      }

      // Transition du son principal
      if (audio) {
        await fadeOut(audio, 1000); // Attendre la fin du fondu
      }
      audio = new Audio(soundPath);
      audio.loop = true;

      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
      });

      fadeIn(audio, 1000);

      // Gestion des sons "univers"
      if (activeUniverseSound) {
        fadeOut(activeUniverseSound, 0);
      }
      activeUniverseSound = new Audio(universeSoundPath);
      activeUniverseSound.addEventListener('ended', () => {
        activeUniverseSound = null; // Réinitialise lorsque le son se termine
      });

      fadeIn(activeUniverseSound, 1);
      activeUniverseSound.play();

      // Libérer le verrou après un délai
      setTimeout(() => {
        isTransitioning = false;
      }, 2000); // Ajustez la durée en fonction du temps nécessaire pour stabiliser la transition
    });
  });


  function fadeIn(audio, duration) {
    audio.volume = 0
    audio.play()
    let volumeInterval = setInterval(() => {
      if (audio.volume < 0.95) {
        audio.volume += 0.05
      } else {
        audio.volume = 1
        clearInterval(volumeInterval)
      }
    }, duration / 20)
  }

  function fadeOut(audio, duration) {
    let volumeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05)
      } else {
        audio.volume = 0
        clearInterval(volumeInterval)
        audio.pause()
      }
    }, duration / 20)
  }
})
