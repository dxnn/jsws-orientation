const can = document.getElementById('cancan')
const ctx = can.getContext('2d')

const keymap = { a: [-1, 0]
               , s: [0, 1]
               , d: [1, 0]
               , w: [0, -1]
               }

let state = {}
state.rect = [100, 100]
state.ball = {x: 100, y: 100}

const width = 600
const height = 600
can.width = width
can.height = height

function eat_keys(e) {
  const key = e.key
  const delta = keymap[key]

  if(!delta) return false

  state.rect[0] += delta[0]
  state.rect[1] += delta[1]
}

function orient(e) {
  state.ball.x = 100 + e.beta
  state.ball.y = 100 + e.gamma
}

function render(state) {
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = "#000"
  ctx.fillRect(state.rect[0], state.rect[1], 50, 50)

  ctx.fillStyle = "#f66"
  ctx.fillRect(state.ball.x, state.ball.y, 50, 50)
}

function renderLoop() {
  window.requestAnimationFrame(() => {
    render(state)
    renderLoop()
  })
}

function init() {
  window.addEventListener('keydown', eat_keys)
  window.addEventListener('deviceorientation', orient)
  renderLoop()
}

init()
