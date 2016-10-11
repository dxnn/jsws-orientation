const can = document.getElementById('cancan')
const ctx = can.getContext('2d')

const keymap = { a: [-1, 0]
               , s: [0, 1]
               , d: [1, 0]
               , w: [0, -1]
               }

let state = { rect:  {x: 100, y: 100}
            , ball:  {x: 100, y: 100}
            , mouse: {x: 100, y: 100}
            }

function set(path, val, obj=state) {
  let keys = path.split('.').reverse()
  let key = keys.pop()

}

const width = 600
const height = 600
can.width = width
can.height = height

function eat_keys(e) {
  const key = e.key
  const delta = keymap[key]

  if(!delta) return false

  state.rect.x += delta[0]
  state.rect.y += delta[1]
}

function orient(e) {
  state.ball.x = 100 + e.beta
  state.ball.y = 100 + e.gamma
}

function mouser(e) {
  state.mouse.x = e.x
  state.mouse.y = e.y
}

function render(state) {
  ctx.clearRect(0, 0, width, height)

  drawRect('#000', state.rect.x,  state.rect.y,  50, 50)
  drawRect('#f66', state.ball.x,  state.ball.y,  50, 50)
  drawRect('#66f', state.mouse.x, state.mouse.y, 30, 30)
}

function drawRect(color, x, y, w, h) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
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
  window.addEventListener('mousemove', mouser)
  renderLoop()
}

init()
