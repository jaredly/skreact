import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'
import Icon from './Icon'

import {colors} from './styles'

export default class ConfigurationPreview extends Component {
  static childContextTypes = {
    domNodes: React.PropTypes.any,
    componentInstances: React.PropTypes.any,
  }

  state: {
  }

  getChildContext() {
    return {
      domNodes: this.props.domNodes,
      componentInstances: this.props.componentInstances,
    }
  }

  render() {
    const {Component, config={name: 'Default', props: null, state: null}} = this.props
    return <div style={styles.container}>
      <div className={css(styles.header)}>
        <Icon
          className={css(styles.icon)}
          name="ios-close-empty"
        />  
        <div className={css(styles.name)}>
          {config.name}
        </div>
      </div>
      <Component style={{
        boxShadow: '0 1px 5px #000',
        position: 'relative', top: 0, left: 0,
      }} ref={inst => {
        this.props.componentInstances.root = inst
      }} />
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
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