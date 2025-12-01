import store from './store'

const DEFAULTS = [
  '+1',
  'grinning',
  'laughing',
  'heart',
  'sweat_smile',
  'joy',
  'sunglasses',
  'heart_eyes',
]

let frequently, initialized
let defaults = {}

function init() {
  initialized = true
  frequently = store.get('frequently')
}

function add(emoji) {
  if (!initialized) init()
  var {id} = emoji

  frequently || (frequently = defaults)
  frequently[id] || (frequently[id] = 0)
  frequently[id] += 1

  store.set('last', id)
  store.set('frequently', frequently)
}

function get(perLine) {
  if (!initialized) init()
  if (!frequently) {
    defaults = {}

    const result = []

    for (let i = 0; i < perLine; i++) {
      defaults[DEFAULTS[i]] = perLine - i
      result.push(DEFAULTS[i])
    }

    return result
  }

  const quantity = perLine * 3
  const frequentlyKeys = []

  for (let key in frequently) {
    if (frequently.hasOwnProperty(key)) {
      frequentlyKeys.push(key)
    }
  }

  const sorted = frequentlyKeys
    .sort((a, b) => frequently[a] - frequently[b])
    .reverse()
  const sliced = sorted.slice(0, quantity)

  const last = store.get('last')

  if (last && sliced.indexOf(last) == -1) {
    sliced.pop()
    sliced.push(last)
  }

  return sliced
}

export default {add, get}
