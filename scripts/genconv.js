
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
  'MSDocument',
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
  'MSArtboardGroup',
  'MSImmutableSymbolMaster',
  'MSImmutableSharedStyle',
  'MSBitmapLayer',
]

const clearedForInheritance = [
  'MSImmutableSymbolMaster',
  'MSSymbolInstance',
  'MSSymbolMaster',
]

const extraProps = {
  'MSShapeGroup': `\n    svgString: generateSVGString(data) + '',`,
  'MSSymbolMaster': `\n    svgString: generateSVGString(data) + '',`,
  'MSBitmapLayer': `\n    imageData: data.image().data().base64EncodedStringWithOptions([]) + '',`,
}
const extraCode = {
  'MSSymbolInstance': '\n    referencedSymbols[data.symbolID()] = true',
}

const disable = {
  MSTextLayer: ['baselineOffsetsValue', 'baselineOffsets', 'exportOptionsGeneric', 'influenceRectEdgePaddingsThatCascadeToContainedLayers'],
  // MSPage: ['cachedArtboards', 'cachedExportableLayers', 'currentArtboard', 'layers'],
  MSSymbolInstance: ['symbolMasterEdgePaddings'],
  MSContentDrawView: ['zoomTool'],
  MSNormalEventHandler: ['positionDrawing'],
  MSImmutableSymbolMaster: ['influenceRectEdgePaddingsThatDoNotCascade'],
  BCOutlineViewController: [
    'currentlyHoveredView'
  ],
}

const whitelist = {
  MSSymbolInstance: [
    'symbolID',
    'name',
    'nameIsFixed',
    'nodeName',
    'frameGeneric',
    'origin',
    'rect',
  ],
  MSSymbolMaster: [
    'symbolID',
    'svgString',
    'frame',
    'isActive',
    'rotation',
    'styleGeneric',
    'absolutePosition',
    'styledLayer',
    'nodeName',
    'debugDescription',
    'description',
    'isFlippedHorizontal',
    'isFlippedVertical',
    'isLayerExportable',
    'isSelected',
    'isVisible',
    'layers',
    'layout',
    'name',
    'nameIsFixed',
  ]
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
  if (!data) return null
  return {
    $type: "${name}",
    ${attrs.join('\n    ')}
  }
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
      .filter(p => !whitelist[name] || whitelist[name].indexOf(p.name) !== -1)
      .map(prop => (
        `${prop.name}: data.${prop.name} ? ${convertType(prop.type, 'data.' + prop.name + '()')} : null,`
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
      .filter(p => !whitelist[name] || whitelist[name].indexOf(p.name) !== -1)
      .map(prop => (
        `${prop.name}: data.${prop.name} ? ${convertType(prop.type, 'data.' + prop.name + '()')} : null,`
      ))

    const fullin = clearedForInheritance.indexOf(name) === -1
      ? '// ' + inheritext.join('\n    // ')
      : inheritext.join('\n    ')

    convs.iface[name] = `function ${fname}(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  // log('converting ${name}')
  if (!data) return null
  converteds[idx] = {
    $type: "${name}",
    objectID: data.objectID ? data.objectID() + '' : null,
    ${attrs.join('\n    ')}

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    ${fullin}${extraProps[name] || ''}
  }${extraCode[name] || ''}
  return {$ref: idx}
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

const optional = `

`


const preamble = `

var natives = []
var converteds = []
var referencedSymbols = {}

var exportFolder = '/Users/jared/tmp'

function nameForScale(scale) {
	return (scale > 1) ? "@" + scale + "x" : "";
}

function deleteFile(name) {
  var fileManager = [NSFileManager defaultManager];
  [fileManager removeItemAtPath:name error:nil];
}

function exportImageForLayer(layer, exportPath, imageFormat, imageScales) {
  var filePaths = [];
  var formats = imageScales.map(function(scale) {
    return [MSExportFormat formatWithScale:scale name:nameForScale(scale) fileFormat:imageFormat];
  });
  var requests = [MSExportRequest exportRequestsFromExportableLayer:layer exportFormats:formats useIDForName: false];
  requests.forEach(function(request) {
    var filePath = exportPath + request.name() + "." + request.format();
    filePaths.push(filePath);
    [doc saveExportRequest:request toFile: filePath];
  });
  return filePaths;
}

function generateSVGString(layer) {
  var filePaths = exportImageForLayer(layer, exportFolder, 'svg', [1]);
  var filePath = filePaths[0]
  if (!filePath) {
    return log("WWWWWAAT")
  }
  var fileUrl = [NSURL fileURLWithPath:filePath];
  var src = [[NSString alloc] initWithContentsOfURL:fileUrl];
  deleteFile(filePath);
  return src
}

function convertGeneric(data) {
/*
  var idx = natives.indexOf(data)
  if (idx !== -1) return idx
  idx = natives.length
  natives.push(data)
  converteds[idx] = _convertGeneric(data)
  return idx
}

function _convertGeneric(data) {
*/
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

function findArtboard(node) {
  while (node && !(node instanceof MSArtboardGroup)) {
    node = node.parentObject()
  }
  return node
}

function getSelectedArtboards(document) {
  var selected = document.selectedLayers.nativeLayers
  var artboards = {}
  selected.forEach(function (node) {
    if (!node) return
    var artboard = findArtboard(node)
    artboards[artboard.objectID()] = artboard
  })
  return Object.keys(artboards).map(function(id) {return artboards[id]})
}

function getSymbolsPage(document) {
  var pages = document.sketchObject.pages()
  for (var i=0; i<pages.length; i++) {
    if (pages[i].name() == 'Symbols') {
      return pages[i]
    }
  }
}

function processSymbols(symbolsPage, i) {
  if (i > 100) {
    log('help! infinite loop')
    return
  }
  var foundNew = false
  var symbols = referencedSymbols
  log('referenced ' + JSON.stringify(symbols))
  referencedSymbols = {}
  symbolsPage.layers().forEach(function (layer) {
    if (layer.symbolID && symbols[layer.symbolID()]) {
      if (natives.indexOf(layer) === -1) {
        log('got a symbol here')
        foundNew = true
        convertGeneric(layer)
      }
    }
  })
  if (foundNew) {
    processSymbols(symbolsPage, i+1)
  }
}

function runExport(dest, asJs) {
  log('running export')
  var document = context.api().selectedDocument

  var artboards = getSelectedArtboards(document)
  if (artboards.length !== 1) {
    log('must have exactly one selected artboard')
  }
  var symbolsPage = getSymbolsPage(document)
  if (!symbolsPage) {
    log('failed to find symbols page')
    return
  }

  var root = convertGeneric(artboards[0])
  processSymbols(symbolsPage, 1)

  var dump = JSON.stringify({root: root, converteds: converteds}, null, 2)
  if (asJs) {
    dump = 'window.DATA = ' + dump
  }
  writeFile(dest, dump)
  log('dumped!')
}

var dest = context.scriptPath.stringByDeletingLastPathComponent() + '/dump.json'
runExport(dest)
`

const fs = require('fs')
fs.writeFileSync(path.join(__dirname, 'export.sketchplugin'), text, 'utf8')

console.log('unconvertable')
console.log(general.join('\n'))
