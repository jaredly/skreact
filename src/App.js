import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import processDump from './process'
import Node from './Node'
import Editor from './Editor'
import Tree from './Tree'
import defaultCode from './template'

const ext = (a, b) => {
  const prev = {}
  for (let n in b) {
    prev[n] = a[n]
    a[n] = b[n]
  }
  return prev
}

export default class App extends Component {
  static childContextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
  }

  constructor() {
    super()
    const data = processDump(window.DATA)
    const rootName = data.byId[data.root].uniqueName
    this.state = {
      data,
      domNodes: {},
      components: {
        [rootName]: {
          text: defaultCode(rootName),
          Component: () => <Node name={rootName} />,
        }
      }
    }

    this._hover = document.createElement('div')
    document.body.appendChild(this._hover)
    ext(this._hover.style, {
      position: 'absolute',
      outline: '2px solid magenta',
      pointerEvents: 'none',
      zIndex: 100000,
    })
    this._placeholder = document.createElement('div')
    this._hovering = null
    this._prevstyle = null
  }

  recheck = () => {
    this.setState({data: processDump(window.DATA)})
  }

  getChildContext() {
    return {
      data: this.state.data, // processDump(window.DATA),
      domNodes: this.state.domNodes,
    }
  }

  hover = id => {
    if (!id) {
      this._hover.style.display = 'none'
      this._placeholder.parentNode.replaceChild(this._hovering, this._placeholder)
      ext(this._hovering.style, this._prevstyle)
      this._hovering = null
    } else {
      const node = this.state.domNodes[id]
      if (!node) return console.log('node missing for hover', id)
      const box = node.getBoundingClientRect()
      this._hovering = node
      this._prevstyle = ext(node.style, {
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        display: 'block',
        position: 'absolute',
        zIndex: 100000,
        boxShadow: '0 0 10px #555',
      })
      ext(this._hover.style, {
        top: box.top + 'px',
        left: box.left + 'px',
        width: box.width + 'px',
        height: box.height + 'px',
        display: 'block',
      })
      node.parentNode.replaceChild(this._placeholder, node)
      document.body.appendChild(node)
    }
  }

  render() {
    const {root, byId} = this.state.data // processDump(window.DATA)
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
        <div className={css(styles.editor)}>
          <Editor
            text={"hello"}
          />
        </div>
        <div className={css(styles.tree)}>
          <Tree
            root={root}
            nodes={byId}
            domNodes={this.state.domNodes}
            hover={this.hover}
            isRoot
          />
        </div>
        <div className={css(styles.display)}>
          <Node id={root} />
        </div>
      </div>
    </div>
  }
}

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
    width: 200,
  },
  treeName: {
    padding: '5px 10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    }
  },
})
