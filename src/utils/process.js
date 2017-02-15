// @flow

import inflate from './inflateDump'

import type {Node, /*NodeExtra, */NodeBase, ObjectId} from './types'

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

const isRectangleGroup = thing => thing.layers.length === 1 && thing.layers[0].$type === 'MSRectangleShape'

const nodeExtraFromLayer = (layer: any) => {
  switch (layer.$type) {
    case 'MSSymbolMaster':
      return {type: 'SymbolMaster', svgSource: layer.svgString, children: [], symbolId: layer.symbolID}
    case 'MSSymbolInstance':
      return {type: 'SymbolInstance', symbolId: layer.symbolID}
    case 'MSShapeGroup':
      if (isRectangleGroup(layer)) {
        return {type: 'Rectangle'}
      } else {
        return {type: 'ShapeGroup', svgSource: layer.svgString}
      }
    case 'MSTextLayer':
      return {type: 'Text', stringValue: layer.stringValue}
    default:
      return {type: 'Group', children: []}
  }
}

const fixedSVGFrame = (frame, svgString) => {
  const match = svgString.match(/width="(\d+)px" height="(\d+)px"/)
  if (!match) {
    console.log(svgString)
    throw new Error('failed to find svg dims')
  }
  let {left, top} = frame
  let [_, width, height] = match
  width = +width
  height = +height
  if (width > frame.width) {
    left -= (width - frame.width) / 2
  } else {
    width = frame.width
  }
  if (height > frame.height) {
    top -= (height - frame.height) / 2
  } else {
    height = frame.height
  }
  return {top, left, width, height}
}

const styleExtraFromLayer = (layer: any) => {
  switch (layer.$type) {
    case 'MSShapeGroup':
      if (isRectangleGroup(layer)) {
        const child = layer.layers[0]
        return {
          borderRadius: child.cornerRadiusFloat,
          backgroundColor: layer.styleGeneric.fill
            ? color2string(ccolor(layer.styleGeneric.fill.colorGeneric))
            : color2string(ccolor(child.backgroundColorGeneric)),
        }
      } else {
        const frame = cframe(layer.frameGeneric)
        return fixedSVGFrame(frame, layer.svgString)
      }
    case 'MSTextLayer':
      return {
        fontSize: layer.font.pointSize,
        fontFamily: layer.font.fontName,
        color: color2string(ccolor(layer.textColor)),
      }
    case 'MSArtboardGroup':
      return {
        boxShadow: '0 1px 5px #000',
        overflow: 'hidden',
      }
    default:
      return {}
  }
}

const styleFromLayer = (layer: any) => {
  return {
    position: 'absolute',
    display: layer.isVisible !== false ? 'flex' : 'none',
    ...cframe(layer.frameGeneric),
    backgroundColor: color2string(ccolor(layer.backgroundColorGeneric)),
    borderRadius: layer.cornerRadiusFloat,
    boxShadow: layer.styleGeneric && layer.styleGeneric.shadow ? cshadow(layer.styleGeneric.shadow) : null,
    opacity: layer.styleGeneric && layer.styleGeneric.contextSettingsGeneric
      ? layer.styleGeneric.contextSettingsGeneric.opacity
      : undefined,
  }
}

const nodeBaseFromLayer = (layer: any, idsByName: any): NodeBase => ({
    id: layer.objectID,
    name: layer.name,
    uniqueName: findUniqueName(layer.name, idsByName), // TODO fill in
    style: {
      ...styleFromLayer(layer),
      ...styleExtraFromLayer(layer),
    }
})

const nodeFromLayer = (layer: any, idsByName: any): Node => {
  const node = typeof layer === 'string' ? {
    type: 'ImportError',
    id: layer,
    uniqueName: findUniqueName('errorImporting', idsByName),
    name: 'errorImporting',
    style: {},
  } : {
    ...nodeBaseFromLayer(layer, idsByName),
    ...nodeExtraFromLayer(layer),
  }
  // $FlowFixMe I want to use an intersection of unions but bugs https://github.com/facebook/flow/issues/3391
  return node
}

const processLayer = (layer, byId, idsByName): ObjectId => {
  const node: Node = nodeFromLayer(layer, idsByName)
  if (node.type === 'SymbolMaster') {
    node.id = node.symbolId
  }
  idsByName[node.uniqueName] = node.id
  byId[node.id] = node
  switch (node.type) {
    case 'SymbolMaster':
    case 'Group':
      if (!layer.layers) {
        debugger
      }
      node.children = layer.layers.map(child => processLayer(child, byId, idsByName))
  }
  return node.id
}

function findUniqueName(name, idsByName) {
  if (!idsByName[name]) return name
  for (let i=0; i<100000; i++) {
    const tmp = name + i
    if (!idsByName[tmp]) return tmp
  }
  throw new Error("no unique name for " + name)
}

function processDump({root, converteds}: any) {
  const symbols = {}
  inflate(converteds, symbols)
  const byId = {}
  const idsByName = {}
  for (let id in symbols) {
    symbols[id] = processLayer(symbols[id], byId, idsByName)
  }
  console.log('ha')
  // const doc = converteds[0]
  // const page = doc.documentData.pages[0]
  const artboard = converteds[0]
  const nodes = {}
  const id = processLayer(artboard, byId, idsByName)
  const res =  { root: id, symbols, byId, idsByName }
  window.RES = res
  return res
}

export default processDump
