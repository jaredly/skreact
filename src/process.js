
const cframe = frame => frame && ({
  top: frame.top,
  left: frame.left,
  width: frame.width,
  height: frame.height,
})

const ccolor = color => color && {
  r: color.red,
  g: color.green,
  b: color.blue,
  a: color.alpha,
}

const process = thing => {
  switch (thing.$type) {
    default:
    return {
      type: thing.$type,
      name: thing.name,
      style: {
        position: 'absolute',
        ...cframe(thing.frameGeneric),
        backgroundColor: color2string(ccolor(thing.backgroundColorGeneric)),
        borderRadius: thing.corderRadiusFloat,
      },
      frame: cframe(thing.frameGeneric),
      background: ccolor(thing.backgroundColorGeneric),
      layers: thing.layers && thing.layers.map(process),
      orig: thing,
    }
  }
}

function processDump(pages) {
    console.log('ha')
  const page = pages[0] // TODO process all? or maybe just the current one?
  const artboard = page.artboards[0] // TODO process all
  return process(artboard)
}

export default processDump

const color2string = color => color && `rgba(${color.r*255}, ${color.g*255}, ${color.b*255}, ${color.a})`
