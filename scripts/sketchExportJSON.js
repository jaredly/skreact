

function convertGeneric(data) {
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
  } else if (data instanceof MSRect) {
    return convMSRectIface(data)
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
  } else if (data instanceof MSTextLayer) {
    return convMSTextLayerIface(data)
  } else if (data instanceof NSAttributedString) {
    return convNSAttributedStringIface(data)
  } else if (data instanceof MSAttributedString) {
    return convMSAttributedStringIface(data)
  } else if (data instanceof NSSet) {
    return convNSSetIface(data)
  } else if (data instanceof MSOvalShape) {
    return convMSOvalShapeIface(data)
  } else if (data instanceof MSShapePath) {
    return convMSShapePathIface(data)
  } else if (data instanceof MSRectangleShape) {
    return convMSRectangleShapeIface(data)
  } else if (data instanceof MSShapePathLayer) {
    return convMSShapePathLayerIface(data)
  } else if (data instanceof MSLayer) {
    return convMSLayerIface(data)
  } else if (data instanceof MSAbsoluteRect) {
    return convMSAbsoluteRectIface(data)
  } else if (data instanceof MSStyledLayer) {
    return convMSStyledLayerIface(data)
  } else if (data instanceof NSMenu) {
    return convNSMenuIface(data)
  } else if (data instanceof MSCurvePoint) {
    return convMSCurvePointIface(data)
  } else if (data instanceof MSLayerGroup) {
    return convMSLayerGroupIface(data)
  } else if (data instanceof MSPage) {
    return convMSPageIface(data)
  } else if (data instanceof MSArtboardGroup) {
    return convMSArtboardGroupIface(data)
  } else if (data instanceof MSSimpleGrid) {
    return convMSSimpleGridIface(data)
  } else if (data instanceof MSRulerData) {
    return convMSRulerDataIface(data)
  } else if (data instanceof MSLayoutGrid) {
    return convMSLayoutGridIface(data)
  } else if (data instanceof NSColor) {
    return convNSColorIface(data)
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
  if (!data) return null
  return {
    $type: "CGRect",
    origin: convCGPointStruct(data.origin),
    size: convCGSizeStruct(data.size),
  }
}

function convCGPointStruct(data) {
  // log('converting CGPoint')
  if (!data) return null
  return {
    $type: "CGPoint",
    x: +data.x,
    y: +data.y,
  }
}

function convCGSizeStruct(data) {
  // log('converting CGSize')
  if (!data) return null
  return {
    $type: "CGSize",
    width: +data.width,
    height: +data.height,
  }
}

function convCGAffineTransformStruct(data) {
  // log('converting CGAffineTransform')
  if (!data) return null
  return {
    $type: "CGAffineTransform",
    a: +data.a,
    b: +data.b,
    c: +data.c,
    d: +data.d,
    tx: +data.tx,
    ty: +data.ty,
  }
}

function conv_CHTransformStructStruct(data) {
  // log('converting _CHTransformStruct')
  if (!data) return null
  return {
    $type: "_CHTransformStruct",
    _field1: +data._field1,
    _field2: data._field2,
    _field3: data._field3,
    _field4: data._field4,
  }
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
  if (!data) return null
  return {
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
  }
}

function convNSBezierPathIface(data) {
  // log('converting NSBezierPath')
  if (!data) return null
  return {
    $type: "NSBezierPath",

  }
}

function convMSPathIface(data) {
  // log('converting MSPath')
  if (!data) return null
  return {
    $type: "MSPath",
    signedElementCount: +data.signedElementCount(),
    CGPath: null/* CGPath */,
    elementCount: +data.elementCount(),
    isEmpty: !!data.isEmpty(),
    controlPointBounds: convCGRectStruct(data.controlPointBounds()),
    bounds: convCGRectStruct(data.bounds()),
    safeBounds: convCGRectStruct(data.safeBounds()),
  }
}

function convMSExportOptionsIface(data) {
  // log('converting MSExportOptions')
  if (!data) return null
  return {
    $type: "MSExportOptions",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    exportFormats: convertArray(data.exportFormats()),
    includedLayerIds: convertArray(data.includedLayerIds()),
    layerOptions: +data.layerOptions(),
    shouldTrim: !!data.shouldTrim(),
  }
}

