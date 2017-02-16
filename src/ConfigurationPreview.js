import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'
import Icon from './Icon'

import {colors} from './styles'

export default class ConfigurationPreview extends Component {
  static childContextTypes = {
    domNodes: React.PropTypes.any,
    propsMap: React.PropTypes.any,
    componentInstances: React.PropTypes.any,
  }

  state: {
  }

  getChildContext() {
    return {
      domNodes: this.props.domNodes,
      propsMap: this.props.propsMap,
      componentInstances: this.props.componentInstances,
    }
  }

  clickToSelect = evt => {
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

  render() {
    const {Component, config={name: 'Default', props: null, state: null}} = this.props
    return <div style={styles.container}>
      <div className={css(styles.header)}>
        <Icon
          className={css(styles.icon)}
          onClick={() => this.props.removeConfiguration()}
          name="ios-close-empty"
        />  
        <div className={css(styles.name)}>
          {config.name}
        </div>
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
      <Component style={{
        boxShadow: '0 1px 5px #000',
        position: 'relative', top: 0, left: 0,
      }} ref={inst => {
        this.props.componentInstances.root = inst
      }} />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },

  wrapper: {
    alignSelf: 'flex-start',
  },

  wrapperCurrent: {
    outline: '3px solid #3ecbff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: '16px',
  },

  name: {
    color: 'white',
    padding: 5,
    fontSize: '90%',
  },

  icon: {
    color: 'white',
    padding: 5,
    justifyContent: 'center',
    cursor: 'pointer',
  },
})