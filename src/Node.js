import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import type {NodeT} from './types'

const body = (node, symbols) => {
  switch (node.type) {
    case 'SymbolInstance':
      return <Node id={node.symbolId} />
    case 'Text':
      return <span>{node.stringValue}</span>
    case 'ShapeGroup':
      return <div dangerouslySetInnerHTML={{ __html: node.svgSource }} />
  }
}

const renderTree = (id, nodes, domNodes, symbols, hide, props, isRoot = false) => {
  const node = nodes[id]
  if (!node) return <span>Node not found</span>
  if (hide[node.uniqueName]) return null
  const myProps = props[node.uniqueName] || {}
  const style = {
    ...node.style,
    ...isRoot ? {top: 0, left: 0} : null,
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

export default class Node extends Component {
  static contextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
  }

  getNode() {
    return this.context.data.nodes[this.props.id]
  }

  render() {
    const {hide={}, props={}} = this.props
    const {nodes, idsByName, symbolIds} = this.context.data
    const id = this.props.id ? this.props.id : idsByName[this.props.name]
    return renderTree(id, nodes, this.context.domNodes, symbolIds, hide, props, true)
  }
}

const styles = StyleSheet.create({

})