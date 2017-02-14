


var natives = []
var converteds = []

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
  if (data instanceof NSFont) {
    return convNSFontIface(data)
  } else if (data instanceof MSDocument) {
    return convMSDocumentIface(data)
  } else if (data instanceof MSContentDrawViewController) {
    return convMSContentDrawViewControllerIface(data)
  } else if (data instanceof NSView) {
    return convNSViewIface(data)
  } else if (data instanceof MSRulerView) {
    return convMSRulerViewIface(data)
  } else if (data instanceof MSRulerViewLayer) {
    return convMSRulerViewLayerIface(data)
  } else if (data instanceof NSColor) {
    return convNSColorIface(data)
  } else if (data instanceof MSContentDrawView) {
    return convMSContentDrawViewIface(data)
  } else if (data instanceof MSViewPort) {
    return convMSViewPortIface(data)
  } else if (data instanceof MSTiledLayerPile) {
    return convMSTiledLayerPileIface(data)
  } else if (data instanceof MSImmutablePage) {
    return convMSImmutablePageIface(data)
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
  } else if (data instanceof MSArtboardGroup) {
    return convMSArtboardGroupIface(data)
  } else if (data instanceof MSColor) {
    return convMSColorIface(data)
  } else if (data instanceof MSRect) {
    return convMSRectIface(data)
  } else if (data instanceof MSSimpleGrid) {
    return convMSSimpleGridIface(data)
  } else if (data instanceof MSRulerData) {
    return convMSRulerDataIface(data)
  } else if (data instanceof MSLayoutGrid) {
    return convMSLayoutGridIface(data)
  } else if (data instanceof MSStyle) {
    return convMSStyleIface(data)
  } else if (data instanceof MSTextStyle) {
    return convMSTextStyleIface(data)
  } else if (data instanceof MSStyleShadow) {
    return convMSStyleShadowIface(data)
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
  } else if (data instanceof MSImmutableSimpleGrid) {
    return convMSImmutableSimpleGridIface(data)
  } else if (data instanceof MSImmutableRulerData) {
    return convMSImmutableRulerDataIface(data)
  } else if (data instanceof MSImmutableLayoutGrid) {
    return convMSImmutableLayoutGridIface(data)
  } else if (data instanceof MSImmutableStyle) {
    return convMSImmutableStyleIface(data)
  } else if (data instanceof MSImmutableStyleFill) {
    return convMSImmutableStyleFillIface(data)
  } else if (data instanceof MSImmutableGradient) {
    return convMSImmutableGradientIface(data)
  } else if (data instanceof MSImmutableGraphicsContextSettings) {
    return convMSImmutableGraphicsContextSettingsIface(data)
  } else if (data instanceof MSImmutableColor) {
    return convMSImmutableColorIface(data)
  } else if (data instanceof MSImmutableStyleBorder) {
    return convMSImmutableStyleBorderIface(data)
  } else if (data instanceof MSImmutableStyleInnerShadow) {
    return convMSImmutableStyleInnerShadowIface(data)
  } else if (data instanceof MSImmutableStyleShadow) {
    return convMSImmutableStyleShadowIface(data)
  } else if (data instanceof MSImmutableTextStyle) {
    return convMSImmutableTextStyleIface(data)
  } else if (data instanceof MSImmutableStyleReflection) {
    return convMSImmutableStyleReflectionIface(data)
  } else if (data instanceof MSImmutableStyleColorControls) {
    return convMSImmutableStyleColorControlsIface(data)
  } else if (data instanceof MSImmutableStyleBorderOptions) {
    return convMSImmutableStyleBorderOptionsIface(data)
  } else if (data instanceof MSImmutableStyleBlur) {
    return convMSImmutableStyleBlurIface(data)
  } else if (data instanceof NSAffineTransform) {
    return convNSAffineTransformIface(data)
  } else if (data instanceof MSImmutableRect) {
    return convMSImmutableRectIface(data)
  } else if (data instanceof MSImmutableExportOptions) {
    return convMSImmutableExportOptionsIface(data)
  } else if (data instanceof MSImmutableDocumentData) {
    return convMSImmutableDocumentDataIface(data)
  } else if (data instanceof MSImmutableSharedTextStyleContainer) {
    return convMSImmutableSharedTextStyleContainerIface(data)
  } else if (data instanceof MSImmutableSymbolContainer) {
    return convMSImmutableSymbolContainerIface(data)
  } else if (data instanceof MSImmutableSharedStyleContainer) {
    return convMSImmutableSharedStyleContainerIface(data)
  } else if (data instanceof MSImmutableAssetCollection) {
    return convMSImmutableAssetCollectionIface(data)
  } else if (data instanceof MSImmutableImageCollection) {
    return convMSImmutableImageCollectionIface(data)
  } else if (data instanceof NSMutableArray) {
    return convNSMutableArrayIface(data)
  } else if (data instanceof MSCacheManager) {
    return convMSCacheManagerIface(data)
  } else if (data instanceof MSEventHandlerManager) {
    return convMSEventHandlerManagerIface(data)
  } else if (data instanceof MSEventHandler) {
    return convMSEventHandlerIface(data)
  } else if (data instanceof MSMouseTracker) {
    return convMSMouseTrackerIface(data)
  } else if (data instanceof MSDuplicateOffsetTracker) {
    return convMSDuplicateOffsetTrackerIface(data)
  } else if (data instanceof MSNormalEventHandler) {
    return convMSNormalEventHandlerIface(data)
  } else if (data instanceof MSDragToMoveOrCopyGestureRecognizer) {
    return convMSDragToMoveOrCopyGestureRecognizerIface(data)
  } else if (data instanceof MSDragToSelectGestureRecognizer) {
    return convMSDragToSelectGestureRecognizerIface(data)
  } else if (data instanceof MSOpacityKeyboardShortcutRecognizer) {
    return convMSOpacityKeyboardShortcutRecognizerIface(data)
  } else if (data instanceof MSNormalEventData) {
    return convMSNormalEventDataIface(data)
  } else if (data instanceof MSSnapperData) {
    return convMSSnapperDataIface(data)
  } else if (data instanceof NSMutableDictionary) {
    return convNSMutableDictionaryIface(data)
  } else if (data instanceof MSNormalEventContextualMenuBuilder) {
    return convMSNormalEventContextualMenuBuilderIface(data)
  } else if (data instanceof MSLayerArray) {
    return convMSLayerArrayIface(data)
  } else if (data instanceof MSBackButtonWindowController) {
    return convMSBackButtonWindowControllerIface(data)
  } else if (data instanceof NSTimer) {
    return convNSTimerIface(data)
  } else if (data instanceof NSMutableSet) {
    return convNSMutableSetIface(data)
  } else if (data instanceof BCSideBarViewController) {
    return convBCSideBarViewControllerIface(data)
  } else if (data instanceof BCOutlineViewController) {
    return convBCOutlineViewControllerIface(data)
  } else if (data instanceof NSTextField) {
    return convNSTextFieldIface(data)
  } else if (data instanceof NSEvent) {
    return convNSEventIface(data)
  } else if (data instanceof BCOutlineViewDataController) {
    return convBCOutlineViewDataControllerIface(data)
  } else if (data instanceof BCFilterInfo) {
    return convBCFilterInfoIface(data)
  } else if (data instanceof BCOutlineView) {
    return convBCOutlineViewIface(data)
  } else if (data instanceof BCTableCellView) {
    return convBCTableCellViewIface(data)
  } else if (data instanceof BCCollapsableImageView) {
    return convBCCollapsableImageViewIface(data)
  } else if (data instanceof NSWindow) {
    return convNSWindowIface(data)
  } else if (data instanceof BCPageListViewController) {
    return convBCPageListViewControllerIface(data)
  } else if (data instanceof MSFontList) {
    return convMSFontListIface(data)
  } else if (data instanceof MSInspectorController) {
    return convMSInspectorControllerIface(data)
  } else if (data instanceof MSExportInspectorViewController) {
    return convMSExportInspectorViewControllerIface(data)
  } else if (data instanceof MSShareButtonHandler) {
    return convMSShareButtonHandlerIface(data)
  } else if (data instanceof BCPopover) {
    return convBCPopoverIface(data)
  } else if (data instanceof BCPopoverWindow) {
    return convBCPopoverWindowIface(data)
  } else if (data instanceof NSViewController) {
    return convNSViewControllerIface(data)
  } else if (data instanceof MSColorPreviewButton) {
    return convMSColorPreviewButtonIface(data)
  } else if (data instanceof MSStyleBasicFill) {
    return convMSStyleBasicFillIface(data)
  } else if (data instanceof MSArtboardInspectorViewController) {
    return convMSArtboardInspectorViewControllerIface(data)
  } else if (data instanceof MSFlippedView) {
    return convMSFlippedViewIface(data)
  } else if (data instanceof MSInspectorStackView) {
    return convMSInspectorStackViewIface(data)
  } else if (data instanceof MSSliceInspectorViewController) {
    return convMSSliceInspectorViewControllerIface(data)
  } else if (data instanceof MSNormalInspector) {
    return convMSNormalInspectorIface(data)
  } else if (data instanceof MSPersistentAssetCollection) {
    return convMSPersistentAssetCollectionIface(data)
  } else if (data instanceof MSVersionedArchive) {
    return convMSVersionedArchiveIface(data)
  } else if (data instanceof NSURL) {
    return convNSURLIface(data)
  } else if (data instanceof MSHistoryMaker) {
    return convMSHistoryMakerIface(data)
  } else if (data instanceof MSHistory) {
    return convMSHistoryIface(data)
  } else if (data instanceof MSMoment) {
    return convMSMomentIface(data)
  } else if (data instanceof MSActionController) {
    return convMSActionControllerIface(data)
  } else if (data instanceof MSToolbarConstructor) {
    return convMSToolbarConstructorIface(data)
  } else if (data instanceof MSMainSplitViewController) {
    return convMSMainSplitViewControllerIface(data)
  } else if (data instanceof MSShapeGroup) {
    return convMSShapeGroupIface(data)
  } else if (data instanceof NSBezierPath) {
    return convNSBezierPathIface(data)
  } else if (data instanceof MSPath) {
    return convMSPathIface(data)
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
  } else if (data instanceof MSImmutableSymbolMaster) {
    return convMSImmutableSymbolMasterIface(data)
  } else if (data instanceof MSImmutableSharedStyle) {
    return convMSImmutableSharedStyleIface(data)
  } else if (data instanceof MSModelObjectCommon) {
    return convMSModelObjectCommonIface(data)
  } else if (data instanceof MSImmutableModelObject) {
    return convMSImmutableModelObjectIface(data)
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

function convMSDocumentIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSDocument')
  if (!data) return null
  converteds[idx] = {
    $type: "MSDocument",
    nextReadFromURLIsReload: data.nextReadFromURLIsReload ? !!data.nextReadFromURLIsReload() : null,
    currentContentViewController: data.currentContentViewController ? convMSContentDrawViewControllerIface(data.currentContentViewController()) : null,
    hasOpenedImageFile: data.hasOpenedImageFile ? !!data.hasOpenedImageFile() : null,
    selectedLayers: data.selectedLayers ? convMSLayerArrayIface(data.selectedLayers()) : null,
    hasScheduledDocumentDidChange: data.hasScheduledDocumentDidChange ? !!data.hasScheduledDocumentDidChange() : null,
    originalViewportsForEditedSymbols: data.originalViewportsForEditedSymbols ? convNSMutableDictionaryIface(data.originalViewportsForEditedSymbols()) : null,
    backButtonController: data.backButtonController ? convMSBackButtonWindowControllerIface(data.backButtonController()) : null,
    mutableUIMetadata: data.mutableUIMetadata ? convNSMutableDictionaryIface(data.mutableUIMetadata()) : null,
    cacheFlushInProgress: data.cacheFlushInProgress ? !!data.cacheFlushInProgress() : null,
    mostRecentCacheFlushingTime: data.mostRecentCacheFlushingTime ? +data.mostRecentCacheFlushingTime() : null,
    resetHiddenSelectionHandlesTimer: data.resetHiddenSelectionHandlesTimer ? convNSTimerIface(data.resetHiddenSelectionHandlesTimer()) : null,
    layersWithHiddenSelectionHandles: data.layersWithHiddenSelectionHandles ? convNSMutableSetIface(data.layersWithHiddenSelectionHandles()) : null,
    temporarilyDisableSelectionHiding: data.temporarilyDisableSelectionHiding ? !!data.temporarilyDisableSelectionHiding() : null,
    layerListRefreshIsScheduled: data.layerListRefreshIsScheduled ? !!data.layerListRefreshIsScheduled() : null,
    documentDataUsedForLayerList: data.documentDataUsedForLayerList ? convMSImmutableDocumentDataIface(data.documentDataUsedForLayerList()) : null,
    sidebarController: data.sidebarController ? convBCSideBarViewControllerIface(data.sidebarController()) : null,
    fontList: data.fontList ? convMSFontListIface(data.fontList()) : null,
    inspectorController: data.inspectorController ? convMSInspectorControllerIface(data.inspectorController()) : null,
    historyMaker: data.historyMaker ? convMSHistoryMakerIface(data.historyMaker()) : null,
    cacheManager: data.cacheManager ? convMSCacheManagerIface(data.cacheManager()) : null,
    eventHandlerManager: data.eventHandlerManager ? convMSEventHandlerManagerIface(data.eventHandlerManager()) : null,
    documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    actionsController: data.actionsController ? convMSActionControllerIface(data.actionsController()) : null,
    toolbarConstructor: data.toolbarConstructor ? convMSToolbarConstructorIface(data.toolbarConstructor()) : null,
    canvasPlaceholderView: data.canvasPlaceholderView ? convNSViewIface(data.canvasPlaceholderView()) : null,
    inspectorPlaceholderView: data.inspectorPlaceholderView ? convNSViewIface(data.inspectorPlaceholderView()) : null,
    splitViewController: data.splitViewController ? convMSMainSplitViewControllerIface(data.splitViewController()) : null,
    messageView: data.messageView ? convNSViewIface(data.messageView()) : null,
    documentWindow: data.documentWindow ? convNSWindowIface(data.documentWindow()) : null,
    pageListHeight: data.pageListHeight ? +data.pageListHeight() : null,
    publisherFileName: data.publisherFileName ? data.publisherFileName() + '' : null,
    UIMetadata: data.UIMetadata ? convertDictionary(data.UIMetadata()) : null,
    exportableLayerSelection: data.exportableLayerSelection ? convertArray(data.exportableLayerSelection()) : null,
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    immutableDocumentData: data.immutableDocumentData ? convMSImmutableDocumentDataIface(data.immutableDocumentData()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSContentDrawViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSContentDrawViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSContentDrawViewController",
    rulerHeightConstraint: data.rulerHeightConstraint ? null/* NSLayoutConstraint */ : null,
    rulerWidthConstraint: data.rulerWidthConstraint ? null/* NSLayoutConstraint */ : null,
    document: data.document ? convMSDocumentIface(data.document()) : null,
    rulerCornerView: data.rulerCornerView ? convNSViewIface(data.rulerCornerView()) : null,
    verticalRuler: data.verticalRuler ? convMSRulerViewIface(data.verticalRuler()) : null,
    horizontalRuler: data.horizontalRuler ? convMSRulerViewIface(data.horizontalRuler()) : null,
    contentDrawView: data.contentDrawView ? convMSContentDrawViewIface(data.contentDrawView()) : null,
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSView')
  if (!data) return null
  converteds[idx] = {
    $type: "NSView",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSRulerViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSRulerView')
  if (!data) return null
  converteds[idx] = {
    $type: "MSRulerView",
    rulerViewLayer: data.rulerViewLayer ? convMSRulerViewLayerIface(data.rulerViewLayer()) : null,
    temporaryRulerGuide: data.temporaryRulerGuide ? +data.temporaryRulerGuide() : null,
    axis: data.axis ? +data.axis() : null,
    mouseDownPoint: data.mouseDownPoint ? convCGPointStruct(data.mouseDownPoint()) : null,
    mouseDidDrag: data.mouseDidDrag ? !!data.mouseDidDrag() : null,
    contentView: data.contentView ? convMSContentDrawViewIface(data.contentView()) : null,
    document: data.document ? convMSDocumentIface(data.document()) : null,
    rulerData: data.rulerData ? convMSRulerDataIface(data.rulerData()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSRulerViewLayerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSRulerViewLayer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSRulerViewLayer",
    lineColor: data.lineColor ? convNSColorIface(data.lineColor()) : null,
    shouldDrawGuides: data.shouldDrawGuides ? !!data.shouldDrawGuides() : null,
    guides: data.guides ? convertArray(data.guides()) : null,
    occupiedRegion: data.occupiedRegion ? convCGRectStruct(data.occupiedRegion()) : null,
    baseLine: data.baseLine ? +data.baseLine() : null,
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    snapColor: data.snapColor ? convNSColorIface(data.snapColor()) : null,
    formatter: data.formatter ? null/* NSNumberFormatter */ : null,
    axis: data.axis ? +data.axis() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSColorIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSColor')
  if (!data) return null
  converteds[idx] = {
    $type: "NSColor",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSContentDrawViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSContentDrawView')
  if (!data) return null
  converteds[idx] = {
    $type: "MSContentDrawView",
    measurementLabelNumberFormatter: data.measurementLabelNumberFormatter ? null/* NSNumberFormatter */ : null,
    isMagnifying: data.isMagnifying ? !!data.isMagnifying() : null,
    ignoreScheduledRedrawRequests: data.ignoreScheduledRedrawRequests ? !!data.ignoreScheduledRedrawRequests() : null,
    haveStoredMostRecentFullScaleScrollOrigin: data.haveStoredMostRecentFullScaleScrollOrigin ? !!data.haveStoredMostRecentFullScaleScrollOrigin() : null,
    mostRecentFullScaleScrollOrigin: data.mostRecentFullScaleScrollOrigin ? convCGPointStruct(data.mostRecentFullScaleScrollOrigin()) : null,
    scalingCenterInViewCoordinates: data.scalingCenterInViewCoordinates ? convCGPointStruct(data.scalingCenterInViewCoordinates()) : null,
    viewPortBeforeZoomOut: data.viewPortBeforeZoomOut ? convMSViewPortIface(data.viewPortBeforeZoomOut()) : null,
    overlayRectNeedingRedraw: data.overlayRectNeedingRedraw ? convCGRectStruct(data.overlayRectNeedingRedraw()) : null,
    scrollOriginRelativeContentRedrawRect: data.scrollOriginRelativeContentRedrawRect ? convCGRectStruct(data.scrollOriginRelativeContentRedrawRect()) : null,
    tiledLayerPile: data.tiledLayerPile ? convMSTiledLayerPileIface(data.tiledLayerPile()) : null,
    previouslyRenderedPage: data.previouslyRenderedPage ? convMSImmutablePageIface(data.previouslyRenderedPage()) : null,
    cacheManager: data.cacheManager ? convMSCacheManagerIface(data.cacheManager()) : null,
    shouldHideOverlayControls: data.shouldHideOverlayControls ? !!data.shouldHideOverlayControls() : null,
    document: data.document ? convMSDocumentIface(data.document()) : null,
    verticalRuler: data.verticalRuler ? convMSRulerViewIface(data.verticalRuler()) : null,
    horizontalRuler: data.horizontalRuler ? convMSRulerViewIface(data.horizontalRuler()) : null,
    eventHandlerManager: data.eventHandlerManager ? convMSEventHandlerManagerIface(data.eventHandlerManager()) : null,
    delegate: data.delegate ? null/* MSContentDrawViewDelegate */ : null,
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    viewPort: data.viewPort ? convMSViewPortIface(data.viewPort()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSViewPortIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSViewPort')
  if (!data) return null
  converteds[idx] = {
    $type: "MSViewPort",
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSTiledLayerPileIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSTiledLayerPile')
  if (!data) return null
  converteds[idx] = {
    $type: "MSTiledLayerPile",
    page: data.page ? convMSImmutablePageIface(data.page()) : null,
    document: data.document ? convMSImmutableDocumentDataIface(data.document()) : null,
    tiledLayers: data.tiledLayers ? convNSMutableArrayIface(data.tiledLayers()) : null,
    hostView: data.hostView ? null/* NSView<MSTiledLayerPileHostView> */ : null,
    renderingCacheProvider: data.renderingCacheProvider ? null/* MSRenderingContextCacheProvider */ : null,
    shouldHideOverlayControls: data.shouldHideOverlayControls ? !!data.shouldHideOverlayControls() : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    isRendering: data.isRendering ? !!data.isRendering() : null,
    tiledRect: data.tiledRect ? convCGRectStruct(data.tiledRect()) : null,
    supercededTiledLayers: data.supercededTiledLayers ? convertArray(data.supercededTiledLayers()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSImmutablePageIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutablePage')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutablePage",
    cachedArtboards: data.cachedArtboards ? convertArray(data.cachedArtboards()) : null,
    artboards: data.artboards ? convertArray(data.artboards()) : null,
    contentBounds: data.contentBounds ? convCGRectStruct(data.contentBounds()) : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    grid: data.grid ? convMSImmutableSimpleGridIface(data.grid()) : null,
    gridGeneric: data.gridGeneric ? convMSSimpleGridIface(data.gridGeneric()) : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    horizontalRulerData: data.horizontalRulerData ? convMSImmutableRulerDataIface(data.horizontalRulerData()) : null,
    horizontalRulerDataGeneric: data.horizontalRulerDataGeneric ? convMSRulerDataIface(data.horizontalRulerDataGeneric()) : null,
    includeInCloudUpload: data.includeInCloudUpload ? !!data.includeInCloudUpload() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    layout: data.layout ? convMSImmutableLayoutGridIface(data.layout()) : null,
    layoutGeneric: data.layoutGeneric ? convMSLayoutGridIface(data.layoutGeneric()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    verticalRulerData: data.verticalRulerData ? convMSImmutableRulerDataIface(data.verticalRulerData()) : null,
    verticalRulerDataGeneric: data.verticalRulerDataGeneric ? convMSRulerDataIface(data.verticalRulerDataGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // hasBitmapStylesEnabled: data.hasBitmapStylesEnabled ? !!data.hasBitmapStylesEnabled() : null,
    // usedStyle: data.usedStyle ? convMSImmutableStyleIface(data.usedStyle()) : null,
    // style: data.style ? convMSImmutableStyleIface(data.style()) : null,
    // influenceRectForFrame: data.influenceRectForFrame ? convCGRectStruct(data.influenceRectForFrame()) : null,
    // influenceRectForBounds: data.influenceRectForBounds ? convCGRectStruct(data.influenceRectForBounds()) : null,
    // traits: data.traits ? +data.traits() : null,
    // influenceRectEdgePaddingsThatDoNotCascade: data.influenceRectEdgePaddingsThatDoNotCascade ? convBCEdgePaddingsStruct(data.influenceRectEdgePaddingsThatDoNotCascade()) : null,
    // frameForTransforms: data.frameForTransforms ? convCGRectStruct(data.frameForTransforms()) : null,
    // transform: data.transform ? convNSAffineTransformIface(data.transform()) : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // hasEnabledBackgroundBlur: data.hasEnabledBackgroundBlur ? !!data.hasEnabledBackgroundBlur() : null,
    // frame: data.frame ? convMSImmutableRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSImmutableExportOptionsIface(data.exportOptions()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSExportOptionsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSExportOptions')
  if (!data) return null
  converteds[idx] = {
    $type: "MSExportOptions",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportFormats: data.exportFormats ? convertArray(data.exportFormats()) : null,
    includedLayerIds: data.includedLayerIds ? convertArray(data.includedLayerIds()) : null,
    layerOptions: data.layerOptions ? +data.layerOptions() : null,
    shouldTrim: data.shouldTrim ? !!data.shouldTrim() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSDocumentDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSDocumentData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSDocumentData",
    metadata: data.metadata ? convertDictionary(data.metadata()) : null,
    autoExpandGroupsInLayerList: data.autoExpandGroupsInLayerList ? !!data.autoExpandGroupsInLayerList() : null,
    delegate: data.delegate ? null/* MSDocumentDataDelegate */ : null,
    cache: data.cache ? convBCCacheIface(data.cache()) : null,
    images: data.images ? convMSImageCollectionIface(data.images()) : null,
    currentPage: data.currentPage ? convMSPageIface(data.currentPage()) : null,
    assetsGeneric: data.assetsGeneric ? convMSAssetCollectionIface(data.assetsGeneric()) : null,
    cloudShareID: data.cloudShareID ? data.cloudShareID() + '' : null,
    cloudShareURL: data.cloudShareURL ? data.cloudShareURL() + '' : null,
    cloudUserID: data.cloudUserID ? data.cloudUserID() + '' : null,
    currentPageIndex: data.currentPageIndex ? +data.currentPageIndex() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    enableLayerInteraction: data.enableLayerInteraction ? !!data.enableLayerInteraction() : null,
    enableSliceInteraction: data.enableSliceInteraction ? !!data.enableSliceInteraction() : null,
    layerStylesGeneric: data.layerStylesGeneric ? convMSSharedStyleContainerIface(data.layerStylesGeneric()) : null,
    layerSymbolsGeneric: data.layerSymbolsGeneric ? convMSSymbolContainerIface(data.layerSymbolsGeneric()) : null,
    layerTextStylesGeneric: data.layerTextStylesGeneric ? convMSSharedTextStyleContainerIface(data.layerTextStylesGeneric()) : null,
    pages: data.pages ? convertArray(data.pages()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // layerTextStyles: data.layerTextStyles ? convMSSharedTextStyleContainerIface(data.layerTextStyles()) : null,
    // layerSymbols: data.layerSymbols ? convMSSymbolContainerIface(data.layerSymbols()) : null,
    // layerStyles: data.layerStyles ? convMSSharedStyleContainerIface(data.layerStyles()) : null,
    // assets: data.assets ? convMSAssetCollectionIface(data.assets()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convBCCacheIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCCache')
  if (!data) return null
  converteds[idx] = {
    $type: "BCCache",
    count: data.count ? +data.count() : null,
    allOwners: data.allOwners ? convNSSetIface(data.allOwners()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSSetIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSSet')
  if (!data) return null
  converteds[idx] = {
    $type: "NSSet",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSImageCollectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImageCollection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImageCollection",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    images: data.images ? convertDictionary(data.images()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSPageIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSPage')
  if (!data) return null
  converteds[idx] = {
    $type: "MSPage",
    cachedExportableLayers: data.cachedExportableLayers ? convertArray(data.cachedExportableLayers()) : null,
    cachedArtboards: data.cachedArtboards ? convertArray(data.cachedArtboards()) : null,
    currentArtboard: data.currentArtboard ? convMSArtboardGroupIface(data.currentArtboard()) : null,
    primitiveName: data.primitiveName ? data.primitiveName() + '' : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    zoomValue: data.zoomValue ? +data.zoomValue() : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    artboards: data.artboards ? convertArray(data.artboards()) : null,
    contentBounds: data.contentBounds ? convCGRectStruct(data.contentBounds()) : null,
    exportableLayersCount: data.exportableLayersCount ? +data.exportableLayersCount() : null,
    rulerBase: data.rulerBase ? convCGPointStruct(data.rulerBase()) : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    grid: data.grid ? convMSSimpleGridIface(data.grid()) : null,
    gridGeneric: data.gridGeneric ? convMSSimpleGridIface(data.gridGeneric()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    horizontalRulerData: data.horizontalRulerData ? convMSRulerDataIface(data.horizontalRulerData()) : null,
    horizontalRulerDataGeneric: data.horizontalRulerDataGeneric ? convMSRulerDataIface(data.horizontalRulerDataGeneric()) : null,
    includeInCloudUpload: data.includeInCloudUpload ? !!data.includeInCloudUpload() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    layout: data.layout ? convMSLayoutGridIface(data.layout()) : null,
    layoutGeneric: data.layoutGeneric ? convMSLayoutGridIface(data.layoutGeneric()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    verticalRulerData: data.verticalRulerData ? convMSRulerDataIface(data.verticalRulerData()) : null,
    verticalRulerDataGeneric: data.verticalRulerDataGeneric ? convMSRulerDataIface(data.verticalRulerDataGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // preCalculatedHasSelectedLayer: data.preCalculatedHasSelectedLayer ? +data.preCalculatedHasSelectedLayer() : null,
    // lightweightContainsSelectedItem: data.lightweightContainsSelectedItem ? !!data.lightweightContainsSelectedItem() : null,
    // isOpen: data.isOpen ? !!data.isOpen() : null,
    // hasLayerWithMaskMode: data.hasLayerWithMaskMode ? +data.hasLayerWithMaskMode() : null,
    // enableAutomaticScaling: data.enableAutomaticScaling ? !!data.enableAutomaticScaling() : null,
    // style: data.style ? convMSStyleIface(data.style()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSArtboardGroupIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSArtboardGroup')
  if (!data) return null
  converteds[idx] = {
    $type: "MSArtboardGroup",
    sliceWatcher: data.sliceWatcher ? null/* MSSliceLayerWatcher */ : null,
    contentBounds: data.contentBounds ? convCGRectStruct(data.contentBounds()) : null,
    rulerBase: data.rulerBase ? convCGPointStruct(data.rulerBase()) : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    rotation: data.rotation ? +data.rotation() : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    backgroundColorGeneric: data.backgroundColorGeneric ? convMSColorIface(data.backgroundColorGeneric()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    grid: data.grid ? convMSSimpleGridIface(data.grid()) : null,
    gridGeneric: data.gridGeneric ? convMSSimpleGridIface(data.gridGeneric()) : null,
    hasBackgroundColor: data.hasBackgroundColor ? !!data.hasBackgroundColor() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    horizontalRulerData: data.horizontalRulerData ? convMSRulerDataIface(data.horizontalRulerData()) : null,
    horizontalRulerDataGeneric: data.horizontalRulerDataGeneric ? convMSRulerDataIface(data.horizontalRulerDataGeneric()) : null,
    includeBackgroundColorInExport: data.includeBackgroundColorInExport ? !!data.includeBackgroundColorInExport() : null,
    includeInCloudUpload: data.includeInCloudUpload ? !!data.includeInCloudUpload() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    layout: data.layout ? convMSLayoutGridIface(data.layout()) : null,
    layoutGeneric: data.layoutGeneric ? convMSLayoutGridIface(data.layoutGeneric()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    verticalRulerData: data.verticalRulerData ? convMSRulerDataIface(data.verticalRulerData()) : null,
    verticalRulerDataGeneric: data.verticalRulerDataGeneric ? convMSRulerDataIface(data.verticalRulerDataGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // backgroundColor: data.backgroundColor ? convMSColorIface(data.backgroundColor()) : null,
    // preCalculatedHasSelectedLayer: data.preCalculatedHasSelectedLayer ? +data.preCalculatedHasSelectedLayer() : null,
    // lightweightContainsSelectedItem: data.lightweightContainsSelectedItem ? !!data.lightweightContainsSelectedItem() : null,
    // isOpen: data.isOpen ? !!data.isOpen() : null,
    // hasLayerWithMaskMode: data.hasLayerWithMaskMode ? +data.hasLayerWithMaskMode() : null,
    // enableAutomaticScaling: data.enableAutomaticScaling ? !!data.enableAutomaticScaling() : null,
    // style: data.style ? convMSStyleIface(data.style()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSColorIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSColor')
  if (!data) return null
  converteds[idx] = {
    $type: "MSColor",
    brightness: data.brightness ? +data.brightness() : null,
    saturation: data.saturation ? +data.saturation() : null,
    hue: data.hue ? +data.hue() : null,
    description: data.description ? data.description() + '' : null,
    alpha: data.alpha ? +data.alpha() : null,
    blue: data.blue ? +data.blue() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    green: data.green ? +data.green() : null,
    red: data.red ? +data.red() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSRectIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSRect')
  if (!data) return null
  converteds[idx] = {
    $type: "MSRect",
    bottom: data.bottom ? +data.bottom() : null,
    right: data.right ? +data.right() : null,
    mid: data.mid ? convCGPointStruct(data.mid()) : null,
    description: data.description ? data.description() + '' : null,
    primitiveConstrainProportions: data.primitiveConstrainProportions ? !!data.primitiveConstrainProportions() : null,
    midY: data.midY ? +data.midY() : null,
    midX: data.midX ? +data.midX() : null,
    maxY: data.maxY ? +data.maxY() : null,
    minY: data.minY ? +data.minY() : null,
    maxX: data.maxX ? +data.maxX() : null,
    minX: data.minX ? +data.minX() : null,
    top: data.top ? +data.top() : null,
    left: data.left ? +data.left() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    size: data.size ? convCGSizeStruct(data.size()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    height: data.height ? +data.height() : null,
    width: data.width ? +data.width() : null,
    x: data.x ? +data.x() : null,
    y: data.y ? +data.y() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSSimpleGridIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSimpleGrid')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSimpleGrid",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    gridSize: data.gridSize ? +data.gridSize() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    thickGridTimes: data.thickGridTimes ? +data.thickGridTimes() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // forceDraw: data.forceDraw ? !!data.forceDraw() : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSRulerDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSRulerData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSRulerData",
    base: data.base ? +data.base() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    guides: data.guides ? convertArray(data.guides()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSLayoutGridIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSLayoutGrid')
  if (!data) return null
  converteds[idx] = {
    $type: "MSLayoutGrid",
    darkColor: data.darkColor ? convNSColorIface(data.darkColor()) : null,
    lightColor: data.lightColor ? convNSColorIface(data.lightColor()) : null,
    columnWidth: data.columnWidth ? +data.columnWidth() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    drawHorizontal: data.drawHorizontal ? !!data.drawHorizontal() : null,
    drawHorizontalLines: data.drawHorizontalLines ? !!data.drawHorizontalLines() : null,
    drawVertical: data.drawVertical ? !!data.drawVertical() : null,
    gutterHeight: data.gutterHeight ? +data.gutterHeight() : null,
    gutterWidth: data.gutterWidth ? +data.gutterWidth() : null,
    guttersOutside: data.guttersOutside ? !!data.guttersOutside() : null,
    horizontalOffset: data.horizontalOffset ? +data.horizontalOffset() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    numberOfColumns: data.numberOfColumns ? +data.numberOfColumns() : null,
    rowHeightMultiplication: data.rowHeightMultiplication ? +data.rowHeightMultiplication() : null,
    totalWidth: data.totalWidth ? +data.totalWidth() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // forceDraw: data.forceDraw ? !!data.forceDraw() : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyle')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyle",
    thickestInnerStroke: data.thickestInnerStroke ? +data.thickestInnerStroke() : null,
    hasDecorations: data.hasDecorations ? !!data.hasDecorations() : null,
    hasEnabledBackgroundBlur: data.hasEnabledBackgroundBlur ? !!data.hasEnabledBackgroundBlur() : null,
    primitiveTextStyle: data.primitiveTextStyle ? convMSTextStyleIface(data.primitiveTextStyle()) : null,
    primitiveSharedObjectID: data.primitiveSharedObjectID ? data.primitiveSharedObjectID() + '' : null,
    hasBlending: data.hasBlending ? !!data.hasBlending() : null,
    hasEnabledBorder: data.hasEnabledBorder ? !!data.hasEnabledBorder() : null,
    hasMoreThanOneEnabledFill: data.hasMoreThanOneEnabledFill ? !!data.hasMoreThanOneEnabledFill() : null,
    hasEnabledShadow: data.hasEnabledShadow ? !!data.hasEnabledShadow() : null,
    innerShadow: data.innerShadow ? convMSStyleShadowIface(data.innerShadow()) : null,
    shadow: data.shadow ? convMSStyleShadowIface(data.shadow()) : null,
    border: data.border ? convMSStyleBorderIface(data.border()) : null,
    borderGeneric: data.borderGeneric ? convMSStyleBorderIface(data.borderGeneric()) : null,
    fill: data.fill ? convMSStyleFillIface(data.fill()) : null,
    fillGeneric: data.fillGeneric ? convMSStyleFillIface(data.fillGeneric()) : null,
    blurGeneric: data.blurGeneric ? convMSStyleBlurIface(data.blurGeneric()) : null,
    borderOptionsGeneric: data.borderOptionsGeneric ? convMSStyleBorderOptionsIface(data.borderOptionsGeneric()) : null,
    borders: data.borders ? convertArray(data.borders()) : null,
    colorControlsGeneric: data.colorControlsGeneric ? convMSStyleColorControlsIface(data.colorControlsGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    endDecorationType: data.endDecorationType ? +data.endDecorationType() : null,
    fills: data.fills ? convertArray(data.fills()) : null,
    innerShadows: data.innerShadows ? convertArray(data.innerShadows()) : null,
    miterLimit: data.miterLimit ? +data.miterLimit() : null,
    reflectionGeneric: data.reflectionGeneric ? convMSStyleReflectionIface(data.reflectionGeneric()) : null,
    shadows: data.shadows ? convertArray(data.shadows()) : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    startDecorationType: data.startDecorationType ? +data.startDecorationType() : null,
    textStyleGeneric: data.textStyleGeneric ? convMSTextStyleIface(data.textStyleGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // textStyle: data.textStyle ? convMSTextStyleIface(data.textStyle()) : null,
    // reflection: data.reflection ? convMSStyleReflectionIface(data.reflection()) : null,
    // contextSettings: data.contextSettings ? convMSGraphicsContextSettingsIface(data.contextSettings()) : null,
    // colorControls: data.colorControls ? convMSStyleColorControlsIface(data.colorControls()) : null,
    // borderOptions: data.borderOptions ? convMSStyleBorderOptionsIface(data.borderOptions()) : null,
    // blur: data.blur ? convMSStyleBlurIface(data.blur()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSTextStyleIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSTextStyle')
  if (!data) return null
  converteds[idx] = {
    $type: "MSTextStyle",
    decodedAttributes: data.decodedAttributes ? convertDictionary(data.decodedAttributes()) : null,
    attributes: data.attributes ? convertDictionary(data.attributes()) : null,
    isRequiredFontAvailable: data.isRequiredFontAvailable ? !!data.isRequiredFontAvailable() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    encodedAttributes: data.encodedAttributes ? convertDictionary(data.encodedAttributes()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleShadowIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleShadow')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleShadow",
    blurRadius: data.blurRadius ? +data.blurRadius() : null,
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    offsetX: data.offsetX ? +data.offsetX() : null,
    offsetY: data.offsetY ? +data.offsetY() : null,
    spread: data.spread ? +data.spread() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // contextSettings: data.contextSettings ? convMSGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSColorIface(data.color()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSGraphicsContextSettingsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSGraphicsContextSettings')
  if (!data) return null
  converteds[idx] = {
    $type: "MSGraphicsContextSettings",
    description: data.description ? data.description() + '' : null,
    blendMode: data.blendMode ? +data.blendMode() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    opacity: data.opacity ? +data.opacity() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleBorderIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleBorder')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleBorder",
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    fillType: data.fillType ? +data.fillType() : null,
    gradientGeneric: data.gradientGeneric ? convMSGradientIface(data.gradientGeneric()) : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    position: data.position ? +data.position() : null,
    thickness: data.thickness ? +data.thickness() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // gradient: data.gradient ? convMSGradientIface(data.gradient()) : null,
    // contextSettings: data.contextSettings ? convMSGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSColorIface(data.color()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSGradientIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSGradient')
  if (!data) return null
  converteds[idx] = {
    $type: "MSGradient",
    svgPositionIsAbsolute: data.svgPositionIsAbsolute ? !!data.svgPositionIsAbsolute() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    elipseLength: data.elipseLength ? +data.elipseLength() : null,
    from: data.from ? convCGPointStruct(data.from()) : null,
    gradientType: data.gradientType ? +data.gradientType() : null,
    shouldSmoothenOpacity: data.shouldSmoothenOpacity ? !!data.shouldSmoothenOpacity() : null,
    stops: data.stops ? convertArray(data.stops()) : null,
    to: data.to ? convCGPointStruct(data.to()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleFillIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleFill')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleFill",
    interfaceOpacity: data.interfaceOpacity ? +data.interfaceOpacity() : null,
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    fillType: data.fillType ? +data.fillType() : null,
    gradientGeneric: data.gradientGeneric ? convMSGradientIface(data.gradientGeneric()) : null,
    image: data.image ? convMSImageDataIface(data.image()) : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    noiseIndex: data.noiseIndex ? +data.noiseIndex() : null,
    noiseIntensity: data.noiseIntensity ? +data.noiseIntensity() : null,
    patternFillType: data.patternFillType ? +data.patternFillType() : null,
    patternTileScale: data.patternTileScale ? +data.patternTileScale() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // gradient: data.gradient ? convMSGradientIface(data.gradient()) : null,
    // contextSettings: data.contextSettings ? convMSGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSColorIface(data.color()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImageDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImageData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImageData",
    image: data.image ? convNSImageIface(data.image()) : null,
    sha1: data.sha1 ? convNSDataIface(data.sha1()) : null,
    data: data.data ? convNSDataIface(data.data()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSImageIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSImage')
  if (!data) return null
  converteds[idx] = {
    $type: "NSImage",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSData')
  if (!data) return null
  converteds[idx] = {
    $type: "NSData",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSStyleBlurIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleBlur')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleBlur",
    center: data.center ? convCGPointStruct(data.center()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    motionAngle: data.motionAngle ? +data.motionAngle() : null,
    radius: data.radius ? +data.radius() : null,
    type: data.type ? +data.type() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleBorderOptionsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleBorderOptions')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleBorderOptions",
    hasDashPattern: data.hasDashPattern ? !!data.hasDashPattern() : null,
    dashPattern: data.dashPattern ? convertArray(data.dashPattern()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    lineCapStyle: data.lineCapStyle ? +data.lineCapStyle() : null,
    lineJoinStyle: data.lineJoinStyle ? +data.lineJoinStyle() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleColorControlsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleColorControls')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleColorControls",
    brightness: data.brightness ? +data.brightness() : null,
    contrast: data.contrast ? +data.contrast() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    hue: data.hue ? +data.hue() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    saturation: data.saturation ? +data.saturation() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyleReflectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleReflection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleReflection",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    distance: data.distance ? +data.distance() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    strength: data.strength ? +data.strength() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSAbsoluteRectIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSAbsoluteRect')
  if (!data) return null
  converteds[idx] = {
    $type: "MSAbsoluteRect",
    layer: data.layer ? convMSLayerIface(data.layer()) : null,
    rulerOrigin: data.rulerOrigin ? convCGPointStruct(data.rulerOrigin()) : null,
    rulerY: data.rulerY ? +data.rulerY() : null,
    rulerX: data.rulerX ? +data.rulerX() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // rect: data.rect ? convCGRectStruct(data.rect()) : null,
    // size: data.size ? convCGSizeStruct(data.size()) : null,
    // origin: data.origin ? convCGPointStruct(data.origin()) : null,
    // description: data.description ? data.description() + '' : null,
    // mid: data.mid ? convCGPointStruct(data.mid()) : null,
    // maxY: data.maxY ? +data.maxY() : null,
    // midY: data.midY ? +data.midY() : null,
    // minY: data.minY ? +data.minY() : null,
    // maxX: data.maxX ? +data.maxX() : null,
    // midX: data.midX ? +data.midX() : null,
    // minX: data.minX ? +data.minX() : null,
    // height: data.height ? +data.height() : null,
    // width: data.width ? +data.width() : null,
    // y: data.y ? +data.y() : null,
    // x: data.x ? +data.x() : null,
    // debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
  }
  return {$ref: idx}
}

function convMSLayerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSLayer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSLayer",
    absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    isHovering: data.isHovering ? !!data.isHovering() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    center: data.center ? convCGPointStruct(data.center()) : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    proportions: data.proportions ? +data.proportions() : null,
    constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    nodeName: data.nodeName ? data.nodeName() + '' : null,
    selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    isActive: data.isActive ? !!data.isActive() : null,
    filterType: data.filterType ? +data.filterType() : null,
    displayType: data.displayType ? +data.displayType() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSStyledLayerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyledLayer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyledLayer",
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // style: data.style ? convMSStyleIface(data.style()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convNSMenuIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSMenu')
  if (!data) return null
  converteds[idx] = {
    $type: "NSMenu",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSAssetCollectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSAssetCollection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSAssetCollection",
    colors: data.colors ? convertArray(data.colors()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportPresets: data.exportPresets ? convertArray(data.exportPresets()) : null,
    gradients: data.gradients ? convertArray(data.gradients()) : null,
    imageCollectionGeneric: data.imageCollectionGeneric ? convMSImageCollectionIface(data.imageCollectionGeneric()) : null,
    images: data.images ? convertArray(data.images()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // imageCollection: data.imageCollection ? convMSImageCollectionIface(data.imageCollection()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSSharedStyleContainerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSharedStyleContainer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSharedStyleContainer",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    objects: data.objects ? convertArray(data.objects()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // delegate: data.delegate ? null/* MSSharedObjectContainerDelegate */ : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSSymbolContainerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSymbolContainer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSymbolContainer",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    objects: data.objects ? convertArray(data.objects()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // delegate: data.delegate ? null/* MSSharedObjectContainerDelegate */ : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSSharedTextStyleContainerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSharedTextStyleContainer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSharedTextStyleContainer",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    objects: data.objects ? convertArray(data.objects()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // delegate: data.delegate ? null/* MSSharedObjectContainerDelegate */ : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableSimpleGridIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableSimpleGrid')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableSimpleGrid",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    gridSize: data.gridSize ? +data.gridSize() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    thickGridTimes: data.thickGridTimes ? +data.thickGridTimes() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableRulerDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableRulerData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableRulerData",
    base: data.base ? +data.base() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    guides: data.guides ? convertArray(data.guides()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableLayoutGridIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableLayoutGrid')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableLayoutGrid",
    columnWidth: data.columnWidth ? +data.columnWidth() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    drawHorizontal: data.drawHorizontal ? !!data.drawHorizontal() : null,
    drawHorizontalLines: data.drawHorizontalLines ? !!data.drawHorizontalLines() : null,
    drawVertical: data.drawVertical ? !!data.drawVertical() : null,
    gutterHeight: data.gutterHeight ? +data.gutterHeight() : null,
    gutterWidth: data.gutterWidth ? +data.gutterWidth() : null,
    guttersOutside: data.guttersOutside ? !!data.guttersOutside() : null,
    horizontalOffset: data.horizontalOffset ? +data.horizontalOffset() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    numberOfColumns: data.numberOfColumns ? +data.numberOfColumns() : null,
    rowHeightMultiplication: data.rowHeightMultiplication ? +data.rowHeightMultiplication() : null,
    totalWidth: data.totalWidth ? +data.totalWidth() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyle')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyle",
    enabledInnerShadows: data.enabledInnerShadows ? convertArray(data.enabledInnerShadows()) : null,
    enabledShadows: data.enabledShadows ? convertArray(data.enabledShadows()) : null,
    enabledBorders: data.enabledBorders ? convertArray(data.enabledBorders()) : null,
    enabledFills: data.enabledFills ? convertArray(data.enabledFills()) : null,
    outerPaddingForBiggestStroke: data.outerPaddingForBiggestStroke ? +data.outerPaddingForBiggestStroke() : null,
    thickestInnerStroke: data.thickestInnerStroke ? +data.thickestInnerStroke() : null,
    hasBlending: data.hasBlending ? !!data.hasBlending() : null,
    fillGeneric: data.fillGeneric ? convMSStyleFillIface(data.fillGeneric()) : null,
    fill: data.fill ? convMSImmutableStyleFillIface(data.fill()) : null,
    borderGeneric: data.borderGeneric ? convMSStyleBorderIface(data.borderGeneric()) : null,
    border: data.border ? convMSImmutableStyleBorderIface(data.border()) : null,
    hasEnabledBorder: data.hasEnabledBorder ? !!data.hasEnabledBorder() : null,
    hasEnabledInnerShadow: data.hasEnabledInnerShadow ? !!data.hasEnabledInnerShadow() : null,
    hasEnabledShadow: data.hasEnabledShadow ? !!data.hasEnabledShadow() : null,
    firstEnabledBorder: data.firstEnabledBorder ? convMSImmutableStyleBorderIface(data.firstEnabledBorder()) : null,
    firstEnabledFill: data.firstEnabledFill ? convMSImmutableStyleFillIface(data.firstEnabledFill()) : null,
    firstEnabledInnerShadow: data.firstEnabledInnerShadow ? convMSImmutableStyleInnerShadowIface(data.firstEnabledInnerShadow()) : null,
    firstEnabledShadow: data.firstEnabledShadow ? convMSImmutableStyleShadowIface(data.firstEnabledShadow()) : null,
    hasMoreThanOneEnabledFill: data.hasMoreThanOneEnabledFill ? !!data.hasMoreThanOneEnabledFill() : null,
    hasDecorations: data.hasDecorations ? !!data.hasDecorations() : null,
    hasEnabledBackgroundBlur: data.hasEnabledBackgroundBlur ? !!data.hasEnabledBackgroundBlur() : null,
    hasBitmapStylesEnabled: data.hasBitmapStylesEnabled ? !!data.hasBitmapStylesEnabled() : null,
    blurGeneric: data.blurGeneric ? convMSStyleBlurIface(data.blurGeneric()) : null,
    borderOptionsGeneric: data.borderOptionsGeneric ? convMSStyleBorderOptionsIface(data.borderOptionsGeneric()) : null,
    borders: data.borders ? convertArray(data.borders()) : null,
    colorControlsGeneric: data.colorControlsGeneric ? convMSStyleColorControlsIface(data.colorControlsGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    endDecorationType: data.endDecorationType ? +data.endDecorationType() : null,
    fills: data.fills ? convertArray(data.fills()) : null,
    innerShadows: data.innerShadows ? convertArray(data.innerShadows()) : null,
    miterLimit: data.miterLimit ? +data.miterLimit() : null,
    reflectionGeneric: data.reflectionGeneric ? convMSStyleReflectionIface(data.reflectionGeneric()) : null,
    shadows: data.shadows ? convertArray(data.shadows()) : null,
    sharedObjectID: data.sharedObjectID ? data.sharedObjectID() + '' : null,
    startDecorationType: data.startDecorationType ? +data.startDecorationType() : null,
    textStyleGeneric: data.textStyleGeneric ? convMSTextStyleIface(data.textStyleGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // textStyle: data.textStyle ? convMSImmutableTextStyleIface(data.textStyle()) : null,
    // reflection: data.reflection ? convMSImmutableStyleReflectionIface(data.reflection()) : null,
    // contextSettings: data.contextSettings ? convMSImmutableGraphicsContextSettingsIface(data.contextSettings()) : null,
    // colorControls: data.colorControls ? convMSImmutableStyleColorControlsIface(data.colorControls()) : null,
    // borderOptions: data.borderOptions ? convMSImmutableStyleBorderOptionsIface(data.borderOptions()) : null,
    // blur: data.blur ? convMSImmutableStyleBlurIface(data.blur()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleFillIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleFill')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleFill",
    hasOpacity: data.hasOpacity ? !!data.hasOpacity() : null,
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    fillType: data.fillType ? +data.fillType() : null,
    gradientGeneric: data.gradientGeneric ? convMSGradientIface(data.gradientGeneric()) : null,
    image: data.image ? convMSImageDataIface(data.image()) : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    noiseIndex: data.noiseIndex ? +data.noiseIndex() : null,
    noiseIntensity: data.noiseIntensity ? +data.noiseIntensity() : null,
    patternFillType: data.patternFillType ? +data.patternFillType() : null,
    patternTileScale: data.patternTileScale ? +data.patternTileScale() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // gradient: data.gradient ? convMSImmutableGradientIface(data.gradient()) : null,
    // contextSettings: data.contextSettings ? convMSImmutableGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSImmutableColorIface(data.color()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableGradientIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableGradient')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableGradient",
    hasOpacity: data.hasOpacity ? !!data.hasOpacity() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    elipseLength: data.elipseLength ? +data.elipseLength() : null,
    from: data.from ? convCGPointStruct(data.from()) : null,
    gradientType: data.gradientType ? +data.gradientType() : null,
    shouldSmoothenOpacity: data.shouldSmoothenOpacity ? !!data.shouldSmoothenOpacity() : null,
    stops: data.stops ? convertArray(data.stops()) : null,
    to: data.to ? convCGPointStruct(data.to()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableGraphicsContextSettingsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableGraphicsContextSettings')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableGraphicsContextSettings",
    blendMode: data.blendMode ? +data.blendMode() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    opacity: data.opacity ? +data.opacity() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableColorIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableColor')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableColor",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    alpha: data.alpha ? +data.alpha() : null,
    blue: data.blue ? +data.blue() : null,
    description: data.description ? data.description() + '' : null,
    green: data.green ? +data.green() : null,
    red: data.red ? +data.red() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleBorderIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleBorder')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleBorder",
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    fillType: data.fillType ? +data.fillType() : null,
    gradientGeneric: data.gradientGeneric ? convMSGradientIface(data.gradientGeneric()) : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    position: data.position ? +data.position() : null,
    thickness: data.thickness ? +data.thickness() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // gradient: data.gradient ? convMSImmutableGradientIface(data.gradient()) : null,
    // contextSettings: data.contextSettings ? convMSImmutableGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSImmutableColorIface(data.color()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleInnerShadowIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleInnerShadow')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleInnerShadow",
    blurRadius: data.blurRadius ? +data.blurRadius() : null,
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    offsetX: data.offsetX ? +data.offsetX() : null,
    offsetY: data.offsetY ? +data.offsetY() : null,
    spread: data.spread ? +data.spread() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // contextSettings: data.contextSettings ? convMSImmutableGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSImmutableColorIface(data.color()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleShadowIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleShadow')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleShadow",
    blurRadius: data.blurRadius ? +data.blurRadius() : null,
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    offsetX: data.offsetX ? +data.offsetX() : null,
    offsetY: data.offsetY ? +data.offsetY() : null,
    spread: data.spread ? +data.spread() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // contextSettings: data.contextSettings ? convMSImmutableGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSImmutableColorIface(data.color()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableTextStyleIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableTextStyle')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableTextStyle",
    decodedAttributes: data.decodedAttributes ? convertDictionary(data.decodedAttributes()) : null,
    attributes: data.attributes ? convertDictionary(data.attributes()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    encodedAttributes: data.encodedAttributes ? convertDictionary(data.encodedAttributes()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleReflectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleReflection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleReflection",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    distance: data.distance ? +data.distance() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    strength: data.strength ? +data.strength() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleColorControlsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleColorControls')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleColorControls",
    brightness: data.brightness ? +data.brightness() : null,
    contrast: data.contrast ? +data.contrast() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    hue: data.hue ? +data.hue() : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    saturation: data.saturation ? +data.saturation() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleBorderOptionsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleBorderOptions')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleBorderOptions",
    CGLineCap: data.CGLineCap ? +data.CGLineCap() : null,
    CGLineJoin: data.CGLineJoin ? +data.CGLineJoin() : null,
    hasDashPattern: data.hasDashPattern ? !!data.hasDashPattern() : null,
    dashPattern: data.dashPattern ? convertArray(data.dashPattern()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    lineCapStyle: data.lineCapStyle ? +data.lineCapStyle() : null,
    lineJoinStyle: data.lineJoinStyle ? +data.lineJoinStyle() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableStyleBlurIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableStyleBlur')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableStyleBlur",
    center: data.center ? convCGPointStruct(data.center()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,
    motionAngle: data.motionAngle ? +data.motionAngle() : null,
    radius: data.radius ? +data.radius() : null,
    type: data.type ? +data.type() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convNSAffineTransformIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSAffineTransform')
  if (!data) return null
  converteds[idx] = {
    $type: "NSAffineTransform",
    includesFlip: data.includesFlip ? !!data.includesFlip() : null,
    determinant: data.determinant ? +data.determinant() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSImmutableRectIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableRect')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableRect",
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    size: data.size ? convCGSizeStruct(data.size()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    height: data.height ? +data.height() : null,
    width: data.width ? +data.width() : null,
    x: data.x ? +data.x() : null,
    y: data.y ? +data.y() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableExportOptionsIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableExportOptions')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableExportOptions",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportFormats: data.exportFormats ? convertArray(data.exportFormats()) : null,
    includedLayerIds: data.includedLayerIds ? convertArray(data.includedLayerIds()) : null,
    layerOptions: data.layerOptions ? +data.layerOptions() : null,
    shouldTrim: data.shouldTrim ? !!data.shouldTrim() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableDocumentDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableDocumentData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableDocumentData",
    symbolsIndexedByID: data.symbolsIndexedByID ? convertDictionary(data.symbolsIndexedByID()) : null,
    metadata: data.metadata ? convertDictionary(data.metadata()) : null,
    currentPage: data.currentPage ? convMSImmutablePageIface(data.currentPage()) : null,
    assetsGeneric: data.assetsGeneric ? convMSAssetCollectionIface(data.assetsGeneric()) : null,
    cloudShareID: data.cloudShareID ? data.cloudShareID() + '' : null,
    cloudShareURL: data.cloudShareURL ? data.cloudShareURL() + '' : null,
    cloudUserID: data.cloudUserID ? data.cloudUserID() + '' : null,
    currentPageIndex: data.currentPageIndex ? +data.currentPageIndex() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    enableLayerInteraction: data.enableLayerInteraction ? !!data.enableLayerInteraction() : null,
    enableSliceInteraction: data.enableSliceInteraction ? !!data.enableSliceInteraction() : null,
    layerStylesGeneric: data.layerStylesGeneric ? convMSSharedStyleContainerIface(data.layerStylesGeneric()) : null,
    layerSymbolsGeneric: data.layerSymbolsGeneric ? convMSSymbolContainerIface(data.layerSymbolsGeneric()) : null,
    layerTextStylesGeneric: data.layerTextStylesGeneric ? convMSSharedTextStyleContainerIface(data.layerTextStylesGeneric()) : null,
    pages: data.pages ? convertArray(data.pages()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // layerTextStyles: data.layerTextStyles ? convMSImmutableSharedTextStyleContainerIface(data.layerTextStyles()) : null,
    // layerSymbols: data.layerSymbols ? convMSImmutableSymbolContainerIface(data.layerSymbols()) : null,
    // layerStyles: data.layerStyles ? convMSImmutableSharedStyleContainerIface(data.layerStyles()) : null,
    // assets: data.assets ? convMSImmutableAssetCollectionIface(data.assets()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableSharedTextStyleContainerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableSharedTextStyleContainer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableSharedTextStyleContainer",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    objects: data.objects ? convertArray(data.objects()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableSymbolContainerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableSymbolContainer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableSymbolContainer",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    objects: data.objects ? convertArray(data.objects()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableSharedStyleContainerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableSharedStyleContainer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableSharedStyleContainer",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    objects: data.objects ? convertArray(data.objects()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableAssetCollectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableAssetCollection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableAssetCollection",
    colors: data.colors ? convertArray(data.colors()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportPresets: data.exportPresets ? convertArray(data.exportPresets()) : null,
    gradients: data.gradients ? convertArray(data.gradients()) : null,
    imageCollectionGeneric: data.imageCollectionGeneric ? convMSImageCollectionIface(data.imageCollectionGeneric()) : null,
    images: data.images ? convertArray(data.images()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // imageCollection: data.imageCollection ? convMSImmutableImageCollectionIface(data.imageCollection()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableImageCollectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableImageCollection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableImageCollection",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    images: data.images ? convertDictionary(data.images()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convNSMutableArrayIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSMutableArray')
  if (!data) return null
  converteds[idx] = {
    $type: "NSMutableArray",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSCacheManagerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSCacheManager')
  if (!data) return null
  converteds[idx] = {
    $type: "MSCacheManager",
    zoomLevelForSharedCache: data.zoomLevelForSharedCache ? +data.zoomLevelForSharedCache() : null,
    zoomIndependentCache: data.zoomIndependentCache ? convBCCacheIface(data.zoomIndependentCache()) : null,
    renderingCache: data.renderingCache ? convBCCacheIface(data.renderingCache()) : null,
    modelCache: data.modelCache ? convBCCacheIface(data.modelCache()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSEventHandlerManagerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSEventHandlerManager')
  if (!data) return null
  converteds[idx] = {
    $type: "MSEventHandlerManager",
    secondHandler: data.secondHandler ? convMSEventHandlerIface(data.secondHandler()) : null,
    normalHandler: data.normalHandler ? convMSNormalEventHandlerIface(data.normalHandler()) : null,
    lastEventType: data.lastEventType ? +data.lastEventType() : null,
    lastMouseDownClickCount: data.lastMouseDownClickCount ? +data.lastMouseDownClickCount() : null,
    delegate: data.delegate ? null/* MSEventHandlerManagerDelegate */ : null,
    currentHandler: data.currentHandler ? convMSEventHandlerIface(data.currentHandler()) : null,
    defaultHandler: data.defaultHandler ? convMSEventHandlerIface(data.defaultHandler()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSEventHandlerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSEventHandler')
  if (!data) return null
  converteds[idx] = {
    $type: "MSEventHandler",
    activeGestureRecognizers: data.activeGestureRecognizers ? convertArray(data.activeGestureRecognizers()) : null,
    selectionRect: data.selectionRect ? convCGRectStruct(data.selectionRect()) : null,
    mouseTracker: data.mouseTracker ? convMSMouseTrackerIface(data.mouseTracker()) : null,
    selectionTouchBar: data.selectionTouchBar ? null/* NSTouchBar */ : null,
    noSelectionTouchBar: data.noSelectionTouchBar ? null/* NSTouchBar */ : null,
    viewCoordinateMouse: data.viewCoordinateMouse ? convCGPointStruct(data.viewCoordinateMouse()) : null,
    pressedKeys: data.pressedKeys ? data.pressedKeys() + '' : null,
    offsetTracker: data.offsetTracker ? convMSDuplicateOffsetTrackerIface(data.offsetTracker()) : null,
    delegate: data.delegate ? null/* MSBasicDelegate */ : null,
    manager: data.manager ? convMSEventHandlerManagerIface(data.manager()) : null,
    inspectorViewController: data.inspectorViewController ? null/* NSViewController<MSInspectorChildController> */ : null,
    applicableActionItemIdentifier: data.applicableActionItemIdentifier ? data.applicableActionItemIdentifier() + '' : null,
    shouldExitOnContentViewResize: data.shouldExitOnContentViewResize ? !!data.shouldExitOnContentViewResize() : null,
    handlesHistoryCoalescing: data.handlesHistoryCoalescing ? !!data.handlesHistoryCoalescing() : null,
    gestureRecognizers: data.gestureRecognizers ? convertArray(data.gestureRecognizers()) : null,
    scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // supportsTouchBar: data.supportsTouchBar ? !!data.supportsTouchBar() : null,
  }
  return {$ref: idx}
}

function convMSMouseTrackerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSMouseTracker')
  if (!data) return null
  converteds[idx] = {
    $type: "MSMouseTracker",
    modifierFlags: data.modifierFlags ? +data.modifierFlags() : null,
    view: data.view ? convNSViewIface(data.view()) : null,
    state: data.state ? +data.state() : null,
    action: data.action ? null/* SEL */ : null,
    target: data.target ? null/*id*/ : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSDuplicateOffsetTrackerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSDuplicateOffsetTracker')
  if (!data) return null
  converteds[idx] = {
    $type: "MSDuplicateOffsetTracker",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSNormalEventHandlerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSNormalEventHandler')
  if (!data) return null
  converteds[idx] = {
    $type: "MSNormalEventHandler",
    dragGestureRecognizer: data.dragGestureRecognizer ? convMSDragToMoveOrCopyGestureRecognizerIface(data.dragGestureRecognizer()) : null,
    selectionGestureRecognizer: data.selectionGestureRecognizer ? convMSDragToSelectGestureRecognizerIface(data.selectionGestureRecognizer()) : null,
    duplicatedObjectID: data.duplicatedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    duplicateOffset: data.duplicateOffset ? convCGSizeStruct(data.duplicateOffset()) : null,
    opacityShortcutRecognizer: data.opacityShortcutRecognizer ? convMSOpacityKeyboardShortcutRecognizerIface(data.opacityShortcutRecognizer()) : null,
    nextModifierKeyChangeShouldRefreshView: data.nextModifierKeyChangeShouldRefreshView ? !!data.nextModifierKeyChangeShouldRefreshView() : null,
    eventData: data.eventData ? convMSNormalEventDataIface(data.eventData()) : null,
    menuBuilder: data.menuBuilder ? convMSNormalEventContextualMenuBuilderIface(data.menuBuilder()) : null,
    highlightedLayer: data.highlightedLayer ? convMSLayerIface(data.highlightedLayer()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // activeGestureRecognizers: data.activeGestureRecognizers ? convertArray(data.activeGestureRecognizers()) : null,
    // selectionRect: data.selectionRect ? convCGRectStruct(data.selectionRect()) : null,
    // mouseTracker: data.mouseTracker ? convMSMouseTrackerIface(data.mouseTracker()) : null,
    // selectionTouchBar: data.selectionTouchBar ? null/* NSTouchBar */ : null,
    // noSelectionTouchBar: data.noSelectionTouchBar ? null/* NSTouchBar */ : null,
    // viewCoordinateMouse: data.viewCoordinateMouse ? convCGPointStruct(data.viewCoordinateMouse()) : null,
    // pressedKeys: data.pressedKeys ? data.pressedKeys() + '' : null,
    // offsetTracker: data.offsetTracker ? convMSDuplicateOffsetTrackerIface(data.offsetTracker()) : null,
    // delegate: data.delegate ? null/* MSBasicDelegate */ : null,
    // manager: data.manager ? convMSEventHandlerManagerIface(data.manager()) : null,
    // inspectorViewController: data.inspectorViewController ? null/* NSViewController<MSInspectorChildController> */ : null,
    // applicableActionItemIdentifier: data.applicableActionItemIdentifier ? data.applicableActionItemIdentifier() + '' : null,
    // shouldExitOnContentViewResize: data.shouldExitOnContentViewResize ? !!data.shouldExitOnContentViewResize() : null,
    // handlesHistoryCoalescing: data.handlesHistoryCoalescing ? !!data.handlesHistoryCoalescing() : null,
    // gestureRecognizers: data.gestureRecognizers ? convertArray(data.gestureRecognizers()) : null,
    // scrollOrigin: data.scrollOrigin ? convCGPointStruct(data.scrollOrigin()) : null,
    // supportsTouchBar: data.supportsTouchBar ? !!data.supportsTouchBar() : null,
  }
  return {$ref: idx}
}

function convMSDragToMoveOrCopyGestureRecognizerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSDragToMoveOrCopyGestureRecognizer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSDragToMoveOrCopyGestureRecognizer",
    alignmentDistance: data.alignmentDistance ? +data.alignmentDistance() : null,
    copiedItems: data.copiedItems ? convertArray(data.copiedItems()) : null,
    originalDragPositions: data.originalDragPositions ? convertArray(data.originalDragPositions()) : null,
    originalDraggedItems: data.originalDraggedItems ? convertArray(data.originalDraggedItems()) : null,
    draggedItem: data.draggedItem ? null/*id*/ : null,
    alignmentAxis: data.alignmentAxis ? +data.alignmentAxis() : null,
    alignMask: data.alignMask ? +data.alignMask() : null,
    align: data.align ? !!data.align() : null,
    shouldSnap: data.shouldSnap ? !!data.shouldSnap() : null,
    shouldCopyDraggedItems: data.shouldCopyDraggedItems ? !!data.shouldCopyDraggedItems() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // modifierFlags: data.modifierFlags ? +data.modifierFlags() : null,
    // translation: data.translation ? convCGPointStruct(data.translation()) : null,
    // beginsUponMouseDown: data.beginsUponMouseDown ? !!data.beginsUponMouseDown() : null,
    // delegate: data.delegate ? null/* MSGestureRecognizerDelegate */ : null,
    // state: data.state ? +data.state() : null,
    // action: data.action ? null/* SEL */ : null,
    // target: data.target ? null/*id*/ : null,
  }
  return {$ref: idx}
}

function convMSDragToSelectGestureRecognizerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSDragToSelectGestureRecognizer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSDragToSelectGestureRecognizer",
    initialSelection: data.initialSelection ? convertArray(data.initialSelection()) : null,
    extendSelection: data.extendSelection ? !!data.extendSelection() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // modifierFlags: data.modifierFlags ? +data.modifierFlags() : null,
    // translation: data.translation ? convCGPointStruct(data.translation()) : null,
    // beginsUponMouseDown: data.beginsUponMouseDown ? !!data.beginsUponMouseDown() : null,
    // delegate: data.delegate ? null/* MSGestureRecognizerDelegate */ : null,
    // state: data.state ? +data.state() : null,
    // action: data.action ? null/* SEL */ : null,
    // target: data.target ? null/*id*/ : null,
  }
  return {$ref: idx}
}

function convMSOpacityKeyboardShortcutRecognizerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSOpacityKeyboardShortcutRecognizer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSOpacityKeyboardShortcutRecognizer",
    opacity: data.opacity ? +data.opacity() : null,
    concatenationDuration: data.concatenationDuration ? +data.concatenationDuration() : null,
    action: data.action ? null/* SEL */ : null,
    target: data.target ? null/*id*/ : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSNormalEventDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSNormalEventData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSNormalEventData",
    snapperData: data.snapperData ? convMSSnapperDataIface(data.snapperData()) : null,
    dragMode: data.dragMode ? +data.dragMode() : null,
    resizingHandle: data.resizingHandle ? +data.resizingHandle() : null,
    resizingLayer: data.resizingLayer ? convMSLayerIface(data.resizingLayer()) : null,
    originalScrollOrigin: data.originalScrollOrigin ? convCGPointStruct(data.originalScrollOrigin()) : null,
    midPoint: data.midPoint ? convCGPointStruct(data.midPoint()) : null,
    mouseDown: data.mouseDown ? convCGPointStruct(data.mouseDown()) : null,
    didMouseDown: data.didMouseDown ? !!data.didMouseDown() : null,
    hasMultipleTouches: data.hasMultipleTouches ? !!data.hasMultipleTouches() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSSnapperDataIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSnapperData')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSnapperData",
    lines: data.lines ? convNSMutableDictionaryIface(data.lines()) : null,
    distanceItems: data.distanceItems ? convNSMutableDictionaryIface(data.distanceItems()) : null,
    sizeItems: data.sizeItems ? convNSMutableDictionaryIface(data.sizeItems()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSMutableDictionaryIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSMutableDictionary')
  if (!data) return null
  converteds[idx] = {
    $type: "NSMutableDictionary",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSNormalEventContextualMenuBuilderIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSNormalEventContextualMenuBuilder')
  if (!data) return null
  converteds[idx] = {
    $type: "MSNormalEventContextualMenuBuilder",
    sliceMenu: data.sliceMenu ? convNSMenuIface(data.sliceMenu()) : null,
    artboardMenu: data.artboardMenu ? convNSMenuIface(data.artboardMenu()) : null,
    symbolInstanceMenu: data.symbolInstanceMenu ? convNSMenuIface(data.symbolInstanceMenu()) : null,
    imageLayerMenu: data.imageLayerMenu ? convNSMenuIface(data.imageLayerMenu()) : null,
    noSelectionMenu: data.noSelectionMenu ? convNSMenuIface(data.noSelectionMenu()) : null,
    multipleSelectionMenu: data.multipleSelectionMenu ? convNSMenuIface(data.multipleSelectionMenu()) : null,
    groupLayerMenu: data.groupLayerMenu ? convNSMenuIface(data.groupLayerMenu()) : null,
    textLayerMenu: data.textLayerMenu ? convNSMenuIface(data.textLayerMenu()) : null,
    standardLayerMenu: data.standardLayerMenu ? convNSMenuIface(data.standardLayerMenu()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSLayerArrayIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSLayerArray')
  if (!data) return null
  converteds[idx] = {
    $type: "MSLayerArray",
    layers: data.layers ? convertArray(data.layers()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSBackButtonWindowControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSBackButtonWindowController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSBackButtonWindowController",
    artboard: data.artboard ? convMSArtboardGroupIface(data.artboard()) : null,
    attachedView: data.attachedView ? convNSViewIface(data.attachedView()) : null,
    doc: data.doc ? convMSDocumentIface(data.doc()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSTimerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSTimer')
  if (!data) return null
  converteds[idx] = {
    $type: "NSTimer",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSMutableSetIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSMutableSet')
  if (!data) return null
  converteds[idx] = {
    $type: "NSMutableSet",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCSideBarViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCSideBarViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "BCSideBarViewController",
    userUpdatedPageHeight: data.userUpdatedPageHeight ? !!data.userUpdatedPageHeight() : null,
    splitView: data.splitView ? null/* NSSplitView */ : null,
    filterSlicesButton: data.filterSlicesButton ? null/* NSButton */ : null,
    togglePageListButton: data.togglePageListButton ? null/* NSButton */ : null,
    filterStringTextField: data.filterStringTextField ? null/* NSSearchField */ : null,
    layerListViewController: data.layerListViewController ? convBCOutlineViewControllerIface(data.layerListViewController()) : null,
    layerListContainer: data.layerListContainer ? convNSViewIface(data.layerListContainer()) : null,
    layerListDataController: data.layerListDataController ? convBCOutlineViewDataControllerIface(data.layerListDataController()) : null,
    pagePopup: data.pagePopup ? null/* NSPopUpButton */ : null,
    currentPageLabel: data.currentPageLabel ? convNSTextFieldIface(data.currentPageLabel()) : null,
    pageCount: data.pageCount ? +data.pageCount() : null,
    pageListContainer: data.pageListContainer ? convNSViewIface(data.pageListContainer()) : null,
    pageListViewController: data.pageListViewController ? convBCPageListViewControllerIface(data.pageListViewController()) : null,
    pageCreationView: data.pageCreationView ? convNSViewIface(data.pageCreationView()) : null,
    pageListDataController: data.pageListDataController ? convBCOutlineViewDataControllerIface(data.pageListDataController()) : null,
    filter: data.filter ? convBCFilterInfoIface(data.filter()) : null,
    sliceCount: data.sliceCount ? +data.sliceCount() : null,
    delegate: data.delegate ? null/* NSObject<BCSideBarViewControllerDelegate> */ : null,
    isPageListCollapsed: data.isPageListCollapsed ? !!data.isPageListCollapsed() : null,
    currentPage: data.currentPage ? null/* BCOutlineViewNode */ : null,
    currentPageHeight: data.currentPageHeight ? +data.currentPageHeight() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCOutlineViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCOutlineViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "BCOutlineViewController",
    refreshMask: data.refreshMask ? +data.refreshMask() : null,
    referencedNodes: data.referencedNodes ? convNSMutableSetIface(data.referencedNodes()) : null,
    menuDisabledTextField: data.menuDisabledTextField ? convNSTextFieldIface(data.menuDisabledTextField()) : null,
    currentlyHoveredNode: data.currentlyHoveredNode ? null/*id*/ : null,
    contextMenuSelection: data.contextMenuSelection ? convertArray(data.contextMenuSelection()) : null,
    draggingInProgress: data.draggingInProgress ? !!data.draggingInProgress() : null,
    ignoreExpansionChangingEvent: data.ignoreExpansionChangingEvent ? convNSEventIface(data.ignoreExpansionChangingEvent()) : null,
    ignoreSelectionChangingEvent: data.ignoreSelectionChangingEvent ? convNSEventIface(data.ignoreSelectionChangingEvent()) : null,
    expansionStateUpdating: data.expansionStateUpdating ? !!data.expansionStateUpdating() : null,
    selectionStateUpdating: data.selectionStateUpdating ? !!data.selectionStateUpdating() : null,
    dataController: data.dataController ? convBCOutlineViewDataControllerIface(data.dataController()) : null,
    outlineView: data.outlineView ? convBCOutlineViewIface(data.outlineView()) : null,
    isLayoutDirty: data.isLayoutDirty ? !!data.isLayoutDirty() : null,
    arePreviewImagesDirty: data.arePreviewImagesDirty ? !!data.arePreviewImagesDirty() : null,
    isExpansionDirty: data.isExpansionDirty ? !!data.isExpansionDirty() : null,
    isSelectionDirty: data.isSelectionDirty ? !!data.isSelectionDirty() : null,
    currentlyHoveredView: data.currentlyHoveredView ? convBCTableCellViewIface(data.currentlyHoveredView()) : null,
    filter: data.filter ? convBCFilterInfoIface(data.filter()) : null,
    selectedItems: data.selectedItems ? convertArray(data.selectedItems()) : null,
    hasSourceListStyle: data.hasSourceListStyle ? !!data.hasSourceListStyle() : null,
    preferredHeight: data.preferredHeight ? +data.preferredHeight() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSTextFieldIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSTextField')
  if (!data) return null
  converteds[idx] = {
    $type: "NSTextField",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSEventIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSEvent')
  if (!data) return null
  converteds[idx] = {
    $type: "NSEvent",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCOutlineViewDataControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCOutlineViewDataController')
  if (!data) return null
  converteds[idx] = {
    $type: "BCOutlineViewDataController",
    dataSource: data.dataSource ? null/* NSObject<BCOutlineViewDataSource> */ : null,
    delegate: data.delegate ? null/* NSObject<BCOutlineViewDelegate> */ : null,
    cachedNodesChildren: data.cachedNodesChildren ? convertArray(data.cachedNodesChildren()) : null,
    cachedNode: data.cachedNode ? null/*id*/ : null,
    filter: data.filter ? convBCFilterInfoIface(data.filter()) : null,
    rootObject: data.rootObject ? null/*id*/ : null,
    canProvideContextMenuItems: data.canProvideContextMenuItems ? !!data.canProvideContextMenuItems() : null,
    dragTypes: data.dragTypes ? convertArray(data.dragTypes()) : null,
    nodeFilterPredicate: data.nodeFilterPredicate ? null/* NSPredicate */ : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCFilterInfoIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCFilterInfo')
  if (!data) return null
  converteds[idx] = {
    $type: "BCFilterInfo",
    filterType: data.filterType ? +data.filterType() : null,
    filterString: data.filterString ? data.filterString() + '' : null,
    filterSlices: data.filterSlices ? !!data.filterSlices() : null,
    filterLayers: data.filterLayers ? !!data.filterLayers() : null,
    hasFilter: data.hasFilter ? !!data.hasFilter() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCOutlineViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCOutlineView')
  if (!data) return null
  converteds[idx] = {
    $type: "BCOutlineView",
    registeredViews: data.registeredViews ? convNSMutableSetIface(data.registeredViews()) : null,
    viewCache: data.viewCache ? convNSMutableDictionaryIface(data.viewCache()) : null,
    disclosureButtonAction: data.disclosureButtonAction ? null/* SEL */ : null,
    discloserTriangleClickedItem: data.discloserTriangleClickedItem ? null/*id*/ : null,
    dataController: data.dataController ? convBCOutlineViewDataControllerIface(data.dataController()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCTableCellViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCTableCellView')
  if (!data) return null
  converteds[idx] = {
    $type: "BCTableCellView",
    isDrawingFocused: data.isDrawingFocused ? !!data.isDrawingFocused() : null,
    currentSelectedState: data.currentSelectedState ? !!data.currentSelectedState() : null,
    badgeTrailingSpaceConstraint: data.badgeTrailingSpaceConstraint ? null/* NSLayoutConstraint */ : null,
    secondaryPreviewView: data.secondaryPreviewView ? convBCCollapsableImageViewIface(data.secondaryPreviewView()) : null,
    previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    previewView: data.previewView ? convBCCollapsableImageViewIface(data.previewView()) : null,
    popupBadgeButton: data.popupBadgeButton ? null/* NSPopUpButton */ : null,
    badgeButton: data.badgeButton ? null/* NSButton */ : null,
    displayState: data.displayState ? +data.displayState() : null,
    delegate: data.delegate ? null/* BCTableCellViewDelegate */ : null,
    destinationWindow: data.destinationWindow ? convNSWindowIface(data.destinationWindow()) : null,
    widthForDragImage: data.widthForDragImage ? +data.widthForDragImage() : null,
    isTextFieldEditing: data.isTextFieldEditing ? !!data.isTextFieldEditing() : null,
    node: data.node ? null/* BCOutlineViewNode */ : null,
    nodeSelected: data.nodeSelected ? !!data.nodeSelected() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCCollapsableImageViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCCollapsableImageView')
  if (!data) return null
  converteds[idx] = {
    $type: "BCCollapsableImageView",
    expandedWidth: data.expandedWidth ? +data.expandedWidth() : null,
    widthConstraint: data.widthConstraint ? null/* NSLayoutConstraint */ : null,
    image: data.image ? convNSImageIface(data.image()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSWindowIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSWindow')
  if (!data) return null
  converteds[idx] = {
    $type: "NSWindow",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCPageListViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCPageListViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "BCPageListViewController",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // refreshMask: data.refreshMask ? +data.refreshMask() : null,
    // referencedNodes: data.referencedNodes ? convNSMutableSetIface(data.referencedNodes()) : null,
    // menuDisabledTextField: data.menuDisabledTextField ? convNSTextFieldIface(data.menuDisabledTextField()) : null,
    // currentlyHoveredNode: data.currentlyHoveredNode ? null/*id*/ : null,
    // contextMenuSelection: data.contextMenuSelection ? convertArray(data.contextMenuSelection()) : null,
    // draggingInProgress: data.draggingInProgress ? !!data.draggingInProgress() : null,
    // ignoreExpansionChangingEvent: data.ignoreExpansionChangingEvent ? convNSEventIface(data.ignoreExpansionChangingEvent()) : null,
    // ignoreSelectionChangingEvent: data.ignoreSelectionChangingEvent ? convNSEventIface(data.ignoreSelectionChangingEvent()) : null,
    // expansionStateUpdating: data.expansionStateUpdating ? !!data.expansionStateUpdating() : null,
    // selectionStateUpdating: data.selectionStateUpdating ? !!data.selectionStateUpdating() : null,
    // dataController: data.dataController ? convBCOutlineViewDataControllerIface(data.dataController()) : null,
    // outlineView: data.outlineView ? convBCOutlineViewIface(data.outlineView()) : null,
    // isLayoutDirty: data.isLayoutDirty ? !!data.isLayoutDirty() : null,
    // arePreviewImagesDirty: data.arePreviewImagesDirty ? !!data.arePreviewImagesDirty() : null,
    // isExpansionDirty: data.isExpansionDirty ? !!data.isExpansionDirty() : null,
    // isSelectionDirty: data.isSelectionDirty ? !!data.isSelectionDirty() : null,
    // currentlyHoveredView: data.currentlyHoveredView ? convBCTableCellViewIface(data.currentlyHoveredView()) : null,
    // filter: data.filter ? convBCFilterInfoIface(data.filter()) : null,
    // selectedItems: data.selectedItems ? convertArray(data.selectedItems()) : null,
    // hasSourceListStyle: data.hasSourceListStyle ? !!data.hasSourceListStyle() : null,
    // preferredHeight: data.preferredHeight ? +data.preferredHeight() : null,
    // debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    // description: data.description ? data.description() + '' : null,
  }
  return {$ref: idx}
}

function convMSFontListIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSFontList')
  if (!data) return null
  converteds[idx] = {
    $type: "MSFontList",
    filterFonts: data.filterFonts ? convertArray(data.filterFonts()) : null,
    allFonts: data.allFonts ? convertArray(data.allFonts()) : null,
    systemFonts: data.systemFonts ? convertArray(data.systemFonts()) : null,
    commonFonts: data.commonFonts ? convertArray(data.commonFonts()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSInspectorControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSInspectorController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSInspectorController",
    oldInspectorLocation: data.oldInspectorLocation ? +data.oldInspectorLocation() : null,
    bottomExporter: data.bottomExporter ? convMSExportInspectorViewControllerIface(data.bottomExporter()) : null,
    artboardInspector: data.artboardInspector ? convMSArtboardInspectorViewControllerIface(data.artboardInspector()) : null,
    slicesInspector: data.slicesInspector ? convMSSliceInspectorViewControllerIface(data.slicesInspector()) : null,
    normalInspector: data.normalInspector ? convMSNormalInspectorIface(data.normalInspector()) : null,
    globalAssets: data.globalAssets ? convMSPersistentAssetCollectionIface(data.globalAssets()) : null,
    document: data.document ? convMSDocumentIface(data.document()) : null,
    currentController: data.currentController ? null/* NSViewController<MSInspectorChildController> */ : null,
    alignmentView: data.alignmentView ? convNSViewIface(data.alignmentView()) : null,
    placeholderView: data.placeholderView ? convNSViewIface(data.placeholderView()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSExportInspectorViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSExportInspectorViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSExportInspectorViewController",
    shareButtonHandler: data.shareButtonHandler ? convMSShareButtonHandlerIface(data.shareButtonHandler()) : null,
    formatViewControllers: data.formatViewControllers ? convertArray(data.formatViewControllers()) : null,
    exportFormatLabelTextField: data.exportFormatLabelTextField ? convNSTextFieldIface(data.exportFormatLabelTextField()) : null,
    exportPresetsMenuButton: data.exportPresetsMenuButton ? null/* NSButton */ : null,
    knifeButton: data.knifeButton ? null/* NSButton */ : null,
    exportButton: data.exportButton ? null/* NSButton */ : null,
    shareButton: data.shareButton ? null/* NSButton */ : null,
    addExportFormatButton: data.addExportFormatButton ? null/* NSButton */ : null,
    bigExportLabel: data.bigExportLabel ? convNSViewIface(data.bigExportLabel()) : null,
    separatorView2: data.separatorView2 ? convNSViewIface(data.separatorView2()) : null,
    separatorView: data.separatorView ? convNSViewIface(data.separatorView()) : null,
    exportButtonView: data.exportButtonView ? convNSViewIface(data.exportButtonView()) : null,
    bottomLabelView: data.bottomLabelView ? convNSViewIface(data.bottomLabelView()) : null,
    topFillerView: data.topFillerView ? convNSViewIface(data.topFillerView()) : null,
    layers: data.layers ? convertArray(data.layers()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // popover: data.popover ? convBCPopoverIface(data.popover()) : null,
    // colorPickerButton: data.colorPickerButton ? convMSColorPreviewButtonIface(data.colorPickerButton()) : null,
    // index: data.index ? +data.index() : null,
    // delegate: data.delegate ? null/* MSStylePartInspectorDelegate */ : null,
    // arrayController: data.arrayController ? null/* NSArrayController */ : null,
    // styleParts: data.styleParts ? convertArray(data.styleParts()) : null,
    // debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    // description: data.description ? data.description() + '' : null,
  }
  return {$ref: idx}
}

function convMSShareButtonHandlerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSShareButtonHandler')
  if (!data) return null
  converteds[idx] = {
    $type: "MSShareButtonHandler",
    canvas: data.canvas ? convMSContentDrawViewIface(data.canvas()) : null,
    sliceLayer: data.sliceLayer ? convMSLayerIface(data.sliceLayer()) : null,
    window: data.window ? convNSWindowIface(data.window()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCPopoverIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCPopover')
  if (!data) return null
  converteds[idx] = {
    $type: "BCPopover",
    preferredEdge: data.preferredEdge ? +data.preferredEdge() : null,
    attachedToView: data.attachedToView ? convNSViewIface(data.attachedToView()) : null,
    layerDependency: data.layerDependency ? +data.layerDependency() : null,
    screenEdgeBehaviour: data.screenEdgeBehaviour ? +data.screenEdgeBehaviour() : null,
    window: data.window ? convBCPopoverWindowIface(data.window()) : null,
    delegate: data.delegate ? null/* BCPopoverDelegate */ : null,
    contentViewController: data.contentViewController ? convNSViewControllerIface(data.contentViewController()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convBCPopoverWindowIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting BCPopoverWindow')
  if (!data) return null
  converteds[idx] = {
    $type: "BCPopoverWindow",
    arrowPosition: data.arrowPosition ? +data.arrowPosition() : null,
    arrowEdge: data.arrowEdge ? +data.arrowEdge() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "NSViewController",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSColorPreviewButtonIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSColorPreviewButton')
  if (!data) return null
  converteds[idx] = {
    $type: "MSColorPreviewButton",
    dragOwner: data.dragOwner ? null/*id*/ : null,
    color: data.color ? convNSColorIface(data.color()) : null,
    basicFill: data.basicFill ? convMSStyleBasicFillIface(data.basicFill()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSStyleBasicFillIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSStyleBasicFill')
  if (!data) return null
  converteds[idx] = {
    $type: "MSStyleBasicFill",
    colorGeneric: data.colorGeneric ? convMSColorIface(data.colorGeneric()) : null,
    contextSettingsGeneric: data.contextSettingsGeneric ? convMSGraphicsContextSettingsIface(data.contextSettingsGeneric()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    fillType: data.fillType ? +data.fillType() : null,
    gradientGeneric: data.gradientGeneric ? convMSGradientIface(data.gradientGeneric()) : null,
    isEnabled: data.isEnabled ? !!data.isEnabled() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // gradient: data.gradient ? convMSGradientIface(data.gradient()) : null,
    // contextSettings: data.contextSettings ? convMSGraphicsContextSettingsIface(data.contextSettings()) : null,
    // color: data.color ? convMSColorIface(data.color()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSArtboardInspectorViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSArtboardInspectorViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSArtboardInspectorViewController",
    popover: data.popover ? convBCPopoverIface(data.popover()) : null,
    bottomLabelView: data.bottomLabelView ? convNSViewIface(data.bottomLabelView()) : null,
    artboardBackgroundColorButton: data.artboardBackgroundColorButton ? convMSColorPreviewButtonIface(data.artboardBackgroundColorButton()) : null,
    symbolStandardPropertiesView: data.symbolStandardPropertiesView ? convNSViewIface(data.symbolStandardPropertiesView()) : null,
    artboardBackgroundView: data.artboardBackgroundView ? convNSViewIface(data.artboardBackgroundView()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // sliceViewContainerView: data.sliceViewContainerView ? convMSFlippedViewIface(data.sliceViewContainerView()) : null,
    // sliceViewPool: data.sliceViewPool ? convNSMutableSetIface(data.sliceViewPool()) : null,
    // sliceViews: data.sliceViews ? convNSMutableArrayIface(data.sliceViews()) : null,
    // refreshTimer: data.refreshTimer ? convNSTimerIface(data.refreshTimer()) : null,
    // layers: data.layers ? convertArray(data.layers()) : null,
    // stackView: data.stackView ? convMSInspectorStackViewIface(data.stackView()) : null,
  }
  return {$ref: idx}
}

function convMSFlippedViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSFlippedView')
  if (!data) return null
  converteds[idx] = {
    $type: "MSFlippedView",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSInspectorStackViewIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSInspectorStackView')
  if (!data) return null
  converteds[idx] = {
    $type: "MSInspectorStackView",
    sectionViewControllers: data.sectionViewControllers ? convertArray(data.sectionViewControllers()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSSliceInspectorViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSliceInspectorViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSliceInspectorViewController",
    popover: data.popover ? convBCPopoverIface(data.popover()) : null,
    sliceBackgroundColorButton: data.sliceBackgroundColorButton ? convMSColorPreviewButtonIface(data.sliceBackgroundColorButton()) : null,
    groupContentsOnlyButton: data.groupContentsOnlyButton ? null/* NSButton */ : null,
    sliceBackgroundView: data.sliceBackgroundView ? convNSViewIface(data.sliceBackgroundView()) : null,
    standardPropertiesView: data.standardPropertiesView ? convNSViewIface(data.standardPropertiesView()) : null,
    sliceExportPropertiesView: data.sliceExportPropertiesView ? convNSViewIface(data.sliceExportPropertiesView()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // sliceViewContainerView: data.sliceViewContainerView ? convMSFlippedViewIface(data.sliceViewContainerView()) : null,
    // sliceViewPool: data.sliceViewPool ? convNSMutableSetIface(data.sliceViewPool()) : null,
    // sliceViews: data.sliceViews ? convNSMutableArrayIface(data.sliceViews()) : null,
    // refreshTimer: data.refreshTimer ? convNSTimerIface(data.refreshTimer()) : null,
    // layers: data.layers ? convertArray(data.layers()) : null,
    // stackView: data.stackView ? convMSInspectorStackViewIface(data.stackView()) : null,
  }
  return {$ref: idx}
}

function convMSNormalInspectorIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSNormalInspector')
  if (!data) return null
  converteds[idx] = {
    $type: "MSNormalInspector",
    scrollView: data.scrollView ? null/* NSScrollView */ : null,
    eventHandler: data.eventHandler ? convMSEventHandlerIface(data.eventHandler()) : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    stackView: data.stackView ? convMSInspectorStackViewIface(data.stackView()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSPersistentAssetCollectionIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSPersistentAssetCollection')
  if (!data) return null
  converteds[idx] = {
    $type: "MSPersistentAssetCollection",
    archive: data.archive ? convMSVersionedArchiveIface(data.archive()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // colors: data.colors ? convertArray(data.colors()) : null,
    // debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    // description: data.description ? data.description() + '' : null,
    // exportPresets: data.exportPresets ? convertArray(data.exportPresets()) : null,
    // gradients: data.gradients ? convertArray(data.gradients()) : null,
    // imageCollectionGeneric: data.imageCollectionGeneric ? convMSImageCollectionIface(data.imageCollectionGeneric()) : null,
    // images: data.images ? convertArray(data.images()) : null,
    // imageCollection: data.imageCollection ? convMSImageCollectionIface(data.imageCollection()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSVersionedArchiveIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSVersionedArchive')
  if (!data) return null
  converteds[idx] = {
    $type: "MSVersionedArchive",
    alternateFolder: data.alternateFolder ? data.alternateFolder() + '' : null,
    version: data.version ? +data.version() : null,
    data: data.data ? convNSDataIface(data.data()) : null,
    baseURL: data.baseURL ? convNSURLIface(data.baseURL()) : null,
    url: data.url ? convNSURLIface(data.url()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convNSURLIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSURL')
  if (!data) return null
  converteds[idx] = {
    $type: "NSURL",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSHistoryMakerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSHistoryMaker')
  if (!data) return null
  converteds[idx] = {
    $type: "MSHistoryMaker",
    disableMakingHistoryCounter: data.disableMakingHistoryCounter ? +data.disableMakingHistoryCounter() : null,
    isMakingHistory: data.isMakingHistory ? !!data.isMakingHistory() : null,
    isMovingThroughHistory: data.isMovingThroughHistory ? !!data.isMovingThroughHistory() : null,
    historyIsCoalescing: data.historyIsCoalescing ? !!data.historyIsCoalescing() : null,
    historyMomentTitle: data.historyMomentTitle ? data.historyMomentTitle() + '' : null,
    history: data.history ? convMSHistoryIface(data.history()) : null,
    document: data.document ? convMSDocumentIface(data.document()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSHistoryIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSHistory')
  if (!data) return null
  converteds[idx] = {
    $type: "MSHistory",
    indexOfCurrentMoment: data.indexOfCurrentMoment ? +data.indexOfCurrentMoment() : null,
    moments: data.moments ? convNSMutableArrayIface(data.moments()) : null,
    allowsCoalescingOfMomentsCloseInTime: data.allowsCoalescingOfMomentsCloseInTime ? !!data.allowsCoalescingOfMomentsCloseInTime() : null,
    numberOfMoments: data.numberOfMoments ? +data.numberOfMoments() : null,
    canProgressToNextMoment: data.canProgressToNextMoment ? !!data.canProgressToNextMoment() : null,
    canRevertToPreviousMoment: data.canRevertToPreviousMoment ? !!data.canRevertToPreviousMoment() : null,
    nextMoment: data.nextMoment ? convMSMomentIface(data.nextMoment()) : null,
    previousMoment: data.previousMoment ? convMSMomentIface(data.previousMoment()) : null,
    currentMoment: data.currentMoment ? convMSMomentIface(data.currentMoment()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSMomentIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSMoment')
  if (!data) return null
  converteds[idx] = {
    $type: "MSMoment",
    adaptability: data.adaptability ? +data.adaptability() : null,
    document: data.document ? convMSImmutableDocumentDataIface(data.document()) : null,
    title: data.title ? data.title() + '' : null,
    timestamp: data.timestamp ? +data.timestamp() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSActionControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSActionController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSActionController",
    observers: data.observers ? convNSMutableSetIface(data.observers()) : null,
    actionsByIdentifier: data.actionsByIdentifier ? convNSMutableDictionaryIface(data.actionsByIdentifier()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSToolbarConstructorIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSToolbarConstructor')
  if (!data) return null
  converteds[idx] = {
    $type: "MSToolbarConstructor",
    doc: data.doc ? convMSDocumentIface(data.doc()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSMainSplitViewControllerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSMainSplitViewController')
  if (!data) return null
  converteds[idx] = {
    $type: "MSMainSplitViewController",
    window: data.window ? convNSWindowIface(data.window()) : null,
    splitView: data.splitView ? null/* NSSplitView */ : null,
    inspectorView: data.inspectorView ? convNSViewIface(data.inspectorView()) : null,
    canvasView: data.canvasView ? convNSViewIface(data.canvasView()) : null,
    layerListView: data.layerListView ? convNSViewIface(data.layerListView()) : null,
    layerListWidth: data.layerListWidth ? +data.layerListWidth() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSShapeGroupIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSShapeGroup')
  if (!data) return null
  converteds[idx] = {
    $type: "MSShapeGroup",
    isPartOfClippingMask: data.isPartOfClippingMask ? !!data.isPartOfClippingMask() : null,
    isClosed: data.isClosed ? !!data.isClosed() : null,
    bezierPath: data.bezierPath ? convNSBezierPathIface(data.bezierPath()) : null,
    hasDecorations: data.hasDecorations ? !!data.hasDecorations() : null,
    decoratedBezierPathInBounds: data.decoratedBezierPathInBounds ? convNSBezierPathIface(data.decoratedBezierPathInBounds()) : null,
    bezierPathInBounds: data.bezierPathInBounds ? convNSBezierPathIface(data.bezierPathInBounds()) : null,
    pathInBounds: data.pathInBounds ? convMSPathIface(data.pathInBounds()) : null,
    bezierPathWithTransforms: data.bezierPathWithTransforms ? convNSBezierPathIface(data.bezierPathWithTransforms()) : null,
    length: data.length ? +data.length() : null,
    y2: data.y2 ? +data.y2() : null,
    x2: data.x2 ? +data.x2() : null,
    y1: data.y1 ? +data.y1() : null,
    x1: data.x1 ? +data.x1() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    clippingMaskMode: data.clippingMaskMode ? +data.clippingMaskMode() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    hasClippingMask: data.hasClippingMask ? !!data.hasClippingMask() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    windingRule: data.windingRule ? +data.windingRule() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // preCalculatedHasSelectedLayer: data.preCalculatedHasSelectedLayer ? +data.preCalculatedHasSelectedLayer() : null,
    // lightweightContainsSelectedItem: data.lightweightContainsSelectedItem ? !!data.lightweightContainsSelectedItem() : null,
    // isOpen: data.isOpen ? !!data.isOpen() : null,
    // hasLayerWithMaskMode: data.hasLayerWithMaskMode ? +data.hasLayerWithMaskMode() : null,
    // enableAutomaticScaling: data.enableAutomaticScaling ? !!data.enableAutomaticScaling() : null,
    // style: data.style ? convMSStyleIface(data.style()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convNSBezierPathIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSBezierPath')
  if (!data) return null
  converteds[idx] = {
    $type: "NSBezierPath",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSPathIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSPath')
  if (!data) return null
  converteds[idx] = {
    $type: "MSPath",
    signedElementCount: data.signedElementCount ? +data.signedElementCount() : null,
    CGPath: data.CGPath ? null/* CGPath */ : null,
    elementCount: data.elementCount ? +data.elementCount() : null,
    isEmpty: data.isEmpty ? !!data.isEmpty() : null,
    controlPointBounds: data.controlPointBounds ? convCGRectStruct(data.controlPointBounds()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    safeBounds: data.safeBounds ? convCGRectStruct(data.safeBounds()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSTextLayerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSTextLayer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSTextLayer",
    editingDelegate: data.editingDelegate ? null/* MSTextLayerEditingDelegate */ : null,
    defaultLineHeightValue: data.defaultLineHeightValue ? +data.defaultLineHeightValue() : null,
    isEditingText: data.isEditingText ? !!data.isEditingText() : null,
    previousRectCache: data.previousRectCache ? convCGRectStruct(data.previousRectCache()) : null,
    stringValue: data.stringValue ? data.stringValue() + '' : null,
    attributedStringValue: data.attributedStringValue ? convNSAttributedStringIface(data.attributedStringValue()) : null,
    styleAttributes: data.styleAttributes ? convertDictionary(data.styleAttributes()) : null,
    textColor: data.textColor ? convMSColorIface(data.textColor()) : null,
    lineHeight: data.lineHeight ? +data.lineHeight() : null,
    characterSpacing: data.characterSpacing ? +data.characterSpacing() : null,
    fontPostscriptName: data.fontPostscriptName ? data.fontPostscriptName() + '' : null,
    fontSize: data.fontSize ? +data.fontSize() : null,
    textAlignment: data.textAlignment ? +data.textAlignment() : null,
    bezierPath: data.bezierPath ? convNSBezierPathIface(data.bezierPath()) : null,
    font: data.font ? convNSFontIface(data.font()) : null,
    firstBaselineOffset: data.firstBaselineOffset ? +data.firstBaselineOffset() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    attributedString: data.attributedString ? convMSAttributedStringIface(data.attributedString()) : null,
    automaticallyDrawOnUnderlyingPath: data.automaticallyDrawOnUnderlyingPath ? !!data.automaticallyDrawOnUnderlyingPath() : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    dontSynchroniseWithSymbol: data.dontSynchroniseWithSymbol ? !!data.dontSynchroniseWithSymbol() : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    glyphBounds: data.glyphBounds ? convCGRectStruct(data.glyphBounds()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    heightIsClipped: data.heightIsClipped ? !!data.heightIsClipped() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    lineSpacingBehaviour: data.lineSpacingBehaviour ? +data.lineSpacingBehaviour() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    preview: data.preview ? convMSImageDataIface(data.preview()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    textBehaviour: data.textBehaviour ? +data.textBehaviour() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // style: data.style ? convMSStyleIface(data.style()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convNSAttributedStringIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting NSAttributedString')
  if (!data) return null
  converteds[idx] = {
    $type: "NSAttributedString",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSAttributedStringIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSAttributedString')
  if (!data) return null
  converteds[idx] = {
    $type: "MSAttributedString",
    transformedAttributedString: data.transformedAttributedString ? convNSAttributedStringIface(data.transformedAttributedString()) : null,
    encodedAttributedString: data.encodedAttributedString ? convNSAttributedStringIface(data.encodedAttributedString()) : null,
    attributedString: data.attributedString ? convNSAttributedStringIface(data.attributedString()) : null,
    areRequiredFontsAvailable: data.areRequiredFontsAvailable ? !!data.areRequiredFontsAvailable() : null,
    unavailableFontNames: data.unavailableFontNames ? convNSSetIface(data.unavailableFontNames()) : null,
    fontNames: data.fontNames ? convNSSetIface(data.fontNames()) : null,
    string: data.string ? data.string() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSOvalShapeIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSOvalShape')
  if (!data) return null
  converteds[idx] = {
    $type: "MSOvalShape",
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    booleanOperation: data.booleanOperation ? +data.booleanOperation() : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    edited: data.edited ? !!data.edited() : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    pathGeneric: data.pathGeneric ? convMSShapePathIface(data.pathGeneric()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // isEditing: data.isEditing ? !!data.isEditing() : null,
    // isClosed: data.isClosed ? !!data.isClosed() : null,
    // bezierPath: data.bezierPath ? convNSBezierPathIface(data.bezierPath()) : null,
    // path: data.path ? convMSShapePathIface(data.path()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSShapePathIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSShapePath')
  if (!data) return null
  converteds[idx] = {
    $type: "MSShapePath",
    description: data.description ? data.description() + '' : null,
    numberOfPoints: data.numberOfPoints ? +data.numberOfPoints() : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    isClosed: data.isClosed ? !!data.isClosed() : null,
    points: data.points ? convertArray(data.points()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSRectangleShapeIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSRectangleShape')
  if (!data) return null
  converteds[idx] = {
    $type: "MSRectangleShape",
    cornerRadiusString: data.cornerRadiusString ? data.cornerRadiusString() + '' : null,
    cornerRadiusFloat: data.cornerRadiusFloat ? +data.cornerRadiusFloat() : null,
    normalizedExponentialCornerRadius: data.normalizedExponentialCornerRadius ? +data.normalizedExponentialCornerRadius() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    booleanOperation: data.booleanOperation ? +data.booleanOperation() : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    edited: data.edited ? !!data.edited() : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    fixedRadius: data.fixedRadius ? +data.fixedRadius() : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    hasConvertedToNewRoundCorners: data.hasConvertedToNewRoundCorners ? !!data.hasConvertedToNewRoundCorners() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    pathGeneric: data.pathGeneric ? convMSShapePathIface(data.pathGeneric()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // isEditing: data.isEditing ? !!data.isEditing() : null,
    // isClosed: data.isClosed ? !!data.isClosed() : null,
    // bezierPath: data.bezierPath ? convNSBezierPathIface(data.bezierPath()) : null,
    // path: data.path ? convMSShapePathIface(data.path()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSShapePathLayerIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSShapePathLayer')
  if (!data) return null
  converteds[idx] = {
    $type: "MSShapePathLayer",
    isEditing: data.isEditing ? !!data.isEditing() : null,
    isClosed: data.isClosed ? !!data.isClosed() : null,
    bezierPath: data.bezierPath ? convNSBezierPathIface(data.bezierPath()) : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    booleanOperation: data.booleanOperation ? +data.booleanOperation() : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    edited: data.edited ? !!data.edited() : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    pathGeneric: data.pathGeneric ? convMSShapePathIface(data.pathGeneric()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // path: data.path ? convMSShapePathIface(data.path()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSCurvePointIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSCurvePoint')
  if (!data) return null
  converteds[idx] = {
    $type: "MSCurvePoint",
    description: data.description ? data.description() + '' : null,
    cornerRadius: data.cornerRadius ? +data.cornerRadius() : null,
    curveFrom: data.curveFrom ? convCGPointStruct(data.curveFrom()) : null,
    curveMode: data.curveMode ? +data.curveMode() : null,
    curveTo: data.curveTo ? convCGPointStruct(data.curveTo()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    hasCurveFrom: data.hasCurveFrom ? !!data.hasCurveFrom() : null,
    hasCurveTo: data.hasCurveTo ? !!data.hasCurveTo() : null,
    point: data.point ? convCGPointStruct(data.point()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSLayerGroupIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSLayerGroup')
  if (!data) return null
  converteds[idx] = {
    $type: "MSLayerGroup",
    preCalculatedHasSelectedLayer: data.preCalculatedHasSelectedLayer ? +data.preCalculatedHasSelectedLayer() : null,
    lightweightContainsSelectedItem: data.lightweightContainsSelectedItem ? !!data.lightweightContainsSelectedItem() : null,
    isOpen: data.isOpen ? !!data.isOpen() : null,
    hasLayerWithMaskMode: data.hasLayerWithMaskMode ? +data.hasLayerWithMaskMode() : null,
    enableAutomaticScaling: data.enableAutomaticScaling ? !!data.enableAutomaticScaling() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // style: data.style ? convMSStyleIface(data.style()) : null,
    // absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    // isHovering: data.isHovering ? !!data.isHovering() : null,
    // center: data.center ? convCGPointStruct(data.center()) : null,
    // transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    // absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    // isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    // proportions: data.proportions ? +data.proportions() : null,
    // constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    // styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    // userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    // isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    // hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    // selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    // expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    // nodeName: data.nodeName ? data.nodeName() + '' : null,
    // selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    // badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    // previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    // badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    // hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    // isActive: data.isActive ? !!data.isActive() : null,
    // filterType: data.filterType ? +data.filterType() : null,
    // displayType: data.displayType ? +data.displayType() : null,
    // frame: data.frame ? convMSRectIface(data.frame()) : null,
    // exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    // documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    // isFault: data.isFault ? !!data.isFault() : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSSymbolInstanceIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSymbolInstance')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSymbolInstance",
    // masterRefreshCounter: data.masterRefreshCounter ? +data.masterRefreshCounter() : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    nodeName: data.nodeName ? data.nodeName() + '' : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // verticalSpacing: data.verticalSpacing ? +data.verticalSpacing() : null,
    symbolID: data.symbolID ? data.symbolID() + '' : null,
    // overrides: data.overrides ? convertDictionary(data.overrides()) : null,
    /*
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    masterInfluenceEdgeMinYPadding: data.masterInfluenceEdgeMinYPadding ? +data.masterInfluenceEdgeMinYPadding() : null,
    masterInfluenceEdgeMinXPadding: data.masterInfluenceEdgeMinXPadding ? +data.masterInfluenceEdgeMinXPadding() : null,
    masterInfluenceEdgeMaxYPadding: data.masterInfluenceEdgeMaxYPadding ? +data.masterInfluenceEdgeMaxYPadding() : null,
    masterInfluenceEdgeMaxXPadding: data.masterInfluenceEdgeMaxXPadding ? +data.masterInfluenceEdgeMaxXPadding() : null,
    horizontalSpacing: data.horizontalSpacing ? +data.horizontalSpacing() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    style: data.style ? convMSStyleIface(data.style()) : null,
    absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    isHovering: data.isHovering ? !!data.isHovering() : null,
    center: data.center ? convCGPointStruct(data.center()) : null,
    transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    proportions: data.proportions ? +data.proportions() : null,
    constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    isActive: data.isActive ? !!data.isActive() : null,
    filterType: data.filterType ? +data.filterType() : null,
    displayType: data.displayType ? +data.displayType() : null,
    frame: data.frame ? convMSRectIface(data.frame()) : null,
    exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    isFault: data.isFault ? !!data.isFault() : null,
    hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
    */
  }
  return {$ref: idx}
}

function convMSSymbolMasterIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSSymbolMaster')
  if (!data) return null
  converteds[idx] = {
    $type: "MSSymbolMaster",

    frame: data.frame ? convMSRectIface(data.frame()) : null,
    isActive: data.isActive ? !!data.isActive() : null,
    rotation: data.rotation ? +data.rotation() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    absolutePosition: data.absolutePosition ? convCGPointStruct(data.absolutePosition()) : null,
    styledLayer: data.styledLayer ? convMSStyledLayerIface(data.styledLayer()) : null,
    nodeName: data.nodeName ? data.nodeName() + '' : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    layout: data.layout ? convMSLayoutGridIface(data.layout()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    symbolID: data.symbolID ? data.symbolID() + '' : null,
    includeBackgroundColorInInstance: data.includeBackgroundColorInInstance ? !!data.includeBackgroundColorInInstance() : null,
    sliceWatcher: data.sliceWatcher ? null/* MSSliceLayerWatcher */ : null,
    /*
    contentBounds: data.contentBounds ? convCGRectStruct(data.contentBounds()) : null,
    rulerBase: data.rulerBase ? convCGPointStruct(data.rulerBase()) : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    backgroundColorGeneric: data.backgroundColorGeneric ? convMSColorIface(data.backgroundColorGeneric()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    grid: data.grid ? convMSSimpleGridIface(data.grid()) : null,
    gridGeneric: data.gridGeneric ? convMSSimpleGridIface(data.gridGeneric()) : null,
    hasBackgroundColor: data.hasBackgroundColor ? !!data.hasBackgroundColor() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    horizontalRulerData: data.horizontalRulerData ? convMSRulerDataIface(data.horizontalRulerData()) : null,
    horizontalRulerDataGeneric: data.horizontalRulerDataGeneric ? convMSRulerDataIface(data.horizontalRulerDataGeneric()) : null,
    includeBackgroundColorInExport: data.includeBackgroundColorInExport ? !!data.includeBackgroundColorInExport() : null,
    includeInCloudUpload: data.includeInCloudUpload ? !!data.includeInCloudUpload() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layoutGeneric: data.layoutGeneric ? convMSLayoutGridIface(data.layoutGeneric()) : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    */
    // sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    /*
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    verticalRulerData: data.verticalRulerData ? convMSRulerDataIface(data.verticalRulerData()) : null,
    verticalRulerDataGeneric: data.verticalRulerDataGeneric ? convMSRulerDataIface(data.verticalRulerDataGeneric()) : null,
    backgroundColor: data.backgroundColor ? convMSColorIface(data.backgroundColor()) : null,
    preCalculatedHasSelectedLayer: data.preCalculatedHasSelectedLayer ? +data.preCalculatedHasSelectedLayer() : null,
    lightweightContainsSelectedItem: data.lightweightContainsSelectedItem ? !!data.lightweightContainsSelectedItem() : null,
    isOpen: data.isOpen ? !!data.isOpen() : null,
    hasLayerWithMaskMode: data.hasLayerWithMaskMode ? +data.hasLayerWithMaskMode() : null,
    enableAutomaticScaling: data.enableAutomaticScaling ? !!data.enableAutomaticScaling() : null,
    style: data.style ? convMSStyleIface(data.style()) : null,
    absoluteRect: data.absoluteRect ? convMSAbsoluteRectIface(data.absoluteRect()) : null,
    isHovering: data.isHovering ? !!data.isHovering() : null,
    center: data.center ? convCGPointStruct(data.center()) : null,
    transformStruct: data.transformStruct ? conv_CHTransformStructStruct(data.transformStruct()) : null,
    isExpanded: data.isExpanded ? !!data.isExpanded() : null,
    proportions: data.proportions ? +data.proportions() : null,
    constrainProportions: data.constrainProportions ? !!data.constrainProportions() : null,
    userVisibleRotation: data.userVisibleRotation ? +data.userVisibleRotation() : null,
    isExportableViaDragAndDrop: data.isExportableViaDragAndDrop ? !!data.isExportableViaDragAndDrop() : null,
    hasSliceIcon: data.hasSliceIcon ? !!data.hasSliceIcon() : null,
    selectedInLayerList: data.selectedInLayerList ? !!data.selectedInLayerList() : null,
    expandableInLayerList: data.expandableInLayerList ? !!data.expandableInLayerList() : null,
    selectedBadgeMenuItem: data.selectedBadgeMenuItem ? +data.selectedBadgeMenuItem() : null,
    badgeMenu: data.badgeMenu ? convNSMenuIface(data.badgeMenu()) : null,
    previewImages: data.previewImages ? convertDictionary(data.previewImages()) : null,
    badgeMap: data.badgeMap ? convertDictionary(data.badgeMap()) : null,
    hasHighlight: data.hasHighlight ? !!data.hasHighlight() : null,
    filterType: data.filterType ? +data.filterType() : null,
    displayType: data.displayType ? +data.displayType() : null,
    exportOptions: data.exportOptions ? convMSExportOptionsIface(data.exportOptions()) : null,
    documentData: data.documentData ? convMSDocumentDataIface(data.documentData()) : null,
    isFault: data.isFault ? !!data.isFault() : null,
    hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
    */
  }
  return {$ref: idx}
}

function convMSImmutableSymbolMasterIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableSymbolMaster')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableSymbolMaster",


    // inherited
    // TODO maybe enable some time? figure out what's crashing
    symbolID: data.symbolID ? data.symbolID() + '' : null,
    includeBackgroundColorInInstance: data.includeBackgroundColorInInstance ? !!data.includeBackgroundColorInInstance() : null,
    unscaledNameSize: data.unscaledNameSize ? convCGSizeStruct(data.unscaledNameSize()) : null,
    contentBounds: data.contentBounds ? convCGRectStruct(data.contentBounds()) : null,
    CGTransformForFrame: data.CGTransformForFrame ? convCGAffineTransformStruct(data.CGTransformForFrame()) : null,
    backgroundColorGeneric: data.backgroundColorGeneric ? convMSColorIface(data.backgroundColorGeneric()) : null,
    bounds: data.bounds ? convCGRectStruct(data.bounds()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    exportOptionsGeneric: data.exportOptionsGeneric ? convMSExportOptionsIface(data.exportOptionsGeneric()) : null,
    frameGeneric: data.frameGeneric ? convMSRectIface(data.frameGeneric()) : null,
    grid: data.grid ? convMSImmutableSimpleGridIface(data.grid()) : null,
    gridGeneric: data.gridGeneric ? convMSSimpleGridIface(data.gridGeneric()) : null,
    hasBackgroundColor: data.hasBackgroundColor ? !!data.hasBackgroundColor() : null,
    hasClickThrough: data.hasClickThrough ? !!data.hasClickThrough() : null,
    hasTransforms: data.hasTransforms ? !!data.hasTransforms() : null,
    horizontalRulerData: data.horizontalRulerData ? convMSImmutableRulerDataIface(data.horizontalRulerData()) : null,
    horizontalRulerDataGeneric: data.horizontalRulerDataGeneric ? convMSRulerDataIface(data.horizontalRulerDataGeneric()) : null,
    includeBackgroundColorInExport: data.includeBackgroundColorInExport ? !!data.includeBackgroundColorInExport() : null,
    includeInCloudUpload: data.includeInCloudUpload ? !!data.includeInCloudUpload() : null,
    isFlippedHorizontal: data.isFlippedHorizontal ? !!data.isFlippedHorizontal() : null,
    isFlippedVertical: data.isFlippedVertical ? !!data.isFlippedVertical() : null,
    isLayerExportable: data.isLayerExportable ? !!data.isLayerExportable() : null,
    isLocked: data.isLocked ? !!data.isLocked() : null,
    isSelected: data.isSelected ? !!data.isSelected() : null,
    isVisible: data.isVisible ? !!data.isVisible() : null,
    layerListExpandedType: data.layerListExpandedType ? +data.layerListExpandedType() : null,
    layers: data.layers ? convertArray(data.layers()) : null,
    layout: data.layout ? convMSImmutableLayoutGridIface(data.layout()) : null,
    layoutGeneric: data.layoutGeneric ? convMSLayoutGridIface(data.layoutGeneric()) : null,
    name: data.name ? data.name() + '' : null,
    nameIsFixed: data.nameIsFixed ? !!data.nameIsFixed() : null,
    origin: data.origin ? convCGPointStruct(data.origin()) : null,
    originalObjectID: data.originalObjectID ? data.originalObjectID() + '' : null,
    rect: data.rect ? convCGRectStruct(data.rect()) : null,
    resizingType: data.resizingType ? +data.resizingType() : null,
    rotation: data.rotation ? +data.rotation() : null,
    sharedObjectID: data.sharedObjectID ? null/* NSObject<NSCopying><NSCoding> */ : null,
    shouldBreakMaskChain: data.shouldBreakMaskChain ? !!data.shouldBreakMaskChain() : null,
    styleGeneric: data.styleGeneric ? convMSStyleIface(data.styleGeneric()) : null,
    verticalRulerData: data.verticalRulerData ? convMSImmutableRulerDataIface(data.verticalRulerData()) : null,
    verticalRulerDataGeneric: data.verticalRulerDataGeneric ? convMSRulerDataIface(data.verticalRulerDataGeneric()) : null,
    backgroundColor: data.backgroundColor ? convMSImmutableColorIface(data.backgroundColor()) : null,
    hasBitmapStylesEnabled: data.hasBitmapStylesEnabled ? !!data.hasBitmapStylesEnabled() : null,
    usedStyle: data.usedStyle ? convMSImmutableStyleIface(data.usedStyle()) : null,
    style: data.style ? convMSImmutableStyleIface(data.style()) : null,
    influenceRectForFrame: data.influenceRectForFrame ? convCGRectStruct(data.influenceRectForFrame()) : null,
    influenceRectForBounds: data.influenceRectForBounds ? convCGRectStruct(data.influenceRectForBounds()) : null,
    traits: data.traits ? +data.traits() : null,
    frameForTransforms: data.frameForTransforms ? convCGRectStruct(data.frameForTransforms()) : null,
    transform: data.transform ? convNSAffineTransformIface(data.transform()) : null,
    center: data.center ? convCGPointStruct(data.center()) : null,
    hasEnabledBackgroundBlur: data.hasEnabledBackgroundBlur ? !!data.hasEnabledBackgroundBlur() : null,
    frame: data.frame ? convMSImmutableRectIface(data.frame()) : null,
    exportOptions: data.exportOptions ? convMSImmutableExportOptionsIface(data.exportOptions()) : null,
    subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSImmutableSharedStyleIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableSharedStyle')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableSharedStyle",
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,
    name: data.name ? data.name() + '' : null,
    valueGeneric: data.valueGeneric ? convMSModelObjectCommonIface(data.valueGeneric()) : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // value: data.value ? convMSImmutableModelObjectIface(data.value()) : null,
    // subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
}

function convMSModelObjectCommonIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSModelObjectCommon')
  if (!data) return null
  converteds[idx] = {
    $type: "MSModelObjectCommon",
    hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
    description: data.description ? data.description() + '' : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    //
  }
  return {$ref: idx}
}

function convMSImmutableModelObjectIface(data) {
  var idx = natives.indexOf(data)
  if (idx !== -1) return {$ref: idx}
  idx = natives.length
  natives.push(data)
  log('converting MSImmutableModelObject')
  if (!data) return null
  converteds[idx] = {
    $type: "MSImmutableModelObject",
    subObjectsForTreeDiff: data.subObjectsForTreeDiff ? convertArray(data.subObjectsForTreeDiff()) : null,
    debugDescription: data.debugDescription ? data.debugDescription() + '' : null,
    description: data.description ? data.description() + '' : null,

    // inherited
    // TODO maybe enable some time? figure out what's crashing
    // hasModelObjectCacheGeneration: data.hasModelObjectCacheGeneration ? !!data.hasModelObjectCacheGeneration() : null,
  }
  return {$ref: idx}
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

var dest = '/Users/jared/khan/skreact/data/dump.js'

var d = context.api().selectedDocument.sketchObject
var dump = JSON.stringify({root: convertGeneric(d), converteds: converteds}, null, 2)
writeFile(dest, 'window.DATA = ' + dump)
log('dumped!')
