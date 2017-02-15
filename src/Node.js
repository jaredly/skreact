import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

const body = (node, symbols) => {
  switch (node.type) {
    case 'MSSymbolInstance':
      if (!symbols[node.symbolId]) {
        return <div>No symbol found</div>
      }
      return <Node id={symbols[node.symbolId]} />
    case 'MSTextLayer':
      return <span>{node.stringValue}</span>
    case 'SVG':
      // case 'MSSymbolMaster':
      return <div dangerouslySetInnerHTML={{ __html: node.svgSource }} />
  }
}

export default class Node extends Component {
  static contextTypes = {
    data: React.PropTypes.any,
  }

  render() {
    const data = this.context.data
    const node = this.props.id ? data.byId[this.props.id] : data.byName[this.props.name]
    if (!node) return <span>Node not found</span>
    // inSymbol
    return <div
      style={{
        position: 'absolute',
        ...node.style,
        // ...inSymbol ? { display: 'flex' } : null,
      }}
    >
      {node.children && node.children.map(id => (
        <Node key={id} id={id} />
      ))}
      {body(node, data.symbols)}
    </div>
  }
}

const styles = StyleSheet.create({

})