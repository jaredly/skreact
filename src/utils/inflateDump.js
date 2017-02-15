
function inflateOne(node, converteds, symbols) {
  if (node.$type === 'MSSymbolMaster') {
    // console.log(node)
    symbols[node.symbolID] = node
  }
  for (let name in node) {
    if (node[name] && node[name].$ref) {
      node[name] = converteds[node[name].$ref]
    } else if (Array.isArray(node[name])) {
      node[name] = node[name].map(item => item && item.$ref ? converteds[item.$ref] : item)
    } else if (node[name] && 'object' === typeof node[name]) {
      for (let sub in node[name]) {
        if (node[name][sub] && node[name][sub].$ref) {
          node[name][sub] = converteds[node[name][sub].$ref]
        }
      }
    }
  }
  if (node.layers && node.objectID) {
    node.layerIds = node.layers.map(layer => layer.objectID)
  }
}

window.getInflatedLayer = objectID => {
  if (!window.INFLATED) {
    const symbols = {}
    inflate(window.DATA.converteds, symbols)
  }
  return window.INFLATED[objectID]
}

export default function inflate(converteds, symbols) {
  window.INFLATED = {}
  for (let i = 0; i < converteds.length; i++) {
    const node = converteds[i]
    if (!node) continue;
    inflateOne(node, converteds, symbols)
    if (node.objectID) {
      window.INFLATED[node.objectID] = node
    }
  }
}
