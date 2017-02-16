import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'

import {colors} from './styles'

const cmp = (a, b) => a < b ? -1 : (a > b ? 1 : 0)

export default class ComponentList extends Component {
  constructor() {
    super()
    this.state = {
      searchText: '', // TODO
    }
  }

  render() {
    const {components, selected} = this.props
    const ids = Object.keys(components).sort((a, b) => cmp(components[a].name, components[b].name))
    return <div className={css(styles.container)}>
      <Header>
          Components
      </Header>
      <div className={css(styles.names)}>
        {ids.map(id => (
          <div
            key={id}
            onClick={() => this.props.onSelect(id)}
            className={css(styles.name, id === selected && styles.selectedName)}
          >
            {components[id].name}
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
    color: '#888',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    }
  },

  selectedName: {
    backgroundColor: colors.highlight,
    color: 'white',
    ':hover': {
      backgroundColor: colors.highlight,
    }
  },

  names: {
    paddingTop: 7,
    minHeight: 50,
    maxHeight: 200,
    backgroundColor: colors.background,
  }
})