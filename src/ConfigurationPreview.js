// @flow
import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'
import Icon from './Icon'

import PopupMenu from './PopupMenu'
import Menu from './Menu'
import Input from './Input'

import {colors} from './styles'

export default class ConfigurationPreview extends Component {
  static childContextTypes = {
    domNodes: React.PropTypes.any,
    propsMap: React.PropTypes.any,
    componentInstances: React.PropTypes.any,
  }

  state: {
    renaming: boolean
  } = {renaming: false}

  getChildContext() {
    return {
      domNodes: this.props.domNodes,
      propsMap: this.props.propsMap,
      componentInstances: this.props.componentInstances,
    }
  }

  clickToSelect = (evt: any) => {
    evt.stopPropagation()
    evt.preventDefault()
    let target = evt.target
    while (!target.getAttribute('data-key')) {
      target = target.parentNode
      if (target === document.body || !target) {
        return
      }
    }
    for (let id in this.props.domNodes) {
      if (this.props.domNodes[id] === target) {
        return this.props.selectFromClick(id)
      }
    }
  }

  renderMenu = (onClose: () => void) => {
    const items = []
    items.push({
      title: 'Remove configuration from canvas',
      action: this.props.removeConfiguration,
    })
    if (this.props.config) {
      items.push({
        title: 'Delete configuration',
        action: this.props.deleteConfiguration,
        style: {color: 'red'},
      })
    }
    return <Menu
      onClose={onClose}
      items={items}
    />
  }

  render() {
    const {current, Component, config={name: 'Default configuration', props: {}, state: {}}} = this.props
    return <div className={css(styles.container)}>
      <div className={css(styles.top)}>
        <PopupMenu
          className={css(styles.menuContainer)}
          title={
            <div className={css(styles.header)}>
              <Icon
                className={css(styles.icon)}
                name="ios-close-empty"
              />  
            </div>
          }
          menu={this.renderMenu}
          align="left"
        />
        {this.state.renaming
          ? <Input
              autoFocus
              className={css(styles.input)}
              onChange={text => (this.setState({renaming: false}), this.props.renameConfiguration(text))}
              onBlur={() => this.setState({renaming: false})}
              value={config.name}
            />
          : <div
              className={css(styles.name)}
              onClick={current
                ? (this.props.config ? () => this.setState({renaming: true}) : null)
                : () => this.props.selectConfiguration()}
            >
              {config.name}
            </div>}
      </div>
      <div
        className={css(styles.wrapper, this.props.current && styles.wrapperCurrent)}
        onMouseDownCapture={
          this.props.current
          ? (this.props.clickToSelect
            ? this.clickToSelect
            : undefined)
          : (evt => (evt.preventDefault(), evt.stopPropagation(), this.props.selectConfiguration()))
        }
      >
      <Component
        {...config.props}
        style={{
          boxShadow: '0 1px 5px #000',
          position: 'relative', top: 0, left: 0,
          ...config.props.style,
        }}
        ref={inst => {
          this.props.componentInstances.root = inst
        }}
      />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: '16px',
    color: '#aaa',
  },

  menuContainer: {
    alignSelf: 'flex-start',
    color: 'black',
  },

  wrapper: {
    alignSelf: 'flex-start',
  },

  wrapperCurrent: {
    outline: '3px solid #3ecbff',
  },

  name: {
    cursor: 'pointer',
    color: '#ccc',
    padding: 5,
    fontSize: '90%',
  },

  input: {
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.1)',
    cursor: 'pointer',
    fontSize: 14,
    color: '#ccc',
    padding: 5,
  },

  icon: {
    color: 'white',
    padding: 5,
    justifyContent: 'center',
    cursor: 'pointer',
  },
})