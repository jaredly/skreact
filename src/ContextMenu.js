// @-flow

import React, {Component} from 'react';
import {css, StyleSheet} from 'aphrodite'

import './ContextMenu.css'

const isDomAncestor = (child, parent) => {
  if (child === parent) return true
  while (child.parentNode && child !== document.body) {
    child = child.parentNode
    if (child === parent) return true
  }
  return false
}



export default class ContextMenu extends Component {
  constructor() {
    super()
    this.state = {
      offX: 5,
      offY: 5,
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.closer, true)
    const box = this._node.getBoundingClientRect()
    // TODO set offX / offY if needed
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.closer, true)
  }

  closer = e => {
    if (!isDomAncestor(e.target, this._node)) {
      e.preventDefault()
      e.stopPropagation()
      this.props.onClose()
    }
  }

  render() {
    return <div
      className={css(styles.container)}
      style={{
        top: this.props.pos.top + this.state.offY,
        left: this.props.pos.left + this.state.offX,
      }}
      ref={n => this._node = n}
    >
      {renderMenu(this.props.onClose, this.props.menu)}
    </div>
  }
}

const renderItem = (onClose, item, i) => (
  <div
    className={'menu__item ' + css(styles.item)}
    key={i}
  >
    <div
      onMouseDown={item.action && !item.disabled ? (e => {
        e.stopPropagation()
        e.preventDefault()
        onClose()
        item.action()
      }) : null}
      className={css(styles.itemTop, item.action && !item.disabled && styles.clickableItem)}
    >
      <div className={css(styles.text, item.disabled && styles.itemTextDisabled)}>
        {item.text}
      </div>
      {item.keyShortcut && <div className={css(styles.keyShortcut)}>{item.keyShortcut}</div>}
      {item.children && item.children.length ?
        <div className={css(styles.childMarker)}>▸</div> : null}
      {item.radioChecked != null ?
        <div className={css(styles.radioChecked, !item.radioChecked && styles.notRadioChecked)}/> : null}
      {item.checked != null ?
        <div className={css(styles.checked, !item.checked && styles.notChecked)}>✔</div> : null}
    </div>
    {item.children ?
      <div className={'menu__children ' + css(styles.subChildren)}>
        {renderMenu(onClose, item.children)}
      </div> : null}
  </div>
)

const renderMenu = (onClose, items) => (
  <div
    className={css(styles.menu)}
  >
    {items.map(renderItem.bind(null, onClose))}
  </div>
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000000,
  },

  menu: {
    boxShadow: '0px 3px 10px #aaa',
    // border: '1px solid #ccc',
    minWidth: 200,
  },

  keyShortcut: {
    backgroundColor: '#eee',
    padding: '2px 4px',
    borderRadius: 4,
    fontSize: '70%',
    textShadow: '1px 1px 0 white',
  },

  subChildren: {
    position: 'absolute',
    left: '100%',
    top: 0,
    zIndex: 100000000000,
  },

  checked: {
    fontSize: 12,
    alignSelf: 'center',
  },
  notChecked: {
    color: '#ddd',
  },

  childMarker: {
    color: '#aaa',
  },

  item: {
    position: 'relative',
    backgroundColor: 'white',

    ':hover': {
      backgroundColor: '#eef',
    },
  },

  clickableItem: {
    cursor: 'pointer',
  },

  radioChecked: {
    width: 10,
    height: 10,
    backgroundColor: '#ddd',
    border: '1px solid #aaa',
    borderRadius: 10,
    alignSelf: 'center',
  },

  notRadioChecked: {
    backgroundColor: 'white',
  },

  itemTop: {
    padding: '5px 10px',
    paddingRight: 5,
    flexDirection: 'row',
    cursor: 'default',
  },

  text: {
    flex: 1,
  },

  itemTextDisabled: {
    // fontStyle: 'italic',
    color: '#999',
  },
})
