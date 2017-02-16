// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Node from './Node'
import Editor from './Editor'
import Tree from './Tree'
import Header from './Header'
import Hairline from './Hairline'
import ComponentList from './ComponentList'
import ConfigurationPreview from './ConfigurationPreview'

import evalComponent from './utils/evalComponent'
import {colors} from './styles'
import {initialImport, loadSavedState} from './utils/storage'

import type {SkreactFile} from './utils/types'

export default class App extends Component {
  static childContextTypes = {
    data: React.PropTypes.any,    
  }

  state: {
    loading: boolean,
    data: ?SkreactFile,
    currentComponent: string,
    componentInstances: any,
    domNodes: any,
  }

  constructor() {
    super()
    this.state = {
      loading: true,
      data: null,
      currentComponent: 'root',
      // TODO clear these out whenever changing current component
      domNodes: {},
      componentInstances: {},
    }
  }

  componentDidMount() {
    loadSavedState()
    .then(data => data || initialImport()) // TODO remove
    .then(data => this.setState({loading: false, data}))
  }

  recheck = () => {
    // this.setState({data: processDump(window.DATA)})
  }

  getChildContext() {
    return {
      data: this.state.data, // processDump(window.DATA),
    }
  }

  switchCurrentComponent = (currentComponent: string) => {
    this.setState({
      currentComponent,
      domNodes: {},
      componentInstances: {},
    })
  }

  commitComponent = (text: string) => {
    const id = this.state.currentComponent
    if (!this.state.data) return
    const {data} = this.state
    const Component = evalComponent(data.components[id].name, text, Node)
    if (!Component) {
      return
    }
    if (!data) return
    const components = {
      ...data.components,
      [id]: { ...data.components[id], Component, text },
    }
    // saveComponents(components)
    this.setState({data: {...this.state.data, components}})
  }

  doImport = () => {
    this.setState({data: initialImport()})
  }

  renderEmpty() {
    return <div>
      To get started, import something
      <button
        onClick={this.doImport}
      >
        Import
      </button>
      Note: currently this only imports data that was pre-exported from sketch.
      In future we'll grab it from the currently opened sketch file.
    </div>
  }

  renderConfigurations() {
    const {Component, visibleConfigurations, savedConfigurations} = this.state.data.components[this.state.currentComponent]
    return <div className={css(styles.display)}>
      {visibleConfigurations.map(id => {
        if (!this.state.domNodes[id]) this.state.domNodes[id] = {}
        if (!this.state.componentInstances[id]) this.state.componentInstances[id] = {}
        if (id === 'default') {
          return <ConfigurationPreview
            key={id}
            Component={Component}
            config={undefined}
            domNodes={this.state.domNodes[id]}
            componentInstances={this.state.componentInstances[id]}
          />
        } else {
          return <ConfigurationPreview
            key={id}
            Component={Component}
            config={savedConfigurations[id]}
            domNodes={this.state.domNodes[id]}
            componentInstances={this.state.componentInstances[id]}
          />
        }
      })}
    </div>
  }

  render() {
    if (this.state.loading) return <div>Loading</div>
    if (!this.state.data) {
      return this.renderEmpty()
    }
    const {nodes, idsByName, components} = this.state.data
    const {currentComponent} = this.state
    const {Component, source} = components[currentComponent]
    const root = idsByName[Component.rootName]
    return <div className={css(styles.container)}>
      <div className={css(styles.toolbar)}>
      </div>
      <div className={css(styles.main)}>
        <div className={css(styles.leftSide)}>
          <ComponentList
            components={components}
            selected={currentComponent}
            onSelect={this.switchCurrentComponent}
          />
          <Header
          >
            <div>Instance Tree</div>
          </Header>
          <Tree
            currentComponent={currentComponent}
            nodes={nodes}
            domNodes={this.state.domNodes}
            components={components}
            idsByName={idsByName}
          />
        </div>
        <div className={css(styles.preview)}>
          <Header
          >
            <div>Application Preview</div>
          </Header>
          {this.renderConfigurations()}
        </div>
        <div className={css(styles.editor)}>
          <Editor
            name={components[currentComponent].name}
            text={source}
            onSave={this.commitComponent}
          />
        </div>
      </div>
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.background,
  },
  leftSide: {
    overflow: 'auto',
    width: 300,
  },
  preview: {
    flex: 1,
    backgroundColor: '#3b3e40',
  },
  display: {
    padding: 20,
    position: 'relative',
    flex: 1,
    overflow: 'auto',
  },
  button: {
    cursor: 'pointer',
  },

  main: {
    flexDirection: 'row',
    flex: 1,
  },

  tree: {
  },
  treeName: {
    padding: '5px 10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    }
  },
})
