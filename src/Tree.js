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
  constructor(props) {
    super()
    const {currentComponent, components, idsByName} = props
    const idsByComponentId = {}
    Object.keys(components).forEach(id => {
      idsByComponentId[id] = idsByName[components[id].Component.rootName]
    })
    const root = idsByComponentId[currentComponent]
    this.state = {
      menu: null,
      expanded: {
        [root]: true,
      },
    }
    this.setupHover()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      if (nextProps.selected !== 'root') {
        this.ensureVisible(nextProps.selected)
      }
    }
    if (nextProps.selected !== 'root') {
      setTimeout(() => {
        this.moveHoverTo(nextProps.selected)
      }, 20)
    } else {
      this._hover.style.display = 'none'
    }
  }

  ensureVisible(id) {
    const expanded = {...this.state.expanded}
    const {nodes} = this.props
    while (id) {
      id = nodes[id].parent
      if (id) expanded[id] = true
    }
    this.setState({expanded})
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

  moveHoverTo = id => {
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

  hover = id => {
    if (!id) {
      if (this.props.selected !== 'root') {
        this.moveHoverTo(this.props.selected)
      } else {
        this._hover.style.display = 'none'
      }
      /* Moving dom nodes around was expensive
      if (!this._hovering) return
      this._placeholder.parentNode.replaceChild(this._hovering, this._placeholder)
      ext(this._hovering.style, this._prevstyle)
      this._hovering = null
      */
    } else {
      this.moveHoverTo(id)
    }
  }

  showContextMenu = (id, evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    const items = [
      /*{
        text: 'Create component',
        action: () => this.props.createComponent(id),
      },*/
    ]
    const node = this.props.nodes[id]
    console.log(node, node.type)
    if (node.type === 'Rectangle' && node.parent) {
      if (this.props.nodes[node.parent].type === 'Group' ||
          this.props.nodes[node.parent].type === 'SymbolMaster') {
        items.push({
          text: 'Merge with parent group',
          action: () => this.props.mergeRectWithParent(id),
        })
      } else {
        console.log('nope', this.props.nodes[node.parent].type)
      }
    }
    if (!items.length) return console.log('no items')
    this.setState({
      menuPos: {top: evt.clientY, left: evt.clientX},
      menu: items
    })
  }

  toggle = id => {
    this.setState({
      expanded: {
        ...this.state.expanded,
        [id]: !this.state.expanded[id],
      }
    })
  }

  render() {
    const {currentComponent, nodes, components, idsByName, selected, toggleHidden} = this.props
    const idsByComponentId = {}
    Object.keys(components).forEach(id => {
      idsByComponentId[id] = idsByName[components[id].Component.rootName]
    })
    const root = idsByComponentId[currentComponent]
    return <div className={css(styles.container)}>
      <div
        onClick={() => this.props.setSelected('root')}
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
        expanded={this.state.expanded}
        toggle={this.toggle}
        components={components}
        selected={selected}
        setSelected={this.props.setSelected}
        toggleHidden={toggleHidden}
        navigateToComponent={this.props.navigateToComponent}
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
  if (node.type === 'Rectangle') {
    return <Icon name='android-checkbox-outline-blank' className={css(styles.icon)} />
  }
  if (node.type === 'Group') {
    return <Icon name='ios-folder-outline' className={css(styles.icon)} />
  }
  if (node.type === 'Image') {
    return <Icon name='image' className={css(styles.icon)} />
  }
  if (node.type === 'ShapeGroup') {
    return <Icon name='paintbrush' className={css(styles.icon)} />
  }
  if (node.type === 'Text') {
    return <Icon name='ios-compose-outline' className={css(styles.icon)} />
  }
}

class TreeNode extends Component  {
  render() {
    const {root, nodes, hover, idsByComponentId, components, selected, setSelected, expanded, toggle, toggleHidden, navigateToComponent} = this.props
    const open = expanded[root]
    const node = nodes[root]
    const isHidden = node.style.display === 'none' || (!node.style.display && node.importedStyle.display === 'none')
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
          onDoubleClick={node.type === 'ComponentInstance'
            ? () => navigateToComponent(node.componentId)
            : undefined }
          className={css(styles.treeName, root === selected && styles.treeNameSelected)}
          onClick={() => this.props.setSelected(root)}
          onContextMenu={evt => this.props.onContextMenu(root, evt)}
        >
          {(children && children.length ? <Icon className={css(styles.icon, styles.collapseIcon)}
            name={open ? 'ios-arrow-down' : 'ios-arrow-right'}
            onClick={(e) => (e.stopPropagation(), toggle(root))}
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
          <Icon
            className={css(styles.hiddenIcon, isHidden && styles.hiddenIconHidden)}
            name={isHidden ? 'eye-disabled' : 'eye'}
            onClick={() => this.props.toggleHidden(root)}
          />
        </div>
        {open && children && <div className={css(styles.children)}>
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
              expanded={expanded}
              toggle={toggle}
              toggleHidden={toggleHidden}
              setSelected={setSelected}
              navigateToComponent={navigateToComponent}
            />
          ))}
        </div>}
      </div>
    )
  }
} 

const styles = StyleSheet.create({
  hiddenIcon: {
    padding: '0px 10px',
    opacity: 0.2,
    color: '#aaa',
    ':hover': {
      opacity: 1,
    }
  },

  hiddenIconHidden: {
    opacity: 1,
  },

  container: {
    overflow: 'auto',
    minHeight: 100,
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
    padding: '5px 0px 5px 20px',
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

  children: {
    paddingLeft: 0,
    borderLeft: '1px dotted #ccc',
    marginLeft: 10,
  },

  collapseIcon: {
    marginLeft: -19,
    width: 14,
    fontSize: 14,
  },

  icon: {
    fontSize: 16,
    width: 16,
    alignItems: 'center',
    lineHeight: '18px',
    marginRight: 5,
  }
})

