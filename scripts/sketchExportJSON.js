


var seen = {}

function convertGeneric(data) {
  if (!data.description) return _convertGeneric(data)
  if (!seen[data.description]) seen[data.description] = _convertGeneric(data)
  return data.description
}

function _convertGeneric(data) {
  if (data instanceof NSFont) {
    return convNSFontIface(data)
  } else if (data instanceof MSShapeGroup) {
    return convMSShapeGroupIface(data)
  } else if (data instanceof NSBezierPath) {
    return convNSBezierPathIface(data)
  } else if (data instanceof MSPath) {
    return convMSPathIface(data)
  } else if (data instanceof MSExportOptions) {
    return convMSExportOptionsIface(data)
  } else if (data instanceof MSDocumentData) {
    return convMSDocumentDataIface(data)
  } else if (data instanceof BCCache) {
    return convBCCacheIface(data)
  } else if (data instanceof NSSet) {
    return convNSSetIface(data)
  } else if (data instanceof MSImageCollection) {
    return convMSImageCollectionIface(data)
  } else if (data instanceof MSPage) {
    return convMSPageIface(data)
  } else if (data instanceof MSRect) {
    return convMSRectIface(data)
  } else if (data instanceof MSSimpleGrid) {
    return convMSSimpleGridIface(data)
  } else if (data instanceof MSRulerData) {
    return convMSRulerDataIface(data)
  } else if (data instanceof MSLayoutGrid) {
    return convMSLayoutGridIface(data)
  } else if (data instanceof NSColor) {
    return convNSColorIface(data)
  } else if (data instanceof MSStyle) {
    return convMSStyleIface(data)
  } else if (data instanceof MSTextStyle) {
    return convMSTextStyleIface(data)
  } else if (data instanceof MSStyleShadow) {
    return convMSStyleShadowIface(data)
  } else if (data instanceof MSColor) {
    return convMSColorIface(data)
  } else if (data instanceof MSGraphicsContextSettings) {
    return convMSGraphicsContextSettingsIface(data)
  } else if (data instanceof MSStyleBorder) {
    return convMSStyleBorderIface(data)
  } else if (data instanceof MSGradient) {
    return convMSGradientIface(data)
  } else if (data instanceof MSStyleFill) {
    return convMSStyleFillIface(data)
  } else if (data instanceof MSImageData) {
    return convMSImageDataIface(data)
  } else if (data instanceof NSImage) {
    return convNSImageIface(data)
  } else if (data instanceof NSData) {
    return convNSDataIface(data)
  } else if (data instanceof MSStyleBlur) {
    return convMSStyleBlurIface(data)
  } else if (data instanceof MSStyleBorderOptions) {
    return convMSStyleBorderOptionsIface(data)
  } else if (data instanceof MSStyleColorControls) {
    return convMSStyleColorControlsIface(data)
  } else if (data instanceof MSStyleReflection) {
    return convMSStyleReflectionIface(data)
  } else if (data instanceof MSAbsoluteRect) {
    return convMSAbsoluteRectIface(data)
  } else if (data instanceof MSLayer) {
    return convMSLayerIface(data)
  } else if (data instanceof MSStyledLayer) {
    return convMSStyledLayerIface(data)
  } else if (data instanceof NSMenu) {
    return convNSMenuIface(data)
  } else if (data instanceof MSAssetCollection) {
    return convMSAssetCollectionIface(data)
  } else if (data instanceof MSSharedStyleContainer) {
    return convMSSharedStyleContainerIface(data)
  } else if (data instanceof MSSymbolContainer) {
    return convMSSymbolContainerIface(data)
  } else if (data instanceof MSSharedTextStyleContainer) {
    return convMSSharedTextStyleContainerIface(data)
  } else if (data instanceof MSTextLayer) {
    return convMSTextLayerIface(data)
  } else if (data instanceof NSAttributedString) {
    return convNSAttributedStringIface(data)
  } else if (data instanceof MSAttributedString) {
    return convMSAttributedStringIface(data)
  } else if (data instanceof MSOvalShape) {
    return convMSOvalShapeIface(data)
  } else if (data instanceof MSShapePath) {
    return convMSShapePathIface(data)
  } else if (data instanceof MSRectangleShape) {
    return convMSRectangleShapeIface(data)
  } else if (data instanceof MSShapePathLayer) {
    return convMSShapePathLayerIface(data)
  } else if (data instanceof MSCurvePoint) {
    return convMSCurvePointIface(data)
  } else if (data instanceof MSLayerGroup) {
    return convMSLayerGroupIface(data)
  } else if (data instanceof MSSymbolInstance) {
    return convMSSymbolInstanceIface(data)
  } else if (data instanceof MSSymbolMaster) {
    return convMSSymbolMasterIface(data)
  }
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



// Structs

function convBCEdgePaddingsStruct(data) {
  // Don't know why this always fails
  return null
}

function convCGRectStruct(data) {
  // log('converting CGRect')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "CGRect",
    origin: convCGPointStruct(data.origin),
    size: convCGSizeStruct(data.size),
  }
  return data.description
}

