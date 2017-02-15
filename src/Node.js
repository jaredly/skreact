import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import type {Node} from './types'

const body = (node, symbols) => {
  switch (node.type) {
    case 'SymbolInstance':
      if (!symbols[node.symbolId]) {
        return <div>No symbol found</div>
      }
      return <NodeI id={symbols[node.symbolId]} />
    case 'Text':
      return <span>{node.stringValue}</span>
    case 'ShapeGroup':
      return <div dangerouslySetInnerHTML={{ __html: node.svgSource }} />
  }
}

const renderTree = (id, nodes, domNodes, symbols, hide, props) => {
  const node = nodes[id]
  if (!node) return <span>Node not found</span>
  if (hide[node.uniqueName]) return null
  const myProps = props[node.uniqueName] || {}
  const style = {
    ...node.style,
    ...myProps.style,
  }
  return <div
    key={id}
    {...myProps}
    style={style}
    ref={domNode => domNodes[node.id] = domNode}
  >
    {node.children && node.children.map(child => (
      renderTree(child, nodes, domNodes, symbols, hide, props)
    ))}
    {body(node, symbols)}
  </div>
}

export default class NodeI extends Component {
  static contextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
  }

  render() {
    const {hide={}, props={}} = this.props
    const {nodes, idsByName, symbolIds} = this.context.data
    const id = this.props.id ? this.props.id : idsByName[this.props.name]
    return renderTree(id, nodes, this.context.domNodes, symbolIds, hide, props)
  }
}

const styles = StyleSheet.create({

})