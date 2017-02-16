import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import {colors} from './styles'
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
      selected: 'root',
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

  setSelected = (id: string) => {
    this.setState({selected: id})
  }

  render() {
    const {currentComponent, nodes, components, idsByName} = this.props
    const {selected} = this.state
    const idsByComponentId = {}
    Object.keys(components).forEach(id => {
      idsByComponentId[id] = idsByName[components[id].Component.rootName]
    })
    const root = idsByComponentId[currentComponent]
    return <div className={css(styles.container)}>
      <div
        onClick={() => this.setState({selected: 'root'})}
        className={css(styles.root, selected === 'root' && styles.rootSelected)}
      >
        {components[currentComponent].name}
      </div>
      <TreeNode
        root={root}
        nodes={nodes}
        hover={this.hover}
        onContextMenu={this.showContextMenu}
        idsByComponentId={idsByComponentId}        
        components={components}
        selected={selected}
        setSelected={this.setSelected}
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
    const {root, nodes, hover, idsByComponentId, components, selected, setSelected} = this.props
    const node = nodes[root]
    const children = node.type === 'ComponentInstance' ?
      [idsByComponentId[node.componentId]] : node.children
    const niceName = node.type === 'ComponentInstance' ?
      components[node.componentId].name : ''
    return (
      <div style={{

      }}>
        <div
          onMouseOver={() => hover(root)}
          onMouseOut={() => hover(null)}
          className={css(styles.treeName, root === selected && styles.treeNameSelected)}
          onClick={() => this.props.setSelected(root)}
          onContextMenu={evt => this.props.onContextMenu(root, evt)}
        >
          {(children && children.length ? <Icon className={css(styles.icon)}
            name={this.state.open ? 'ios-arrow-down' : 'ios-arrow-right'}
            onClick={(e) => (e.stopPropagation(), this.setState({ open: !this.state.open }))}
          /> : null)}
          {iconForNode(node)}
          <div className={css(styles.nameArea)}>
            {niceName &&
              <div className={css(styles.niceName)}>
                {niceName}
              </div>}
            <div className={css(styles.uniqueName)}>
              {nodes[root].uniqueName}
            </div>
          </div>
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
              idsByComponentId={idsByComponentId}
              components={components}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>}
      </div>
    )
  }
} 

const styles = StyleSheet.create({

  container: {
    overflow: 'auto',
    flex: 1,
  },

  root: {
    cursor: 'pointer',
    flexDirection: 'row',
    padding: '5px 10px',
    ':hover': {
      backgroundColor: '#eee',
    },
  },

  rootSelected: {
    color: 'white',
    backgroundColor: colors.highlight,
    ':hover': {
      backgroundColor: colors.highlight,
    },
  },

  treeName: {
    flexDirection: 'row',
    padding: '5px 10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    },
    fontSize: '90%',
  },

  treeNameSelected: {
    color: 'white',
    backgroundColor: colors.highlight,
    ':hover': {
      backgroundColor: colors.highlight,
    },
  },

  nameArea: {
    flexDirection: 'row',
    overflow: 'auto',
    flex: 1,
    // flexWrap: 'wrap',
  },

  niceName: {
    paddingRight: 5,
    fontWeight: 400,
  },

  uniqueName: {
    // color: '#555',
  },

  icon: {
    fontSize: 16,
    width: 16,
    alignItems: 'center',
    lineHeight: '18px',
    marginRight: 5,
  }
})

