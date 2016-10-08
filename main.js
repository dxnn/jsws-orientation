const can = document.getElementById('cancan')
const ctx = can.getContext('2d')

const keymap = { a: [-1, 0]
               , s: [0, 1]
               , d: [1, 0]
               , w: [0, -1]
               }

const rect = [100,100]

const width = 600
const height = 600
can.width = width
can.height = height

function eat_keys(e) {
  const key = e.key
  const delta = keymap[key]

  if(!delta) return false

  rect[0] += delta[0]
  rect[1] += delta[1]

  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = "#000"
  ctx.fillRect(rect[0], rect[1], 50, 50)
}

addEventListener('keydown', eat_keys)

function orient(e) {
  var x = 100 + e.beta
  var y = 100 + e.gamma

  ctx.fillStyle = "#f66"
  ctx.fillRect(x, y, 50, 50)
}

window.addEventListener('deviceorientation', orient)
