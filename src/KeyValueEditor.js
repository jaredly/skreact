// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Icon from './Icon'

import {colors} from './styles'

export default class KeyValueEditor extends Component {
  state: *
  props: {
    emptyPlaceholder: string,
    data: {[key: string]: string},
    onChange: (key: ?string, value: ?string, oldKey?: string) => void,
  }

  constructor() {
    super()
    this.state = {
      editing: null,
      key: '',
      value: '',
    }
  }

  // TODO add up/down mechanics
  render() {
    const {data, emptyPlaceholder} = this.props
    return <div className={css(styles.container)}>
      {Object.keys(data).map(key => (
        key === this.state.editing
          ? <PropertyEditor
              key={key}
              keyName={key}
              value={data[key]}
              onCommit={(...args) => (this.setState({editing: null}), this.props.onChange(...args))}
            />
          : <div
              onClick={() => this.setState({editing: key})}
              className={css(styles.row)} key={key}>
              <div className={css(styles.key)}>
                {key}
              </div>
              :
              <div className={css(styles.value)}>
                {data[key]}
              </div>
              <div style={{flex: 1}} />
              <Icon
                name="ios-close-outline"
                color="#d6d4d8"
                style={{cursor: 'pointer', fontSize: 14, padding: '3px 10px'}}
                onClick={() => this.props.onChange(null, null, key)}
              />
            </div>
      ))}
      <div style={{flexBasis: 5}} />
      <PropertyEditor
        keyName={''}
        value={''}
        onCommit={this.props.onChange}
        placeholder={emptyPlaceholder}
      />
    </div>
  }
}

class PropertyEditor extends Component {
  props: *
  state: *
  keyinput: *
  valinput: *

  constructor({keyName, value}: *) {
    super()
    this.state = {
      key: keyName,
      value,
    }
  }

  componentWillReceiveProps(nextProps: *) {
    if (nextProps.keyName !== this.props.keyName || nextProps.value !== this.props.value) {
      this.setState({
        key: nextProps.keyName,
        value: nextProps.value,
      })
    }
  }

  render() {
    return <div className={css(styles.row)}>
      <div className={css(styles.key)}>
        <input
          value={this.state.key}
          ref={node => this.keyinput = node}
          className={css(styles.input)}
          placeholder={this.props.placeholder}
          onChange={e => this.setState({key: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && e.target.value &&
            (this.state.value
              ? (this.props.onCommit(e.target.value, this.state.value, this.props.keyName), this.setState({key: '', value: ''}))
              : this.valinput.focus())
          }
        />
      </div>
      :
      <div className={css(styles.value)}>
        <input
          value={this.state.value}
          ref={node => this.valinput = node}
          className={css(styles.input)}
          onChange={e => this.setState({value: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && e.target.value &&
            (this.state.key
              ? (this.props.onCommit(this.state.key, e.target.value, this.props.keyName), this.setState({key: '', value: ''}))
              : this.keyinput.focus())
          }
        />
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingLeft: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 0,
  },

  input: {
    border: 'none',
    borderBottom: '1px dotted #ccc',
  },

  key: {
    color: 'darkred',
  },

  value: {
    color: 'black',
    marginLeft: 3,
  },
})
