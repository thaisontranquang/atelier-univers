window.addEventListener('load', event => {
  let canvas = document.getElementById('canv')
  let startButton = document.getElementById('startButton')
  let stopButton = document.getElementById('stopButton')
  let resetButton = document.getElementById('resetButton')

  let audio = null
  let whiteNoise = new Audio('/assets/sounds/bruit-blanc.mp3')

  startButton.addEventListener('click', function () {
    document.getElementById('startScreen').classList.add('hidden')
    document.getElementById('startScreen').remove()
    document.getElementById('colorsContainer').classList.remove('hidden')
    document.getElementById('globalControlsContainer').classList.remove('hidden')
    canvas.classList.add('canvas-black')
  })

  stopButton.addEventListener('click', function () {
    document.getElementById('controlsContainer').classList.add('hidden')
    canvas.classList.add('hidden')

    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }

    whiteNoise.currentTime = 0
    whiteNoise.play()

    setTimeout(() => {
      canvas.remove()
    }, 1000)
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

      whiteNoise.pause()
      whiteNoise.currentTime = 0

      let color = button.id.replace('Button', '').toLowerCase()
      let soundPath = `/assets/sounds/${color}-8D.mp3`

      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }

      audio = new Audio(soundPath)
      audio.play()
    })
  })
})
