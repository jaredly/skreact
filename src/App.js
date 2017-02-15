import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import processDump from './process'

const body = (data, symbols) => {
  switch (data.type) {
    case 'MSSymbolInstance':
      return <Display data={symbols[data.orig.symbolID]}
      inSymbol={true}
        symbols={symbols}
      />
    case 'MSTextLayer':
      return <span>{data.stringValue}</span>
    case 'SVG':
      return <div dangerouslySetInnerHTML={{__html: data.svgSource}} />
  }

}

const Display = ({data, symbols, inSymbol}) => {
  return <div
    style={{
      position: 'absolute',
      ...data.style,
      ...inSymbol ? {display: 'flex'} : null,
    }}
  >
    {data.layers && data.layers.map((item, i) => (
      <Display key={i} data={item} symbols={symbols} inSymbol={inSymbol} />
    ))}
    {body(data, symbols)}
  </div>
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: processDump(window.DATA),
    }    
  }

  recheck() {
    this.setState({data: processDump(window.DATA)})
  }

  render() {
    const {root, symbols} = processDump(window.DATA)
    return <div className={css(styles.container)}>
      <button
        className={css(styles.button)}
        onClick={() => this.recheck()}
      >Reprocess</button>
      <Display data={root} symbols={symbols} />
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignSelf: 'stretch',
  },
  button: {
    cursor: 'pointer',
  }
})