function convCGPointStruct(data) {
  // log('converting CGPoint')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "CGPoint",
    x: +data.x,
    y: +data.y,
  }
  return data.description
}

function convCGSizeStruct(data) {
  // log('converting CGSize')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "CGSize",
    width: +data.width,
    height: +data.height,
  }
  return data.description
}

function convCGAffineTransformStruct(data) {
  // log('converting CGAffineTransform')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "CGAffineTransform",
    a: +data.a,
    b: +data.b,
    c: +data.c,
    d: +data.d,
    tx: +data.tx,
    ty: +data.ty,
  }
  return data.description
}

function conv_CHTransformStructStruct(data) {
  // log('converting _CHTransformStruct')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "_CHTransformStruct",
    _field1: +data._field1,
    _field2: data._field2,
    _field3: data._field3,
    _field4: data._field4,
  }
  return data.description
}

// Classes

function convNSFontIface(font) {
    if (!font) return null
    return {
        familyName: font.familyName() + '',
        fontName: font.fontName() + '',
        pointSize: font.pointSize(),
    }
}

function convMSShapeGroupIface(data) {
  // log('converting MSShapeGroup')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSShapeGroup",
    isPartOfClippingMask: !!data.isPartOfClippingMask(),
    isClosed: !!data.isClosed(),
    bezierPath: convNSBezierPathIface(data.bezierPath()),
    hasDecorations: !!data.hasDecorations(),
    decoratedBezierPathInBounds: convNSBezierPathIface(data.decoratedBezierPathInBounds()),
    bezierPathInBounds: convNSBezierPathIface(data.bezierPathInBounds()),
    pathInBounds: convMSPathIface(data.pathInBounds()),
    bezierPathWithTransforms: convNSBezierPathIface(data.bezierPathWithTransforms()),
    length: +data.length(),
    y2: +data.y2(),
    x2: +data.x2(),
    y1: +data.y1(),
    x1: +data.x1(),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    bounds: convCGRectStruct(data.bounds()),
    clippingMaskMode: +data.clippingMaskMode(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasClickThrough: !!data.hasClickThrough(),
    hasClippingMask: !!data.hasClippingMask(),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    layers: convertArray(data.layers()),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    sharedObjectID: null/* NSObject<NSCopying><NSCoding> */,
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),
    windingRule: +data.windingRule(),

    // inherited
    preCalculatedHasSelectedLayer: +data.preCalculatedHasSelectedLayer(),
    lightweightContainsSelectedItem: !!data.lightweightContainsSelectedItem(),
    isOpen: !!data.isOpen(),
    hasLayerWithMaskMode: +data.hasLayerWithMaskMode(),
    enableAutomaticScaling: !!data.enableAutomaticScaling(),
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convNSBezierPathIface(data) {
  // log('converting NSBezierPath')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSBezierPath",
    

    // inherited
    
  }
  return data.description
}

function convMSPathIface(data) {
  // log('converting MSPath')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSPath",
    signedElementCount: +data.signedElementCount(),
    CGPath: null/* CGPath */,
    elementCount: +data.elementCount(),
    isEmpty: !!data.isEmpty(),
    controlPointBounds: convCGRectStruct(data.controlPointBounds()),
    bounds: convCGRectStruct(data.bounds()),
    safeBounds: convCGRectStruct(data.safeBounds()),

    // inherited
    
  }
  return data.description
}

