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

const renderTree = (id, byId, domNodes, symbols) => {
  const node = byId[id]
  if (!node) return <span>Node not found</span>
  return <div
    ref={domNode => domNodes[node.id] = domNode}
    key={id}
    style={{
      position: 'absolute',
      ...node.style,
      // ...inSymbol ? { display: 'flex' } : null,
    }}
  >
    {node.children && node.children.map(child => (
      renderTree(child.id, byId, domNodes, symbols)
    ))}
    {body(node, symbols)}
  </div>
}

export default class Node extends Component {
  static contextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
  }

  render() {
    const {byId, byName, symbols} = this.context.data
    const node = this.props.id ? byId[this.props.id] : byName[this.props.name]
    return renderTree(node.id, byId, this.context.domNodes, symbols)
  }
}

const styles = StyleSheet.create({

})