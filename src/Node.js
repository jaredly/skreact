// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import type {NodeT} from './utils/types'

const tintColorCache: {[id: string]: {[tintColor: string]: string}} = {}

const canvas = document.createElement('canvas')
canvas.style.visibility = 'hidden'
canvas.id = 'tint-color-creator'
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')
if (!ctx) throw new Error('what')
const tintImage = (id, imgSrc, tintColor) => {
  if (!tintColorCache[id]) {
    tintColorCache[id] = {}
  }
  if (tintColorCache[id][tintColor]) return tintColorCache[id][tintColor]
  const img = new Image()
  return new Promise((res, rej) => {
    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)
      ctx.globalCompositeOperation = 'source-in'
      ctx.fillStyle = tintColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      const dataURL = canvas.toDataURL()
      tintColorCache[id][tintColor] = dataURL
      return res(dataURL)
    }
    img.onerror = err => rej(err)
    img.src = imgSrc
  })
}

class TintedImage extends Component {
  state: {tinted: ?string}
  constructor({id, src, tintColor}) {
    super()
    this.state = {tinted: null}
    if (tintColorCache[id] && tintColorCache[id][tintColor]) {
      this.state.tinted = tintColorCache[id][tintColor]
    } else {
      tintImage(id, src, tintColor).then(src => this.setState({tinted: src}))
    }
  }

  componentWillReceiveProps({id, src, tintColor}) {
    if (tintColor !== this.props.tintColor) {
      tintImage(id, src, tintColor).then(src => this.setState({tinted: src}))
    }
  }
  

  render() {
    return <img src={this.state.tinted || this.props.src} style={this.props.style} />
  }
}

const body = (node, symbols, style, myProps) => {
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
      const imgStyle = {
        width: style.width,
        height: style.height,
      }
      const tintColor = style.tintColor
      if (tintColor) {
        if (tintColorCache[node.id] && tintColorCache[node.id][tintColor]) {
          return <img
            src={tintColorCache[node.id][tintColor]}
            style={imgStyle}
          />
        }
        return <TintedImage
          src={`data:image/png;base64,${node.imageData}`}
          style={imgStyle}
          tintColor={tintColor}
          id={node.id}
        />
      }
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
        style={imgStyle}
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
    {body(node, symbols, style, myProps)}
  </div>
}

export default class Node extends Component {
  static contextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
    componentInstances: React.PropTypes.any,
    propsMap: React.PropTypes.any,
  }

  getNode() {
    return this.context.data.nodes[this.props.id]
  }

  componentWillMount() {
    if (!this.props.componentId) {
      const {id, name} = this.props
      const {nodes, idsByName, symbolIds} = this.context.data
      const nodeId = id ? id : idsByName[name]
      this.context.propsMap[nodeId] = this.props.props
    }
  }

  render() {
    const {hide={}, props={}, componentId, componentName, id, name, style={}} = this.props
    const {domNodes, propsMap, componentInstances, data} = this.context
    if (componentId) {
      const {Component} = data.components[componentId]
      return <Component
        style={style}
        ref={inst => {
          if (componentInstances[componentId]) {
            componentInstances[componentId][id] = inst
          } else {
            componentInstances[componentId] = {id: inst}
          }
        }}
      />
    }
    const {nodes, idsByName, symbolIds} = data
    const nodeId = id ? id : idsByName[name]
    return renderTree(nodeId, nodes, domNodes, symbolIds, hide, props, style)
  }
}

const styles = StyleSheet.create({

})