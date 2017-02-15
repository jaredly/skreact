import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'

import {colors} from './styles'

export default class ComponentList extends Component {
  constructor() {
    super()
    this.state = {
      searchText: '', // TODO
    }
  }

  render() {
    const {components, selected} = this.props
    const names = Object.keys(components).sort()
    return <div className={css(styles.container)}>
      <Header>
          Components
      </Header>
      <div className={css(styles.names)}>
        {names.map(name => (
          <div
            key={name}
            onClick={() => this.props.onSelect(name)}
            className={css(styles.name, name === selected && styles.selectedName)}
          >
            {name}
          </div>
        ))}
      </div>
      <Hairline />
    </div>

  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 12,
    fontWeight: 100,
    padding: '7px 10px',
    color: '#aaa',
  },

  selectedName: {
    backgroundColor: colors.highlight,
    color: 'white',
  },

  names: {
    paddingTop: 7,
    minHeight: 50,
    maxHeight: 200,
    backgroundColor: colors.background,
  }
})