function convMSExportOptionsIface(data) {
  // log('converting MSExportOptions')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSExportOptions",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportFormats: convertArray(data.exportFormats()),
    includedLayerIds: convertArray(data.includedLayerIds()),
    layerOptions: +data.layerOptions(),
    shouldTrim: !!data.shouldTrim(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSDocumentDataIface(data) {
  // log('converting MSDocumentData')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSDocumentData",
    metadata: convertDictionary(data.metadata()),
    autoExpandGroupsInLayerList: !!data.autoExpandGroupsInLayerList(),
    delegate: null/* MSDocumentDataDelegate */,
    cache: convBCCacheIface(data.cache()),
    images: convMSImageCollectionIface(data.images()),
    currentPage: convMSPageIface(data.currentPage()),
    assetsGeneric: convMSAssetCollectionIface(data.assetsGeneric()),
    cloudShareID: data.cloudShareID() + '',
    cloudShareURL: data.cloudShareURL() + '',
    cloudUserID: data.cloudUserID() + '',
    currentPageIndex: +data.currentPageIndex(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    enableLayerInteraction: !!data.enableLayerInteraction(),
    enableSliceInteraction: !!data.enableSliceInteraction(),
    layerStylesGeneric: convMSSharedStyleContainerIface(data.layerStylesGeneric()),
    layerSymbolsGeneric: convMSSymbolContainerIface(data.layerSymbolsGeneric()),
    layerTextStylesGeneric: convMSSharedTextStyleContainerIface(data.layerTextStylesGeneric()),
    pages: convertArray(data.pages()),

    // inherited
    layerTextStyles: convMSSharedTextStyleContainerIface(data.layerTextStyles()),
    layerSymbols: convMSSymbolContainerIface(data.layerSymbols()),
    layerStyles: convMSSharedStyleContainerIface(data.layerStyles()),
    assets: convMSAssetCollectionIface(data.assets()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convBCCacheIface(data) {
  // log('converting BCCache')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "BCCache",
    count: +data.count(),
    allOwners: convNSSetIface(data.allOwners()),

    // inherited
    
  }
  return data.description
}

function convNSSetIface(data) {
  // log('converting NSSet')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSSet",
    

    // inherited
    
  }
  return data.description
}

function convMSImageCollectionIface(data) {
  // log('converting MSImageCollection')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSImageCollection",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    images: convertDictionary(data.images()),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSPageIface(data) {
  // log('converting MSPage')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSPage",
    primitiveName: data.primitiveName() + '',
    isLocked: !!data.isLocked(),
    isVisible: !!data.isVisible(),
    zoomValue: +data.zoomValue(),
    scrollOrigin: convCGPointStruct(data.scrollOrigin()),
    hasClickThrough: !!data.hasClickThrough(),
    artboards: convertArray(data.artboards()),
    contentBounds: convCGRectStruct(data.contentBounds()),
    exportableLayersCount: +data.exportableLayersCount(),
    rulerBase: convCGPointStruct(data.rulerBase()),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    grid: convMSSimpleGridIface(data.grid()),
    gridGeneric: convMSSimpleGridIface(data.gridGeneric()),
    hasTransforms: !!data.hasTransforms(),
    horizontalRulerData: convMSRulerDataIface(data.horizontalRulerData()),
    horizontalRulerDataGeneric: convMSRulerDataIface(data.horizontalRulerDataGeneric()),
    includeInCloudUpload: !!data.includeInCloudUpload(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isSelected: !!data.isSelected(),
    layerListExpandedType: +data.layerListExpandedType(),
    layout: convMSLayoutGridIface(data.layout()),
    layoutGeneric: convMSLayoutGridIface(data.layoutGeneric()),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    sharedObjectID: null/* NSObject<NSCopying><NSCoding> */,
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),
    verticalRulerData: convMSRulerDataIface(data.verticalRulerData()),
    verticalRulerDataGeneric: convMSRulerDataIface(data.verticalRulerDataGeneric()),

    // inherited
    preCalculatedHasSelectedLayer: +data.preCalculatedHasSelectedLayer(),
    lightweightContainsSelectedItem: !!data.lightweightContainsSelectedItem(),
    isOpen: !!data.isOpen(),
    hasLayerWithMaskMode: +data.hasLayerWithMaskMode(),
    enableAutomaticScaling: !!data.enableAutomaticScaling(),
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSRectIface(data) {
  // log('converting MSRect')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSRect",
    bottom: +data.bottom(),
    right: +data.right(),
    mid: convCGPointStruct(data.mid()),
    description: data.description() + '',
    primitiveConstrainProportions: !!data.primitiveConstrainProportions(),
    midY: +data.midY(),
    midX: +data.midX(),
    maxY: +data.maxY(),
    minY: +data.minY(),
    maxX: +data.maxX(),
    minX: +data.minX(),
    top: +data.top(),
    left: +data.left(),
    origin: convCGPointStruct(data.origin()),
    size: convCGSizeStruct(data.size()),
    rect: convCGRectStruct(data.rect()),
    constrainProportions: !!data.constrainProportions(),
    debugDescription: data.debugDescription() + '',
    height: +data.height(),
    width: +data.width(),
    x: +data.x(),
    y: +data.y(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSSimpleGridIface(data) {
  // log('converting MSSimpleGrid')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSSimpleGrid",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    gridSize: +data.gridSize(),
    isEnabled: !!data.isEnabled(),
    thickGridTimes: +data.thickGridTimes(),

    // inherited
    forceDraw: !!data.forceDraw(),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSRulerDataIface(data) {
  // log('converting MSRulerData')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSRulerData",
    base: +data.base(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    guides: convertArray(data.guides()),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSLayoutGridIface(data) {
  // log('converting MSLayoutGrid')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSLayoutGrid",
    darkColor: convNSColorIface(data.darkColor()),
    lightColor: convNSColorIface(data.lightColor()),
    columnWidth: +data.columnWidth(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    drawHorizontal: !!data.drawHorizontal(),
    drawHorizontalLines: !!data.drawHorizontalLines(),
    drawVertical: !!data.drawVertical(),
    gutterHeight: +data.gutterHeight(),
    gutterWidth: +data.gutterWidth(),
    guttersOutside: !!data.guttersOutside(),
    horizontalOffset: +data.horizontalOffset(),
    isEnabled: !!data.isEnabled(),
    numberOfColumns: +data.numberOfColumns(),
    rowHeightMultiplication: +data.rowHeightMultiplication(),
    totalWidth: +data.totalWidth(),

    // inherited
    forceDraw: !!data.forceDraw(),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convNSColorIface(data) {
  // log('converting NSColor')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSColor",
    

    // inherited
    
  }
  return data.description
}

function convMSStyleIface(data) {
  // log('converting MSStyle')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyle",
    thickestInnerStroke: +data.thickestInnerStroke(),
    hasDecorations: !!data.hasDecorations(),
    hasEnabledBackgroundBlur: !!data.hasEnabledBackgroundBlur(),
    primitiveTextStyle: convMSTextStyleIface(data.primitiveTextStyle()),
    primitiveSharedObjectID: data.primitiveSharedObjectID() + '',
    hasBlending: !!data.hasBlending(),
    hasEnabledBorder: !!data.hasEnabledBorder(),
    hasMoreThanOneEnabledFill: !!data.hasMoreThanOneEnabledFill(),
    hasEnabledShadow: !!data.hasEnabledShadow(),
    innerShadow: convMSStyleShadowIface(data.innerShadow()),
    shadow: convMSStyleShadowIface(data.shadow()),
    border: convMSStyleBorderIface(data.border()),
    borderGeneric: convMSStyleBorderIface(data.borderGeneric()),
    fill: convMSStyleFillIface(data.fill()),
    fillGeneric: convMSStyleFillIface(data.fillGeneric()),
    blurGeneric: convMSStyleBlurIface(data.blurGeneric()),
    borderOptionsGeneric: convMSStyleBorderOptionsIface(data.borderOptionsGeneric()),
    borders: convertArray(data.borders()),
    colorControlsGeneric: convMSStyleColorControlsIface(data.colorControlsGeneric()),
    contextSettingsGeneric: convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    endDecorationType: +data.endDecorationType(),
    fills: convertArray(data.fills()),
    innerShadows: convertArray(data.innerShadows()),
    miterLimit: +data.miterLimit(),
    reflectionGeneric: convMSStyleReflectionIface(data.reflectionGeneric()),
    shadows: convertArray(data.shadows()),
    sharedObjectID: null/* NSObject<NSCopying><NSCoding> */,
    startDecorationType: +data.startDecorationType(),
    textStyleGeneric: convMSTextStyleIface(data.textStyleGeneric()),

    // inherited
    textStyle: convMSTextStyleIface(data.textStyle()),
    reflection: convMSStyleReflectionIface(data.reflection()),
    contextSettings: convMSGraphicsContextSettingsIface(data.contextSettings()),
    colorControls: convMSStyleColorControlsIface(data.colorControls()),
    borderOptions: convMSStyleBorderOptionsIface(data.borderOptions()),
    blur: convMSStyleBlurIface(data.blur()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSTextStyleIface(data) {
  // log('converting MSTextStyle')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSTextStyle",
    decodedAttributes: convertDictionary(data.decodedAttributes()),
    attributes: convertDictionary(data.attributes()),
    isRequiredFontAvailable: !!data.isRequiredFontAvailable(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    encodedAttributes: convertDictionary(data.encodedAttributes()),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyleShadowIface(data) {
  // log('converting MSStyleShadow')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleShadow",
    blurRadius: +data.blurRadius(),
    colorGeneric: convMSColorIface(data.colorGeneric()),
    contextSettingsGeneric: convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    isEnabled: !!data.isEnabled(),
    offsetX: +data.offsetX(),
    offsetY: +data.offsetY(),
    spread: +data.spread(),

    // inherited
    contextSettings: convMSGraphicsContextSettingsIface(data.contextSettings()),
    color: convMSColorIface(data.color()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSColorIface(data) {
  // log('converting MSColor')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSColor",
    brightness: +data.brightness(),
    saturation: +data.saturation(),
    hue: +data.hue(),
    description: data.description() + '',
    alpha: +data.alpha(),
    blue: +data.blue(),
    debugDescription: data.debugDescription() + '',
    green: +data.green(),
    red: +data.red(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSGraphicsContextSettingsIface(data) {
  // log('converting MSGraphicsContextSettings')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSGraphicsContextSettings",
    description: data.description() + '',
    blendMode: +data.blendMode(),
    debugDescription: data.debugDescription() + '',
    opacity: +data.opacity(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyleBorderIface(data) {
  // log('converting MSStyleBorder')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleBorder",
    colorGeneric: convMSColorIface(data.colorGeneric()),
    contextSettingsGeneric: convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    fillType: +data.fillType(),
    gradientGeneric: convMSGradientIface(data.gradientGeneric()),
    isEnabled: !!data.isEnabled(),
    position: +data.position(),
    thickness: +data.thickness(),

    // inherited
    gradient: convMSGradientIface(data.gradient()),
    contextSettings: convMSGraphicsContextSettingsIface(data.contextSettings()),
    color: convMSColorIface(data.color()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSGradientIface(data) {
  // log('converting MSGradient')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSGradient",
    svgPositionIsAbsolute: !!data.svgPositionIsAbsolute(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    elipseLength: +data.elipseLength(),
    from: convCGPointStruct(data.from()),
    gradientType: +data.gradientType(),
    shouldSmoothenOpacity: !!data.shouldSmoothenOpacity(),
    stops: convertArray(data.stops()),
    to: convCGPointStruct(data.to()),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyleFillIface(data) {
  // log('converting MSStyleFill')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleFill",
    interfaceOpacity: +data.interfaceOpacity(),
    colorGeneric: convMSColorIface(data.colorGeneric()),
    contextSettingsGeneric: convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    fillType: +data.fillType(),
    gradientGeneric: convMSGradientIface(data.gradientGeneric()),
    image: convMSImageDataIface(data.image()),
    isEnabled: !!data.isEnabled(),
    noiseIndex: +data.noiseIndex(),
    noiseIntensity: +data.noiseIntensity(),
    patternFillType: +data.patternFillType(),
    patternTileScale: +data.patternTileScale(),

    // inherited
    gradient: convMSGradientIface(data.gradient()),
    contextSettings: convMSGraphicsContextSettingsIface(data.contextSettings()),
    color: convMSColorIface(data.color()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSImageDataIface(data) {
  // log('converting MSImageData')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSImageData",
    image: convNSImageIface(data.image()),
    sha1: convNSDataIface(data.sha1()),
    data: convNSDataIface(data.data()),

    // inherited
    
  }
  return data.description
}

function convNSImageIface(data) {
  // log('converting NSImage')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSImage",
    

    // inherited
    
  }
  return data.description
}

function convNSDataIface(data) {
  // log('converting NSData')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSData",
    

    // inherited
    
  }
  return data.description
}

function convMSStyleBlurIface(data) {
  // log('converting MSStyleBlur')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleBlur",
    center: convCGPointStruct(data.center()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    isEnabled: !!data.isEnabled(),
    motionAngle: +data.motionAngle(),
    radius: +data.radius(),
    type: +data.type(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyleBorderOptionsIface(data) {
  // log('converting MSStyleBorderOptions')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleBorderOptions",
    hasDashPattern: !!data.hasDashPattern(),
    dashPattern: convertArray(data.dashPattern()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    isEnabled: !!data.isEnabled(),
    lineCapStyle: +data.lineCapStyle(),
    lineJoinStyle: +data.lineJoinStyle(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyleColorControlsIface(data) {
  // log('converting MSStyleColorControls')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleColorControls",
    brightness: +data.brightness(),
    contrast: +data.contrast(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    hue: +data.hue(),
    isEnabled: !!data.isEnabled(),
    saturation: +data.saturation(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyleReflectionIface(data) {
  // log('converting MSStyleReflection')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyleReflection",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    distance: +data.distance(),
    isEnabled: !!data.isEnabled(),
    strength: +data.strength(),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSAbsoluteRectIface(data) {
  // log('converting MSAbsoluteRect')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSAbsoluteRect",
    layer: convMSLayerIface(data.layer()),
    rulerOrigin: convCGPointStruct(data.rulerOrigin()),
    rulerY: +data.rulerY(),
    rulerX: +data.rulerX(),

    // inherited
    rect: convCGRectStruct(data.rect()),
    size: convCGSizeStruct(data.size()),
    origin: convCGPointStruct(data.origin()),
    description: data.description() + '',
    mid: convCGPointStruct(data.mid()),
    maxY: +data.maxY(),
    midY: +data.midY(),
    minY: +data.minY(),
    maxX: +data.maxX(),
    midX: +data.midX(),
    minX: +data.minX(),
    height: +data.height(),
    width: +data.width(),
    y: +data.y(),
    x: +data.x(),
    debugDescription: data.debugDescription() + '',
  }
  return data.description
}

function convMSLayerIface(data) {
  // log('converting MSLayer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSLayer",
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    isLayerExportable: !!data.isLayerExportable(),
    center: convCGPointStruct(data.center()),
    origin: convCGPointStruct(data.origin()),
    rect: convCGRectStruct(data.rect()),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    hasTransforms: !!data.hasTransforms(),
    isExpanded: !!data.isExpanded(),
    isSelected: !!data.isSelected(),
    bounds: convCGRectStruct(data.bounds()),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLocked: !!data.isLocked(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    originalObjectID: data.originalObjectID() + '',
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),

    // inherited
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSStyledLayerIface(data) {
  // log('converting MSStyledLayer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSStyledLayer",
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),

    // inherited
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convNSMenuIface(data) {
  // log('converting NSMenu')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSMenu",
    

    // inherited
    
  }
  return data.description
}

function convMSAssetCollectionIface(data) {
  // log('converting MSAssetCollection')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSAssetCollection",
    colors: convertArray(data.colors()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportPresets: convertArray(data.exportPresets()),
    gradients: convertArray(data.gradients()),
    imageCollectionGeneric: convMSImageCollectionIface(data.imageCollectionGeneric()),
    images: convertArray(data.images()),

    // inherited
    imageCollection: convMSImageCollectionIface(data.imageCollection()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSSharedStyleContainerIface(data) {
  // log('converting MSSharedStyleContainer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSSharedStyleContainer",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    objects: convertArray(data.objects()),

    // inherited
    delegate: null/* MSSharedObjectContainerDelegate */,
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSSymbolContainerIface(data) {
  // log('converting MSSymbolContainer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSSymbolContainer",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    objects: convertArray(data.objects()),

    // inherited
    delegate: null/* MSSharedObjectContainerDelegate */,
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSSharedTextStyleContainerIface(data) {
  // log('converting MSSharedTextStyleContainer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSSharedTextStyleContainer",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    objects: convertArray(data.objects()),

    // inherited
    delegate: null/* MSSharedObjectContainerDelegate */,
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSTextLayerIface(data) {
  // log('converting MSTextLayer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSTextLayer",
    editingDelegate: null/* MSTextLayerEditingDelegate */,
    defaultLineHeightValue: +data.defaultLineHeightValue(),
    isEditingText: !!data.isEditingText(),
    previousRectCache: convCGRectStruct(data.previousRectCache()),
    stringValue: data.stringValue() + '',
    attributedStringValue: convNSAttributedStringIface(data.attributedStringValue()),
    styleAttributes: convertDictionary(data.styleAttributes()),
    textColor: convMSColorIface(data.textColor()),
    lineHeight: +data.lineHeight(),
    characterSpacing: +data.characterSpacing(),
    fontPostscriptName: data.fontPostscriptName() + '',
    fontSize: +data.fontSize(),
    textAlignment: +data.textAlignment(),
    bezierPath: convNSBezierPathIface(data.bezierPath()),
    font: convNSFontIface(data.font()),
    firstBaselineOffset: +data.firstBaselineOffset(),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    attributedString: convMSAttributedStringIface(data.attributedString()),
    automaticallyDrawOnUnderlyingPath: !!data.automaticallyDrawOnUnderlyingPath(),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    dontSynchroniseWithSymbol: !!data.dontSynchroniseWithSymbol(),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    glyphBounds: convCGRectStruct(data.glyphBounds()),
    hasTransforms: !!data.hasTransforms(),
    heightIsClipped: !!data.heightIsClipped(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    lineSpacingBehaviour: +data.lineSpacingBehaviour(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    preview: convMSImageDataIface(data.preview()),
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),
    textBehaviour: +data.textBehaviour(),

    // inherited
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convNSAttributedStringIface(data) {
  // log('converting NSAttributedString')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "NSAttributedString",
    

    // inherited
    
  }
  return data.description
}

function convMSAttributedStringIface(data) {
  // log('converting MSAttributedString')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSAttributedString",
    transformedAttributedString: convNSAttributedStringIface(data.transformedAttributedString()),
    encodedAttributedString: convNSAttributedStringIface(data.encodedAttributedString()),
    attributedString: convNSAttributedStringIface(data.attributedString()),
    areRequiredFontsAvailable: !!data.areRequiredFontsAvailable(),
    unavailableFontNames: convNSSetIface(data.unavailableFontNames()),
    fontNames: convNSSetIface(data.fontNames()),
    string: data.string() + '',

    // inherited
    
  }
  return data.description
}

function convMSOvalShapeIface(data) {
  // log('converting MSOvalShape')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSOvalShape",
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    booleanOperation: +data.booleanOperation(),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    edited: !!data.edited(),
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    pathGeneric: convMSShapePathIface(data.pathGeneric()),
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),

    // inherited
    isEditing: !!data.isEditing(),
    isClosed: !!data.isClosed(),
    bezierPath: convNSBezierPathIface(data.bezierPath()),
    path: convMSShapePathIface(data.path()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSShapePathIface(data) {
  // log('converting MSShapePath')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSShapePath",
    description: data.description() + '',
    numberOfPoints: +data.numberOfPoints(),
    debugDescription: data.debugDescription() + '',
    isClosed: !!data.isClosed(),
    points: convertArray(data.points()),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSRectangleShapeIface(data) {
  // log('converting MSRectangleShape')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSRectangleShape",
    cornerRadiusString: data.cornerRadiusString() + '',
    cornerRadiusFloat: +data.cornerRadiusFloat(),
    normalizedExponentialCornerRadius: +data.normalizedExponentialCornerRadius(),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    booleanOperation: +data.booleanOperation(),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    edited: !!data.edited(),
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    fixedRadius: +data.fixedRadius(),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasConvertedToNewRoundCorners: !!data.hasConvertedToNewRoundCorners(),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    pathGeneric: convMSShapePathIface(data.pathGeneric()),
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),

    // inherited
    isEditing: !!data.isEditing(),
    isClosed: !!data.isClosed(),
    bezierPath: convNSBezierPathIface(data.bezierPath()),
    path: convMSShapePathIface(data.path()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSShapePathLayerIface(data) {
  // log('converting MSShapePathLayer')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSShapePathLayer",
    isEditing: !!data.isEditing(),
    isClosed: !!data.isClosed(),
    bezierPath: convNSBezierPathIface(data.bezierPath()),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    booleanOperation: +data.booleanOperation(),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    edited: !!data.edited(),
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    pathGeneric: convMSShapePathIface(data.pathGeneric()),
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),

    // inherited
    path: convMSShapePathIface(data.path()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSCurvePointIface(data) {
  // log('converting MSCurvePoint')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSCurvePoint",
    description: data.description() + '',
    cornerRadius: +data.cornerRadius(),
    curveFrom: convCGPointStruct(data.curveFrom()),
    curveMode: +data.curveMode(),
    curveTo: convCGPointStruct(data.curveTo()),
    debugDescription: data.debugDescription() + '',
    hasCurveFrom: !!data.hasCurveFrom(),
    hasCurveTo: !!data.hasCurveTo(),
    point: convCGPointStruct(data.point()),

    // inherited
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSLayerGroupIface(data) {
  // log('converting MSLayerGroup')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSLayerGroup",
    preCalculatedHasSelectedLayer: +data.preCalculatedHasSelectedLayer(),
    lightweightContainsSelectedItem: !!data.lightweightContainsSelectedItem(),
    isOpen: !!data.isOpen(),
    hasLayerWithMaskMode: +data.hasLayerWithMaskMode(),
    enableAutomaticScaling: !!data.enableAutomaticScaling(),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasClickThrough: !!data.hasClickThrough(),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    layers: convertArray(data.layers()),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    sharedObjectID: null/* NSObject<NSCopying><NSCoding> */,
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),

    // inherited
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSSymbolInstanceIface(data) {
  // log('converting MSSymbolInstance')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSSymbolInstance",
    masterRefreshCounter: +data.masterRefreshCounter(),
    symbolMasterEdgePaddings: convBCEdgePaddingsStruct(data.symbolMasterEdgePaddings()),

    // inherited
    verticalSpacing: +data.verticalSpacing(),
    symbolID: data.symbolID() + '',
    overrides: convertDictionary(data.overrides()),
    masterInfluenceEdgeMinYPadding: +data.masterInfluenceEdgeMinYPadding(),
    masterInfluenceEdgeMinXPadding: +data.masterInfluenceEdgeMinXPadding(),
    masterInfluenceEdgeMaxYPadding: +data.masterInfluenceEdgeMaxYPadding(),
    masterInfluenceEdgeMaxXPadding: +data.masterInfluenceEdgeMaxXPadding(),
    horizontalSpacing: +data.horizontalSpacing(),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    hasTransforms: !!data.hasTransforms(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isLocked: !!data.isLocked(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    rotation: +data.rotation(),
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

function convMSSymbolMasterIface(data) {
  // log('converting MSSymbolMaster')
  if (data.description && seen[data.description]) return data.description
  if (!data) return null
  seen[data.description] = {
    $type: "MSSymbolMaster",
    

    // inherited
    symbolID: data.symbolID() + '',
    includeBackgroundColorInInstance: !!data.includeBackgroundColorInInstance(),
    sliceWatcher: null/* MSSliceLayerWatcher */,
    contentBounds: convCGRectStruct(data.contentBounds()),
    rulerBase: convCGPointStruct(data.rulerBase()),
    isLocked: !!data.isLocked(),
    rotation: +data.rotation(),
    hasClickThrough: !!data.hasClickThrough(),
    CGTransformForFrame: convCGAffineTransformStruct(data.CGTransformForFrame()),
    backgroundColorGeneric: convMSColorIface(data.backgroundColorGeneric()),
    bounds: convCGRectStruct(data.bounds()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportOptionsGeneric: convMSExportOptionsIface(data.exportOptionsGeneric()),
    frameGeneric: convMSRectIface(data.frameGeneric()),
    grid: convMSSimpleGridIface(data.grid()),
    gridGeneric: convMSSimpleGridIface(data.gridGeneric()),
    hasBackgroundColor: !!data.hasBackgroundColor(),
    hasTransforms: !!data.hasTransforms(),
    horizontalRulerData: convMSRulerDataIface(data.horizontalRulerData()),
    horizontalRulerDataGeneric: convMSRulerDataIface(data.horizontalRulerDataGeneric()),
    includeBackgroundColorInExport: !!data.includeBackgroundColorInExport(),
    includeInCloudUpload: !!data.includeInCloudUpload(),
    isFlippedHorizontal: !!data.isFlippedHorizontal(),
    isFlippedVertical: !!data.isFlippedVertical(),
    isLayerExportable: !!data.isLayerExportable(),
    isSelected: !!data.isSelected(),
    isVisible: !!data.isVisible(),
    layerListExpandedType: +data.layerListExpandedType(),
    layers: convertArray(data.layers()),
    layout: convMSLayoutGridIface(data.layout()),
    layoutGeneric: convMSLayoutGridIface(data.layoutGeneric()),
    name: data.name() + '',
    nameIsFixed: !!data.nameIsFixed(),
    origin: convCGPointStruct(data.origin()),
    originalObjectID: data.originalObjectID() + '',
    rect: convCGRectStruct(data.rect()),
    resizingType: +data.resizingType(),
    sharedObjectID: null/* NSObject<NSCopying><NSCoding> */,
    shouldBreakMaskChain: !!data.shouldBreakMaskChain(),
    styleGeneric: convMSStyleIface(data.styleGeneric()),
    verticalRulerData: convMSRulerDataIface(data.verticalRulerData()),
    verticalRulerDataGeneric: convMSRulerDataIface(data.verticalRulerDataGeneric()),
    backgroundColor: convMSColorIface(data.backgroundColor()),
    preCalculatedHasSelectedLayer: +data.preCalculatedHasSelectedLayer(),
    lightweightContainsSelectedItem: !!data.lightweightContainsSelectedItem(),
    isOpen: !!data.isOpen(),
    hasLayerWithMaskMode: +data.hasLayerWithMaskMode(),
    enableAutomaticScaling: !!data.enableAutomaticScaling(),
    style: convMSStyleIface(data.style()),
    absoluteRect: convMSAbsoluteRectIface(data.absoluteRect()),
    isHovering: !!data.isHovering(),
    center: convCGPointStruct(data.center()),
    transformStruct: conv_CHTransformStructStruct(data.transformStruct()),
    absolutePosition: convCGPointStruct(data.absolutePosition()),
    isExpanded: !!data.isExpanded(),
    proportions: +data.proportions(),
    constrainProportions: !!data.constrainProportions(),
    styledLayer: convMSStyledLayerIface(data.styledLayer()),
    userVisibleRotation: +data.userVisibleRotation(),
    isExportableViaDragAndDrop: !!data.isExportableViaDragAndDrop(),
    hasSliceIcon: !!data.hasSliceIcon(),
    selectedInLayerList: !!data.selectedInLayerList(),
    expandableInLayerList: !!data.expandableInLayerList(),
    nodeName: data.nodeName() + '',
    selectedBadgeMenuItem: +data.selectedBadgeMenuItem(),
    badgeMenu: convNSMenuIface(data.badgeMenu()),
    previewImages: convertDictionary(data.previewImages()),
    badgeMap: convertDictionary(data.badgeMap()),
    hasHighlight: !!data.hasHighlight(),
    isActive: !!data.isActive(),
    filterType: +data.filterType(),
    displayType: +data.displayType(),
    frame: convMSRectIface(data.frame()),
    exportOptions: convMSExportOptionsIface(data.exportOptions()),
    documentData: convMSDocumentDataIface(data.documentData()),
    isFault: !!data.isFault(),
    hasModelObjectCacheGeneration: !!data.hasModelObjectCacheGeneration(),
  }
  return data.description
}

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
