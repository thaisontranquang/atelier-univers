window.addEventListener('load', event => {
  let canvas = document.getElementById('canv')
  let startButton = document.getElementById('startButton')
  let stopButton = document.getElementById('stopButton')
  let resetButton = document.getElementById('resetButton')

  startButton.addEventListener('click', function () {
    document.getElementById('startScreen').classList.add('hidden')
    setTimeout(() => {
      document.getElementById('startScreen').remove()
    }, '1000')
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
    })
  })
})
