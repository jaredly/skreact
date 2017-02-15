
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

const process = (thing, parent) => {
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
        orig: thing,
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
        orig: thing,
      }
    }
  }

  switch (thing.$type) {
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
    layers: thing.layers && thing.layers.map(child => process(child, thing)),
    orig: thing,
    ...extra,
  }
}

function inflate(converteds, symbols) {
  for (let i = 0; i < converteds.length; i++) {
    const node = converteds[i]
    if (node && node.$type === 'MSSymbolMaster') {
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
  }
}

function processDump({root, converteds}) {
  const symbols = {}
  inflate(converteds, symbols)
  for (let id in symbols) {
    symbols[id] = process(symbols[id])
  }
  console.log('ha')
  const doc = converteds[0]
  const page = doc.documentData.pages[0]
  const artboard = page.artboards[0] // TODO process all
  return { root: process(artboard), symbols }
}

export default processDump

const color2string = color => color && `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a})`
