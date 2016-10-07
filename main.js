const can = document.getElementById('cancan')
const ctx = can.getContext('2d')

function orient(e) {
  var x = 100 + e.beta
  var y = 100 + e.gamma
  ctx.fillRect(x, y, 50, 50)
}

window.addEventListener('deviceorientation', orient)
