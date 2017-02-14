
const path = require('path')
const {structs, ifaces} = require(path.join(__dirname, '../data/parse.json'))

const plain = [
  'BOOL',
  'char',
]

const nums = [
  'long',
  'double',
  'int',
  'NSNumber',
]

const starts = [
  'MSShapeGroup',
  'MSTextLayer',
  'MSOvalShape',
  'MSRectangleShape',
  'MSShapePathLayer',
  'MSLayer',
  'MSCurvePoint',
  'MSLayerGroup',
  'MSPage',
  'MSSymbolInstance',
  'MSSymbolMaster',
]

const disable = {
  MSTextLayer: ['baselineOffsetsValue', 'baselineOffsets', 'exportOptionsGeneric', 'influenceRectEdgePaddingsThatCascadeToContainedLayers'],
  MSPage: ['cachedArtboards', 'cachedExportableLayers', 'currentArtboard', 'layers'],
}

const globalDisable = [
  'influenceRectEdgePaddingsThatCascadeToContainedLayers',
  'parentObject',
  'modelObjectCacheGeneration',
  'immutableModelObject',
  'cachedImmutableModelObject',
]

const convs = {struct: {
  BCEdgePaddings: `function convBCEdgePaddingsStruct(data) {
  // Don't know why this always fails
  return null
}`,
}, iface: {
  NSFont: `function convNSFontIface(font) {
    if (!font) return null
    return {
        familyName: font.familyName() + '',
        fontName: font.fontName() + '',
        pointSize: font.pointSize(),
    }
}`,
}}

const general = []

const convertType = (type, vbl) => {
  if (!type) return 'null/*id*/'
  if (type === 'NSArray') {
    return `convertArray(${vbl})`
  } else if (type === 'NSDictionary') {
    return `convertDictionary(${vbl})`
  }
  if (type === 'BOOL') return `!!${vbl}`
  if (plain.indexOf(type) !== -1) return vbl
  if (type === 'NSString') return `${vbl} + ''`
  if (nums.indexOf(type) !== -1) return `+${vbl}`
  if (structs[type]) return convertStruct(type, vbl)
  if (ifaces[type]) return convertIface(type, vbl)
  if (general.indexOf(type) === -1) general.push(type)
  return `null/* ${type} */`
}

const convertStruct = (name, vbl) => {
  const fname = `conv${name}Struct`
  if (!convs.struct[name]) {
    convs.struct[name] = true
    const attrs = structs[name].properties.map(prop => (
      `${prop.name}: ${convertType(prop.type, 'data.' + prop.name)},`
    ))
    convs.struct[name] = `function ${fname}(data) {
  // log('converting ${name}')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "${name}",
    ${attrs.join('\n    ')}
  }
  return data.description
}`
  }
  return `${fname}(${vbl})`
}

const convertIface = (name, vbl) => {
  // TODO account for superclass
  const fname = `conv${name}Iface`
  if (!convs.iface[name]) {
    convs.iface[name] = true

    const propnames = ifaces[name].properties.map(p => p.name)

    const attrs = ifaces[name].properties
      .filter(p => (disable[name] || []).indexOf(p.name) === -1)
      .filter(p => globalDisable.indexOf(p.name) === -1)
      .map(prop => (
        `${prop.name}: ${convertType(prop.type, 'data.' + prop.name + '()')},`
      ))

    let superc = ifaces[name].superclass
    let inheritnames = []
    let inherited = []
    while (superc && ifaces[superc]) {
      const items = ifaces[superc].properties.filter(x => propnames.indexOf(x.name) === -1 &&
                                                         inheritnames.indexOf(x.name) === -1)
      inherited.push(...items)
      inheritnames.push(...items.map(m => m.name))
      superc = ifaces[superc].superclass
    }
    const inheritext = inherited
      .filter(p => (disable[name] || []).indexOf(p.name) === -1)
      .filter(p => globalDisable.indexOf(p.name) === -1)
      .map(prop => (
        `${prop.name}: ${convertType(prop.type, 'data.' + prop.name + '()')},`
      ))

    convs.iface[name] = `function ${fname}(data) {
  // log('converting ${name}')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "${name}",
    ${attrs.join('\n    ')}

    // inherited
    ${inheritext.join('\n    ')}
  }
  return data.description
}`
  }
  return `${fname}(${vbl})`
}

starts.forEach(name => convertType(name, 'hello'))
const stt = Object.keys(convs.struct)
  .map(k => convs.struct[k]).join('\n\n')
const itt = Object.keys(convs.iface)
  .map(k => convs.iface[k]).join('\n\n')

// TODO I should sort this by superclasses n stuff
const tests = Object.keys(convs.iface).map(name => (
  `if (data instanceof ${name}) {
    return conv${name}Iface(data)
  }`
))

const preamble = `

var seen = {}

function convertGeneric(data) {
  if (!data.description) return _convertGeneric(data)
  if (!seen[data.description]) seen[data.description] = _convertGeneric(data)
  return data.description
}

function _convertGeneric(data) {
  ${tests[0]} else ${tests.slice(1).join(' else ')}
    // NSColor
  else if (data.redComponent && data.greenComponent) {
    return {r: data.redComponent(), g: data.greenComponent(), b: data.blueComponent(), a: data.alphaComponent()}
    // NSParagraphAttribute
  } else if (data.firstLineHeadIndent != null && data.lineHeightMultiple != null) {
    return nsParagraphStyleToJSON(data)
  } else if (typeof data === 'string' || typeof data === 'number' || !data || data === true) {
    return data
  }
  return '' + data
}

function convertArray(arr) {
  // log('converting arr')
  if (!arr) return null
  return [].map.call(arr, convertGeneric)
}

function convertDictionary(dict) {
  // log('convert dict')
  if (!dict) return null
  var res = {}
  Object.keys(dict).forEach(function(key){ res[key] = convertGeneric(dict[key])})
  return res
}

var alignments = ['left', 'right', 'center', 'justified', 'natural']

function nsParagraphStyleToJSON(style) {
    if (!style) return null
    return {
        firstLineHeadIndent: style.firstLineHeadIndent(),
        headIndent: style.headIndent(),
        tailIndent: style.tailIndent(),
        lineHeightMultiple: style.lineHeightMultiple(),
        maximumLineHeight: style.maximumLineHeight(),
        minimumLineHeight: style.minimumLineHeight(),
        lineSpacing: style.lineSpacing(),
        paragraphSpacing: style.paragraphSpacing(),
        paragraphSpacingBefore: style.paragraphSpacingBefore(),
        alignment: alignments[style.alignment()],
    }
}

`

const text = `
${preamble}

// Structs

${stt}

// Classes

${itt}

function writeFile(path, data) {
  @"".stringByAppendingString(data).dataUsingEncoding(NSUTF8StringEncoding)
    .writeToFile_atomically_(@"".stringByAppendingString(path), true);
}

/*
var modal = NSSavePanel.savePanel()
modal.allowedFileTypes = ['json']
modal.runModal()
var dest = modal.URL().path()
*/

var dest = '/Users/jared/khan/skreact/output.json'

var d = context.api().selectedDocument.selectedPage.sketchObject
var dump = JSON.stringify({items: convertGeneric(d), seen: seen}, null, 2)
writeFile(dest, dump)
log('dumped!')
`

const fs = require('fs')
fs.writeFileSync(path.join(__dirname, 'sketchExportJSON.js'), text, 'utf8')

console.log('unconvertable')
console.log(general.join('\n'))
