// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Icon from './Icon'
import {colors} from './styles'

const isAncestor = (ancestor, node: any) => {
  while (node && node !== document.body) {
    if (node === ancestor) return true
    node = node.parentNode
  }
  return false
}

export default class PopupMenu extends Component {
  state: {open: boolean}
  container: *
  constructor() {
    super()
    this.state = {open: false}
  }

  componentDidUpdate() {
    if (this.state.open) {
      window.addEventListener('mousedown', this.hideMenu, true)
    } else {
      window.removeEventListener('mousedown', this.hideMenu, true)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.hideMenu, true)
  }

  hideMenu = (evt: MouseEvent) => {
    if (!isAncestor(this.container, evt.target)) {
      this.setState({open: false})
    }
  }

  render() {
    const style = this.props.align === 'right'
      ? {right: 0} : {left: 0}
    return <div ref={node => this.container = node} className={css(styles.container) + ' ' + (this.props.className || '')}>
      <div
        onClick={() => this.setState({open: !this.state.open})}
        className={css(styles.button)}
      >
        {this.props.title}
      </div>
      {this.state.open && 
      <div style={style} className={css(styles.menu)}>
        {this.props.menu(() => this.setState({open: false}))}
      </div>}
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    fontWeight: 100,
    fontSize: 12,
  },

  button: {
    cursor: 'pointer',
    color: colors.highlight,
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: '14px',
  },

  menu: {
    position: 'absolute',
    zIndex: 1000,
    top: '100%',
  },
})