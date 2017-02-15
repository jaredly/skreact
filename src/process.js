
import inflate from './inflateDump'

const color2string = color => color && `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a})`

const cframe = frame => frame && ({
  top: frame.top,
  left: frame.left,
  width: frame.width,
  height: Math.ceil(frame.height), // TODO how do deal w/ hairlines?
})

const ccolor = color => color && {
  r: color.red,
  g: color.green,
  b: color.blue,
  a: color.alpha,
}

const cshadow = shadow => shadow &&
  `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${color2string(ccolor(shadow.colorGeneric))}`

// dunno if this needs to change, but here we are
const nodeFromLayer = thing => {
  let extra = {}
  let extraStyle = {
      // outline: '1px solid magenta',
  }
  const style = {
    position: 'absolute',
    display: thing.isVisible !== false ? 'flex' : 'none',
    ...cframe(thing.frameGeneric),
    backgroundColor: color2string(ccolor(thing.backgroundColorGeneric)),
    borderRadius: thing.cornerRadiusFloat,
    boxShadow: thing.styleGeneric && thing.styleGeneric.shadow ? cshadow(thing.styleGeneric.shadow) : null,
    opacity: thing.styleGeneric && thing.styleGeneric.contextSettingsGeneric ? thing.styleGeneric.contextSettingsGeneric.opacity : undefined,
  }

  if (thing.$type === 'MSShapeGroup') {
    if(thing.layers.length == 1 && thing.layers[0].$type === 'MSRectangleShape') {
      // this is a lone rectangle, which probably wants to be a container?
      const child = thing.layers[0]
      return {
        type: 'Rectangle',
        name: thing.name,
        childName: child.name,
        style: {
          ...style,
          borderRadius: child.cornerRadiusFloat,
          backgroundColor: thing.styleGeneric.fill
            ? color2string(ccolor(thing.styleGeneric.fill.colorGeneric))
            : color2string(ccolor(child.backgroundColorGeneric)),
        },
      }
    } else {
      return {
        type: 'SVG',
        name: thing.name,
        style: {
          ...style,
        },
        backgroundColor: thing.styleGeneric.fill ? color2string(ccolor(thing.styleGeneric.fill.colorGeneric)) : null,
        svgSource: thing.svgString,
      }
    }
  }

  switch (thing.$type) {
    case 'MSSymbolInstance':
      extra = {
        symbolId: thing.symbolID,
      }
      break
    case 'MSSymbolMaster':
      extra = {
        svgSource: thing.svgString,
        // layers: null,
      }
      break
    case 'MSArtboardGroup':
      extraStyle = {
        boxShadow: '0 1px 5px #888',
        overflow: 'hidden',
      }
      break
    case 'MSTextLayer':
      extra = {
        stringValue: thing.stringValue,
        font: thing.font,
      }
      extraStyle = {
        fontSize: thing.font.pointSize,
        fontFamily: thing.font.fontName,
        color: color2string(ccolor(thing.textColor)),
      }
      break
    default:
      break
  }

  return {
    type: thing.$type,
    name: thing.name,
    style: {
      ...style,
      ...extraStyle,
    },
    frame: cframe(thing.frameGeneric),
    background: ccolor(thing.backgroundColorGeneric),
    ...extra,
  }
}

const processLayer = (layer, byId, byName) => {
  if (byId[layer.objectID]) return layer.objectID // already processed
  const uniqueName = findUniqueName(layer.name, byName)
  const node = nodeFromLayer(layer)
  node.layer = layer
  node.uniqueName = uniqueName
  node.id = layer.objectID
  node.children = layer.layers ? layer.layers.map(layer => ({type: 'node', id: processLayer(layer, byId, byName)})) : []
  byName[uniqueName] = node
  byId[node.id] = node
  return node.id
}

function findUniqueName(name, byName) {
  if (!byName[name]) return name
  for (let i=0; i<100000; i++) {
    const tmp = name + i
    if (!byName[tmp]) return tmp
  }
  throw new Error("no unique name for " + name)
}

function processDump({root, converteds}) {
  const symbols = {}
  const byId = {}
  const byName = {}
  inflate(converteds, symbols)
  console.log(symbols)
  for (let id in symbols) {
    symbols[id] = processLayer(symbols[id], byId, byName)
  }
  console.log('ha')
  const doc = converteds[0]
  const page = doc.documentData.pages[0]
  const artboard = page.artboards[0] // TODO process all
  const nodes = {}
  const id = processLayer(artboard, byId, byName)
  const res =  { root: id, symbols, byId, byName }
  window.RES = res
  return res
}

export default processDump
