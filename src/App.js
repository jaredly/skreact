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
import StyleEditor from './StyleEditor'
import Icon from './Icon'

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
    propsMap: any,
    selectedTreeItem: string,
    currentConfiguration: string,
    clickToSelect: boolean,
  }

  constructor() {
    super()
    this.state = {
      loading: true,
      data: null,
      currentComponent: 'root',
      // TODO clear these out whenever changing current component
      domNodes: {},
      propsMap: {},
      componentInstances: {},
      selectedTreeItem: 'root',
      currentConfiguration: 'default',
      clickToSelect: false,
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
      propsMap: {},
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
        if (!this.state.propsMap[id]) this.state.propsMap[id] = {}
        if (!this.state.componentInstances[id]) this.state.componentInstances[id] = {}
        const selected = this.state.currentConfiguration === id
        return <ConfigurationPreview
          key={id}
          Component={Component}
          current={selected}
          config={id === 'default' ? undefined : savedConfigurations[id]}
          domNodes={this.state.domNodes[id]}
          propsMap={this.state.propsMap[id]}
          componentInstances={this.state.componentInstances[id]}
          clickToSelect={selected && this.state.clickToSelect}
          selectFromClick={this.selectFromClick}
        />
      })}
    </div>
  }

  onChangeStyle = (attr: ?string, value: any, prevAttr?: string) => {
    const {data, selectedTreeItem} = this.state
    if (!data) return
    const style = {...data.nodes[selectedTreeItem].style}
    if (prevAttr && prevAttr !== attr) {
      delete style[prevAttr]
    }
    if (attr) {
      style[attr] = value
    }
    this.setState({
      data: {
        ...data,
        nodes: {
          ...data.nodes,
          [selectedTreeItem]: {
            ...data.nodes[selectedTreeItem],
            style,
          }
        }
      }
    })
  }

  setSelectedTreeItem = (item: string) => {
    this.setState({selectedTreeItem: item})
  }

  selectFromClick = (item: string) => {
    this.setState({selectedTreeItem: item, clickToSelect: false})
  }

  render() {
    if (this.state.loading) return <div>Loading</div>
    if (!this.state.data) {
      return this.renderEmpty()
    }
    const {nodes, idsByName, components} = this.state.data
    const {currentComponent, selectedTreeItem} = this.state
    const {Component, source} = components[currentComponent]
    const root = idsByName[Component.rootName]
    const configurations = this.renderConfigurations()
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
            <div style={{flex: 1}} />
            <Icon
              name="qr-scanner"
              color={this.state.clickToSelect ? 'blue' : '#a6a8aa'}
              style={{cursor: 'pointer', padding: 4,}}
              size={20}
              onClick={() => this.setState({clickToSelect: !this.state.clickToSelect})}
            />
          </Header>
          <Tree
            nodes={nodes}
            currentComponent={currentComponent}
            domNodes={this.state.domNodes[this.state.currentConfiguration]}
            components={components}
            idsByName={idsByName}
            selected={selectedTreeItem}
            setSelected={this.setSelectedTreeItem}
          />
          <Hairline />
          <ConfigurationViewer
            nodes={nodes}
            configuration={components[currentComponent].savedConfigurations[this.state.currentConfiguration]}
            selectedTreeItem={selectedTreeItem}
            onChangeStyle={this.onChangeStyle}
            componentInstances={this.state.componentInstances[this.state.currentConfiguration]}
          />
        </div>
        <div className={css(styles.preview)}>
          <Header
          >
            <div>Application Preview</div>
          </Header>
          {configurations}
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

const ConfigurationViewer = ({nodes, selectedTreeItem, componentInstances, configuration, onChangeStyle}) => {
  if (selectedTreeItem === 'root') {
    const props = componentInstances.root ? componentInstances.root.props : null
    // ummmm how do I snoop on props n stuff?
    return <div>
      <Header
      >
        <div>Props</div>
      </Header>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
      <Header
      >
        <div>State</div>
      </Header>
      TODO
    </div>
  }
  const node = nodes[selectedTreeItem]
  return <div style={{height: 400, overflow: 'auto'}}>
    <Header
    >
      <div>Style</div>
    </Header>
    <StyleEditor
      style={node.style}
      onChange={onChangeStyle}
    />
    <Hairline />
    <Header
    >
      <div>Imported style</div>
    </Header>
    <pre style={{overflow: 'auto', alignSelf: 'stretch'}}>
      {JSON.stringify(node.importedStyle, null, 2)}
    </pre>
  </div>
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
