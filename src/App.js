import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import processDump from './process'
import Node from './Node'
import Editor from './Editor'
import Tree from './Tree'
import defaultCode from './template'
import evalComponent from './evalComponent'

import localforage from 'localforage'

import type {SkreactFile} from './types'

const COMPONENTS_KEY = 'skreact:components'

const initialComponent = (name, rootName) => {
  const Component = () => <Node name={rootName} />
  Component.displayName = name
  Component.rootName = rootName
  return Component
}

const loadComponents = (rootName) => {
  const texts = tryLoad(COMPONENTS_KEY)
  const components = {
    Application: {
      text: defaultCode('Application', rootName),
      Component: initialComponent('Application', rootName),
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

const inflateComponents = components => {
  const res = {}
  for (let name in components) {
    res[name] = {
      ...components[name],
      Component: evalComponent(name, components[name].source, Node),
    }
  }
  return res
}

const loadSavedState = () => {
  return localforage.getItem(COMPONENTS_KEY)
    .then(state => {
      if (state) {
        return {
          ...state,
          components: inflateComponents(state.components),
        }
      }
    })
}

const initialImport = (): SkreactFile => {
  // TODO get from not `window.DATA`
  const data = processDump(window.DATA)
  const rootName = data.byId[data.root].uniqueName
  const state = {
    topLevelSketchNodeIds: [data.root],
    nodes: data.byId,
    idsByName: data.idsByName,
    symbolIds: data.symbols,
    components: {
      Application: {
        source: defaultCode('Application', rootName),
        Component: initialComponent('Application', rootName),
        savedConfigurations: {},
      },
    },
  }
  // TODO should I inflate the Application here?

  return state
}

export default class App extends Component {
  static childContextTypes = {
    data: React.PropTypes.any,
    domNodes: React.PropTypes.any,
  }

  state: {
    loading: boolean,
    data: ?SkreactFile,
    currentComponent: string,
  }

  constructor() {
    super()
    this.state = {
      loading: true,
      data: null,
      currentComponent: 'Application',
      domNodes: {},
    }
  }

  componentDidMount() {
    loadSavedState()
    .then(data => data || initialImport()) // TODO remove
    .then(data => this.setState({loading: false, data}))
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
    const name = this.state.currentComponent
    const Component = evalComponent(name, text, Node)
    if (!Component) {
      return
    }
    const components = {
      ...this.state.components,
      [name]: { Component, text },
    }
    // saveComponents(components)
    this.setState({components})
  }

  doImport = () => {
    this.setState({data: initialImport()})
  }

  render() {
    if (this.state.loading) return <div>Loading</div>
    if (!this.state.data) {
      return <div>
        To get started, import something
        <button
          onClick={this.doImport}
        >
          Import
        </button>  
        Note: currently this only imports data that was pre-exported from sketch. In future we'll grab it from the currently opened sketch file.
      </div>
    }
    const {nodes, idsByName} = this.state.data // processDump(window.DATA)
    const {currentComponent} = this.state
    const {Component, source} = this.state.data.components[currentComponent]
    const root = idsByName[Component.rootName]
    if (!root) debugger
    return <div className={css(styles.container)}>
      <div className={css(styles.toolbar)}>
      </div>
      <div className={css(styles.main)}>
        <div className={css(styles.editor)}>
          <Editor
            text={source}
            onSave={this.commitComponent}
          />
        </div>
        <div className={css(styles.tree)}>
          <Tree
            root={root}
            nodes={nodes}
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
