import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import processDump from './process'
import Node from './Node'
import Editor from './Editor'
import Tree from './Tree'
import defaultCode from './template'
import evalComponent from './evalComponent'

const tryLoad = key => {
  try {
    return JSON.parse(localStorage[key])
  } catch (e) {
    return null
  }
}

const COMPONENTS_KEY = 'skreact:components'

const loadComponents = (rootName) => {
  const texts = tryLoad(COMPONENTS_KEY)
  const components = {
    App: {
      text: defaultCode('App', rootName),
      Component: () => <Node name={rootName} />,
    }
  }
  if (!texts) return components
  for (let name in texts) {
    components[name] = {
      text: texts[name],
      Component: evalComponent(name, texts[name], Node),
    }
  }
  return components
}

const saveComponents = components => {
  const texts = {}
  for (let name in components) {
    texts[name] = components[name].text
  }
  localStorage[COMPONENTS_KEY] = JSON.stringify(texts)
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
      components: loadComponents(rootName),
    }
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

  commitComponent = text => {
    const name = 'App'
    const Component = evalComponent(name, text, Node)
    if (!Component) {
      return
    }
    const components = {
      ...this.state.components,
      [name]: { Component, text },
    }
    saveComponents(components)
    this.setState({components})
  }

  render() {
    const {root, byId} = this.state.data // processDump(window.DATA)
    const {Component, text} = this.state.components.App
    return <div className={css(styles.container)}>
      <div className={css(styles.toolbar)}>
      </div>
      <div className={css(styles.main)}>
        <div className={css(styles.editor)}>
          <Editor
            text={text}
            onSave={this.commitComponent}
          />
        </div>
        <div className={css(styles.tree)}>
          <Tree
            root={root}
            nodes={byId}
            domNodes={this.state.domNodes}
          />
        </div>
        <div className={css(styles.display)}>
          <Component />
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
