// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import type {NodeT} from './utils/types'

const body = (node, symbols, style) => {
  switch (node.type) {
    case 'ComponentInstance':
      return <Node
        componentId={node.componentId}
        id={node.id}
      />
    case 'Text':
      return <span>{node.stringValue}</span>
    case 'ShapeGroup':
      return <div dangerouslySetInnerHTML={{ __html: node.svgSource }} />
    case 'Image':
      /* TODO compositing will need to use canvas for that.
      if (node.tintColor) {
        return <div
        style={{
          width: style.width,
          height: style.height,
          backgroundColor: node.tintColor,
          backgroundImage: `url(data:image/png;base64,${node.imageData})`,
          backgroundBlendMode: 'screen',
          backgroundSize: 'cover',
        }}
        />
      }
      */
      return <img
        src={`data:image/png;base64,${node.imageData}`}
        style={{
          width: style.width,
          height: style.height,
        }}
      />
  }
}

const renderTree = (id, nodes, domNodes, symbols, hide, props, rootStyle = null) => {
  const node = nodes[id]
  if (!node) return <span>Node not found</span>
  if (hide[node.uniqueName]) return null
  const myProps = props[node.uniqueName] || {}
  const width = !node.importedStyle.width && node.childSize ? node.childSize.width : node.importedStyle.width
  const height = !node.importedStyle.height && node.childSize ? node.childSize.height : node.importedStyle.height
  const style = {
    ...node.importedStyle,
    width,
    height,
    ...node.style,
    ...rootStyle,
    ...myProps.style,
  }
  return <div
    key={id}
    data-key={id}
    {...myProps}
    style={style}
    ref={domNode => domNodes[node.id] = domNode}
  >
    {node.children && node.children.map(child => (
      renderTree(child, nodes, domNodes, symbols, hide, props)
    ))}
    {body(node, symbols, style)}
  </div>
}

export default class Node extends Component {
  static contextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
    componentInstances: React.PropTypes.any,
  }

  getNode() {
    return this.context.data.nodes[this.props.id]
  }

  render() {
    const {hide={}, props={}, componentId, componentName, id, name, style={}} = this.props
    if (componentId) {
      const {Component} = this.context.data.components[componentId]
      return <Component ref={inst => {
        if (this.context.componentInstances[componentId]) {
          this.context.componentInstances[componentId][id] = inst
        } else {
          this.context.componentInstances[componentId] = {id: inst}
        }
      }}/>
    }
    const {nodes, idsByName, symbolIds} = this.context.data
    const nodeId = id ? id : idsByName[name]
    return renderTree(nodeId, nodes, this.context.domNodes, symbolIds, hide, props, style)
  }
}

const styles = StyleSheet.create({

})