function convMSRectIface(data) {
  // log('converting MSRect')
  if (!data) return null
  return {
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
  }
}

function convMSStyleIface(data) {
  // log('converting MSStyle')
  if (!data) return null
  return {
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
  }
}

function convMSTextStyleIface(data) {
  // log('converting MSTextStyle')
  if (!data) return null
  return {
    $type: "MSTextStyle",
    decodedAttributes: convertDictionary(data.decodedAttributes()),
    attributes: convertDictionary(data.attributes()),
    isRequiredFontAvailable: !!data.isRequiredFontAvailable(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    encodedAttributes: convertDictionary(data.encodedAttributes()),
  }
}

function convMSStyleShadowIface(data) {
  // log('converting MSStyleShadow')
  if (!data) return null
  return {
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
  }
}

function convMSColorIface(data) {
  // log('converting MSColor')
  if (!data) return null
  return {
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
  }
}

function convMSGraphicsContextSettingsIface(data) {
  // log('converting MSGraphicsContextSettings')
  if (!data) return null
  return {
    $type: "MSGraphicsContextSettings",
    description: data.description() + '',
    blendMode: +data.blendMode(),
    debugDescription: data.debugDescription() + '',
    opacity: +data.opacity(),
  }
}

function convMSStyleBorderIface(data) {
  // log('converting MSStyleBorder')
  if (!data) return null
  return {
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
  }
}

function convMSGradientIface(data) {
  // log('converting MSGradient')
  if (!data) return null
  return {
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
  }
}

function convMSStyleFillIface(data) {
  // log('converting MSStyleFill')
  if (!data) return null
  return {
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
  }
}

function convMSImageDataIface(data) {
  // log('converting MSImageData')
  if (!data) return null
  return {
    $type: "MSImageData",
    image: convNSImageIface(data.image()),
    sha1: convNSDataIface(data.sha1()),
    data: convNSDataIface(data.data()),
  }
}

function convNSImageIface(data) {
  // log('converting NSImage')
  if (!data) return null
  return {
    $type: "NSImage",

  }
}

function convNSDataIface(data) {
  // log('converting NSData')
  if (!data) return null
  return {
    $type: "NSData",

  }
}

function convMSStyleBlurIface(data) {
  // log('converting MSStyleBlur')
  if (!data) return null
  return {
    $type: "MSStyleBlur",
    center: convCGPointStruct(data.center()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    isEnabled: !!data.isEnabled(),
    motionAngle: +data.motionAngle(),
    radius: +data.radius(),
    type: +data.type(),
  }
}

function convMSStyleBorderOptionsIface(data) {
  // log('converting MSStyleBorderOptions')
  if (!data) return null
  return {
    $type: "MSStyleBorderOptions",
    hasDashPattern: !!data.hasDashPattern(),
    dashPattern: convertArray(data.dashPattern()),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    isEnabled: !!data.isEnabled(),
    lineCapStyle: +data.lineCapStyle(),
    lineJoinStyle: +data.lineJoinStyle(),
  }
}

function convMSStyleColorControlsIface(data) {
  // log('converting MSStyleColorControls')
  if (!data) return null
  return {
    $type: "MSStyleColorControls",
    brightness: +data.brightness(),
    contrast: +data.contrast(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    hue: +data.hue(),
    isEnabled: !!data.isEnabled(),
    saturation: +data.saturation(),
  }
}

function convMSStyleReflectionIface(data) {
  // log('converting MSStyleReflection')
  if (!data) return null
  return {
    $type: "MSStyleReflection",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    distance: +data.distance(),
    isEnabled: !!data.isEnabled(),
    strength: +data.strength(),
  }
}

function convMSTextLayerIface(data) {
  // log('converting MSTextLayer')
  if (!data) return null
  return {
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
  }
}

function convNSAttributedStringIface(data) {
  // log('converting NSAttributedString')
  if (!data) return null
  return {
    $type: "NSAttributedString",

  }
}

function convMSAttributedStringIface(data) {
  // log('converting MSAttributedString')
  if (!data) return null
  return {
    $type: "MSAttributedString",
    transformedAttributedString: convNSAttributedStringIface(data.transformedAttributedString()),
    encodedAttributedString: convNSAttributedStringIface(data.encodedAttributedString()),
    attributedString: convNSAttributedStringIface(data.attributedString()),
    areRequiredFontsAvailable: !!data.areRequiredFontsAvailable(),
    unavailableFontNames: convNSSetIface(data.unavailableFontNames()),
    fontNames: convNSSetIface(data.fontNames()),
    string: data.string() + '',
  }
}

function convNSSetIface(data) {
  // log('converting NSSet')
  if (!data) return null
  return {
    $type: "NSSet",

  }
}

function convMSOvalShapeIface(data) {
  // log('converting MSOvalShape')
  if (!data) return null
  return {
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
  }
}

function convMSShapePathIface(data) {
  // log('converting MSShapePath')
  if (!data) return null
  return {
    $type: "MSShapePath",
    description: data.description() + '',
    numberOfPoints: +data.numberOfPoints(),
    debugDescription: data.debugDescription() + '',
    isClosed: !!data.isClosed(),
    points: convertArray(data.points()),
  }
}

function convMSRectangleShapeIface(data) {
  // log('converting MSRectangleShape')
  if (!data) return null
  return {
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
  }
}

function convMSShapePathLayerIface(data) {
  // log('converting MSShapePathLayer')
  if (!data) return null
  return {
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
  }
}

function convMSLayerIface(data) {
  // log('converting MSLayer')
  if (!data) return null
  return {
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
  }
}

function convMSAbsoluteRectIface(data) {
  // log('converting MSAbsoluteRect')
  if (!data) return null
  return {
    $type: "MSAbsoluteRect",
    layer: convMSLayerIface(data.layer()),
    rulerOrigin: convCGPointStruct(data.rulerOrigin()),
    rulerY: +data.rulerY(),
    rulerX: +data.rulerX(),
  }
}

function convMSStyledLayerIface(data) {
  // log('converting MSStyledLayer')
  if (!data) return null
  return {
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
  }
}

function convNSMenuIface(data) {
  // log('converting NSMenu')
  if (!data) return null
  return {
    $type: "NSMenu",

  }
}

function convMSCurvePointIface(data) {
  // log('converting MSCurvePoint')
  if (!data) return null
  return {
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
  }
}

function convMSLayerGroupIface(data) {
  // log('converting MSLayerGroup')
  if (!data) return null
  return {
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
  }
}

function convMSPageIface(data) {
  // log('converting MSPage')
  if (!data) return null
  return {
    $type: "MSPage",
    cachedExportableLayers: convertArray(data.cachedExportableLayers()),
    cachedArtboards: convertArray(data.cachedArtboards()),
    currentArtboard: convMSArtboardGroupIface(data.currentArtboard()),
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
    layers: convertArray(data.layers()),
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
  }
}

function convMSArtboardGroupIface(data) {
  // log('converting MSArtboardGroup')
  if (!data) return null
  return {
    $type: "MSArtboardGroup",
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
  }
}

function convMSSimpleGridIface(data) {
  // log('converting MSSimpleGrid')
  if (!data) return null
  return {
    $type: "MSSimpleGrid",
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    gridSize: +data.gridSize(),
    isEnabled: !!data.isEnabled(),
    thickGridTimes: +data.thickGridTimes(),
  }
}

function convMSRulerDataIface(data) {
  // log('converting MSRulerData')
  if (!data) return null
  return {
    $type: "MSRulerData",
    base: +data.base(),
    debugDescription: data.debugDescription() + '',
    description: data.description() + '',
    guides: convertArray(data.guides()),
  }
}

function convMSLayoutGridIface(data) {
  // log('converting MSLayoutGrid')
  if (!data) return null
  return {
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
  }
}

function convNSColorIface(data) {
  // log('converting NSColor')
  if (!data) return null
  return {
    $type: "NSColor",

  }
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

var d = context.api().selectedDocument.pages.map(function(k){return convertGeneric(k.sketchObject)})
var dump = JSON.stringify(d)
writeFile(dest, dump)
log('dumped!')
