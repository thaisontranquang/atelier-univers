window.addEventListener('load', event => {

  let canvas = document.getElementById('canv')
  let startButton = document.getElementById('startButton')
  let stopButton = document.getElementById('stopButton')
  let resetButtons = document.querySelectorAll('.reset-button')
  let startScreen = document.getElementById('startScreen')
  let endScreen = document.getElementById('endScreen')

  let audio = null
  let whiteNoise = new Audio('/assets/sounds/white-8D.mp3');
  whiteNoise.currentTime = 0
  whiteNoise.loop = true;

  whiteNoise.addEventListener('ended', () => {
    whiteNoise.currentTime = 0
    whiteNoise.play()
  })

  whiteNoise.play()

  startButton.addEventListener('click', function () {
    startScreen.classList.add('hidden')
    startScreen.remove()
    document.getElementById('colorsContainer').classList.remove('hidden')
    document.getElementById('globalControlsContainer').classList.remove('hidden')
    canvas.classList.add('canvas-black')
  })

  resetButtons.forEach(button => {
    button.addEventListener('click', function () {
      window.location.reload();
    })
  })

  stopButton.addEventListener('click', function () {
    document.getElementById('controlsContainer').classList.add('hidden')
    document.getElementById('globalControlsContainer').classList.add('hidden')
    canvas.classList.add('hidden')

    if (audio) {
      fadeOut(audio, 1000);  // Fade out the audio
    }

    fadeOut(whiteNoise, 1000);

    setTimeout(() => {
      whiteNoise.currentTime = 0;
      whiteNoise.play();

      canvas.remove()
      endScreen.classList.remove('hidden')
      endScreen.classList.add('active')
    }, 1000)

    setTimeout(() => {
      window.location.reload();
    }, 5000)
  })

  let colorButtons = document.querySelectorAll('.color-button')

  colorButtons.forEach(button => {
    button.addEventListener('click', function () {
      canvas.classList.remove(
        ...canvas.classList
          .toString()
          .split(' ')
          .filter(className => className.startsWith('canvas-'))
      )

      let colorClass = 'canvas-' + button.id.replace('Button', '').toLowerCase()
      canvas.classList.add(colorClass)

      fadeOut(whiteNoise, 1000);

      let color = button.id.replace('Button', '').toLowerCase()
      let soundPath = `/assets/sounds/${color}-8D.mp3`

      if (audio) {
        fadeOut(audio, 0);
      }

      audio = new Audio(soundPath)
      audio.loop = true;

      audio.addEventListener('ended', () => {
        audio.currentTime = 0
        audio.play()
      })

      fadeIn(audio, 1);
    })
  })

  function fadeIn(audio, duration) {
    audio.volume = 0;
    audio.play();
    let volumeInterval = setInterval(() => {
      if (audio.volume < 0.95) {
        audio.volume += 0.05;
      } else {
        audio.volume = 1;
        clearInterval(volumeInterval);
      }
    }, duration / 20);
  }

  function fadeOut(audio, duration) {
    let volumeInterval = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05);
      } else {
        audio.volume = 0;
        clearInterval(volumeInterval);
        audio.pause();
      }
    }, duration / 20);
  }
})
