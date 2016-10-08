const can = document.getElementById('cancan')
const ctx = can.getContext('2d')

const keymap = { a: [-1, 0]
               , s: [0, 1]
               , d: [1, 0]
               , w: [0, -1]
               }

const rect = [100,100]

function eat_keys(e) {
  const key = e.key
  const delta = keymap[key]

  if(!delta) return false

  rect[0] += delta[0]
  rect[1] += delta[1]

  ctx.clearRect(0, 0, 1000, 1000)
  ctx.fillRect(rect[0], rect[1], 50, 50)
}

addEventListener('keydown', eat_keys)
