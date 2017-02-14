import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import processDump from './process'

const Display = ({data}) => {
  return <div
    style={{
      position: 'absolute',
      outline: '1px solid magenta',
      ...data.style,
    }}
  >
    {data.layers && data.layers.map((item, i) => <Display key={i} data={item} />)}
  </div>
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      data: processDump(window.DATA),
    }    
  }

  recheck() {
    this.setState({data: processDump(window.DATA)})
  }

  render() {
    const data = processDump(window.DATA)
    return <div>
      <button
        className={css(styles.button)}
        onClick={() => this.recheck()}
      >Reprocess</button>
      <Display data={data} />
    </div>
  }
}

const styles = StyleSheet.create({
  button: {
    cursor: 'pointer',
  }
})
