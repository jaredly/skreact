import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import ContextMenu from './ContextMenu'
import Icon from './Icon'

const ext = (a, b) => {
  const prev = {}
  for (let n in b) {
    prev[n] = a[n]
    a[n] = b[n]
  }
  return prev
}


export default class Tree extends Component {
  constructor() {
    super()
    this.state = {
      menu: null,
    }
    this.setupHover()
  }

  setupHover() {
    this._hover = document.createElement('div')
    document.body.appendChild(this._hover)
    ext(this._hover.style, {
      display: 'none',
      position: 'absolute',
      outline: '2px solid magenta',
      pointerEvents: 'none',
      zIndex: 100000,
    })
    this._placeholder = document.createElement('div')
    this._hovering = null
    this._prevstyle = null
  }

  hover = id => {
    if (!id) {
      this._hover.style.display = 'none'
      if (!this._hovering) return
      /* Moving dom nodes around was expensive
      this._placeholder.parentNode.replaceChild(this._hovering, this._placeholder)
      ext(this._hovering.style, this._prevstyle)
      this._hovering = null
      */
    } else {
      const node = this.props.domNodes[id]
      if (!node) return console.log('node missing for hover', id)
      const box = node.getBoundingClientRect()
      /* Moving dom nodes around was expensive
      this._hovering = node
      this._prevstyle = ext(node.style, {
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        display: 'block',
        position: 'absolute',
        zIndex: 100000,
        boxShadow: '0 0 10px #555',
      })
      node.parentNode.replaceChild(this._placeholder, node)
      document.body.appendChild(node)
      */
      ext(this._hover.style, {
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        display: 'block',
      })
    }
  }

  showContextMenu = (id, evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({
      menuPos: {top: evt.clientY, left: evt.clientX},
      menu: [
        {
          text: 'Create component',
        },
      ]
    })
  }

  render() {
    const {root, nodes} = this.props
    return <div>
      <TreeNode
        root={root}
        nodes={nodes}
        hover={this.hover}
        onContextMenu={this.showContextMenu}
        isRoot
      />
      {this.state.menu &&
      <ContextMenu
        menu={this.state.menu}
        pos={this.state.menuPos}
        onClose={() => this.setState({menu: null})}
      />}
    </div>
  }
}

const iconForNode = node => {
  if (node.type === 'SymbolInstance') {
    return <Icon name='ios-refresh-empty' className={css(styles.icon)} />
  }
  if (node.type === 'ComponentInstance') {
    return <Icon name='ios-gear-outline' className={css(styles.icon)} />
  }
}

class TreeNode extends Component  {
  constructor(props) {
    super()
    this.state = {
      open: props.isRoot,
    }
  }

  render() {
    const {root, nodes, hover} = this.props
    const node = nodes[root]
    const children = node.type === 'SymbolInstance' ?
      nodes[node.symbolId].children : node.children
    return (
      <div style={{

      }}>
        <div
          onMouseOver={() => hover(root)}
          onMouseOut={() => hover(null)}
          className={css(styles.treeName)}
          onClick={() => this.setState({open: !this.state.open})}
          onContextMenu={evt => this.props.onContextMenu(root, evt)}
        >
          {(children && children.length ? <Icon className={css(styles.icon)}
            name={this.state.open ? 'ios-arrow-down' : 'ios-arrow-right'}
          /> : null)}
          {iconForNode(node)}
          {nodes[root].uniqueName}
        </div>
        {this.state.open && children && <div style={{
          paddingLeft: 5,
          borderLeft: '1px dotted #ccc',
          marginLeft: 10,
        }}>
          {children.map(id => (
            <TreeNode
              root={id}
              nodes={nodes}
              key={id}
              hover={this.props.hover}
              onContextMenu={this.props.onContextMenu}
            />
          ))}
        </div>}
      </div>
    )
  }
} 

const styles = StyleSheet.create({
  treeName: {
    flexDirection: 'row',
    padding: '5px 10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    }
  },

  icon: {
    fontSize: 16,
    width: 16,
    alignItems: 'center',
    lineHeight: '18px',
    marginRight: 5,
  }
})

