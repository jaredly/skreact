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

const renderTree = (id, byId, domNodes, symbols, hide, props) => {
  const node = byId[id]
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
      renderTree(child.id, byId, domNodes, symbols, hide, props)
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
    const {hide={}, props={}} = this.props
    const {byId, byName, symbols} = this.context.data
    const id = this.props.id ? this.props.id : byName[this.props.name].id
    return renderTree(id, byId, this.context.domNodes, symbols, hide, props)
  }
}

const styles = StyleSheet.create({

})