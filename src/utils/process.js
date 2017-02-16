// @flow

import inflate from './inflateDump'
import uuid from './uuid'

import type {NodeT, /*NodeExtra, */NodeBase, ObjectId} from './types'

const color2string = color => color && (
  color.a === 1
  ? `rgba(${Math.round(color.r * 255)}, ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, ${color.a})`
  : `rgb(${Math.round(color.r * 255)})`)

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

const nodeExtraFromLayer = (layer: any, components: any) => {
  switch (layer.$type) {
    case 'MSSymbolMaster':
      return {type: 'SymbolMaster', svgSource: layer.svgString, children: [], symbolId: layer.symbolID}
    case 'MSSymbolInstance':
      return {
        type: 'ComponentInstance',
        componentId: components[layer.symbolID].id,
        replacedObjectId: layer.objectID,
      }
      // return {type: 'SymbolInstance', symbolId: layer.symbolID}
    case 'MSShapeGroup':
      if (!isRectangleGroup(layer) || (layer.styleGeneric.fill && layer.styleGeneric.fill.image)) {
        return {type: 'ShapeGroup', svgSource: layer.svgString}
      } else {
        return {type: 'Rectangle', svgSource: layer.svgString}
      }
    case 'MSTextLayer':
      return {type: 'Text', stringValue: layer.stringValue}
    case 'MSBitmapLayer':
      return {
        type: 'Image',
        imageData: layer.imageData,
        fillReplacesImage: layer.fillReplacesImage,
        tintColor: layer.styleGeneric.fill && color2string(ccolor(layer.styleGeneric.fill.colorGeneric)),
      }
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

const cborder = border => border && border.isEnabled && border.colorGeneric && border.colorGeneric.alpha && `${border.thickness}px solid ${color2string(ccolor(border.colorGeneric))}`

const styleExtraFromLayer = (layer: any) => {
  switch (layer.$type) {
    case 'MSBitmapLayer':
      return {
        tintColor: layer.styleGeneric.fill && color2string(ccolor(layer.styleGeneric.fill.colorGeneric)),
      }
    case 'MSShapeGroup':
      if (isRectangleGroup(layer)) {
        const child = layer.layers[0]
        const frame = cframe(layer.frameGeneric)
        const border = layer.styleGeneric.borders[0]
        return {
          ...border && border.position === 2
            ? {
              left: frame.left - border.thickness,
              top: frame.top - border.thickness,
              width: frame.width + border.thickness * 2,
              height: frame.height + border.thickness * 2,
            }
            : null,
          borderRadius: child.cornerRadiusFloat,
          backgroundColor: layer.styleGeneric.fill
            ? color2string(ccolor(layer.styleGeneric.fill.colorGeneric))
            : color2string(ccolor(child.backgroundColorGeneric)),
          border: cborder(border),
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
        // boxShadow: '0 1px 5px #000',
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

const nodeBaseFromLayer = (layer: any, idsByName: any, parent: ObjectId): NodeBase => ({
    id: layer.objectID,
    parent,
    name: layer.name,
    uniqueName: findUniqueName(layer.name, idsByName), // TODO fill in
    importedStyle: {
      ...styleFromLayer(layer),
      ...styleExtraFromLayer(layer),
    },
    style: {},
})

const nodeFromLayer = (layer: any, idsByName: any, components: any, parent: ObjectId): NodeT => {
  const node = typeof layer === 'string' ? {
    type: 'ImportError',
    id: layer,
    parent,
    uniqueName: findUniqueName('errorImporting', idsByName),
    name: 'errorImporting',
    importedStyle: {},
    style: {},
  } : {
    ...nodeBaseFromLayer(layer, idsByName, parent),
    ...nodeExtraFromLayer(layer, components),
  }
  if (node.type === 'ComponentInstance') {
    node.id = uuid()
  }
  // $FlowFixMe I want to use an intersection of unions but bugs https://github.com/facebook/flow/issues/3391
  return node
}

const calcChildSize = (children, byId) => {
  let w = 0
  let h = 0
  children.forEach(id => {
    const child = byId[id]
    w = Math.max(
      child.importedStyle.left + (
        child.importedStyle.width
          ? child.importedStyle.width
          : (child.childSize ? child.childSize.width : 0)
      ),
      w
    )
    h = Math.max(
      child.importedStyle.top + (
        child.importedStyle.height
          ? child.importedStyle.height
          : (child.childSize ? child.childSize.height : 0)
      ),
      h
    )
  })
  return {width: w, height: h}
}

const processLayer = (layer, byId, idsByName, components, parent: ObjectId): ObjectId => {
  const node: NodeT = nodeFromLayer(layer, idsByName, components, parent)
  if (node.type === 'SymbolMaster') {
    node.id = node.symbolId
    components[node.id] = {
      rootName: node.uniqueName,
      id: uuid(),
    }
  }
  idsByName[node.uniqueName] = node.id
  byId[node.id] = node
  switch (node.type) {
    case 'SymbolMaster':
    case 'Group':
      if (!layer.layers) {
        debugger
      }
      node.children = layer.layers.map(child => processLayer(child, byId, idsByName, components, node.id))
      node.childSize = calcChildSize(node.children, byId)
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

type Components = {
  [symbolId: string]: {
    rootName: string,
    id: string,
  }
}

function processDump({root, converteds}: any) {
  const symbols = {}
  inflate(converteds, symbols)
  const byId = {}
  const idsByName = {}
  const components = {}
  for (let id in symbols) {
    symbols[id] = processLayer(symbols[id], byId, idsByName, components, null)
  }
  const artboard = converteds[0]
  const nodes = {}
  const id = processLayer(artboard, byId, idsByName, components, null)
  const res =  { root: id, symbols, byId, idsByName, components }
  window.RES = res
  return res
}

export default processDump
