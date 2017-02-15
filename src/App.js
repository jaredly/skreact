import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import processDump from './process'
import Node from './Node'

export default class App extends Component {
  static childContextTypes = {
    data: React.PropTypes.any,
  }

  constructor() {
    super()
    this.state = {data: processDump(window.DATA)}
  }

  recheck = () => {
    this.setState({data: processDump(window.DATA)})
  }

  getChildContext() {
    return {
      data: processDump(window.DATA),
    }
  }

  render() {
    const {root} = processDump(window.DATA)
    return <div className={css(styles.container)}>
      <div className={css(styles.toolbar)}>
        <button
          className={css(styles.button)}
          onClick={this.recheck}
        >
          Reprocess
        </button>
      </div>
      <div className={css(styles.main)}>
        <div className={css(styles.tree)}>
          {/*<Tree
            root={root}
            symbols={symbols}
          />*/}
        </div>
        <div className={css(styles.display)}>
          <Node id={root} />
        </div>
      </div>
    </div>
  }
}

const Tree = ({root}) => (
  <div style={{

  }}>
    <div style={{
      padding: '5px 10px',
      cursor: 'pointer',
    }}>
      {root.name}
    </div>
    <div style={{
      paddingLeft: 5,
      borderLeft: '1px dotted #ccc',
      marginLeft: 10,
    }}>
    {root.layers && root.layers.map(child => (
      <Tree root={child} />
    ))}
    </div>
  </div>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  button: {
    cursor: 'pointer',
  },
  main: {
    flexDirection: 'row',
    flex: 1,
  },
  display: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  tree: {
    overflow: 'auto',
  },
})
