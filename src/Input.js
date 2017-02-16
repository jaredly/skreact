// @flow

import React, {Component} from 'react'

type Props = {value: string, onChange: (value: string) => void}

export default class Input extends Component {
  props: Props
  state: {value: string}
  node: *

  constructor({value}: Props) {
    super()
    this.state = {value}
  }

  componentWillReceiveProps({value}: Props) {
    if (value !== this.props.value) {
      this.setState({value})
    }
  }

  render() {
    return <input
      {...this.props}
      ref={node => this.node = node}
      value={this.state.value}
      onChange={e => this.setState({value: e.target.value})}
      onBlur={() => this.setState({value: this.props.value})}
      onKeyDown={e => e.key === 'Enter'
        ? this.props.onChange(e.target.value)
        : (e.key === 'Escape'
            ? (this.props.onChange(e.target.value), this.node.blur())
            : null)}
    />
  }
}
