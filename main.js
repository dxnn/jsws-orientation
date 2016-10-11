const can = document.getElementById('cancan')
const ctx = can.getContext('2d')

const width = 600
const height = 600
can.width = width
can.height = height


// input phase

const keymap = { a: [-1, 0]
               , s: [0, 1]
               , d: [1, 0]
               , w: [0, -1]
               }

function eat_keys(e) {
  const key = e.key
  const delta = keymap[key]

  if(!delta) return false

  state.rect.x += delta[0] * 3
  state.rect.y += delta[1] * 3
}

function orient(e) {
  state.ball.x = 100 + e.gamma
  state.ball.y = 100 + e.beta
}

function mouser(e) {
  state.mouse.x = e.x
  state.mouse.y = e.y
}

function addListeners() {
  const ls = [ ['keydown', eat_keys]
             , ['mousemove', mouser]
             , ['deviceorientation', orient]
             ]

  ls.forEach(l => window.addEventListener(l[0], l[1]))
}


// state management phase

let state = { rect:  {x: 100, y: 100}
            , ball:  {x: 100, y: 100}
            , mouse: {x: 100, y: 100}
            , birds: [ {p: {x: 100, y: 100}, v: {x: 1, y: 1}}
                     , {p: {x: 200, y: 200}, v: {x: 1, y: 1}}
                     , {p: {x: 300, y: 300}, v: {x: 1, y: 1}}
                     ]
            }

function set(path, val) {
  state = setPath(state, path, val)
  return state
}

function setPath(obj, path, val) {
  const keys = path.split('.')
  const last = keys.pop()

  let next = shallow_copy(obj)
  const final = next

  keys.forEach(key => {
    next[key] = shallow_copy(next[key])
    next = next[key]
  })

  next[last] = val
  return final

  function shallow_copy(o) {
    if(Array.isArray(o)) return o.slice()
    return Object.keys(o || {}).reduce((acc, k) => {acc[k] = o[k]; return acc}, {})
  }
}


// rendering phase

function render(state) {
  ctx.clearRect(0, 0, width, height)

  drawRect('#000', state.rect.x,  state.rect.y,  50, 50)
  drawRect('#f66', state.ball.x,  state.ball.y,  50, 50)
  drawRect('#66f', state.mouse.x, state.mouse.y, 30, 30)

  state.birds.forEach((b,i) => drawRect(`#c${3*i}c`, b.p.x, b.p.y, 12, 12))
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
  addListeners()
  renderLoop()
}

init()
