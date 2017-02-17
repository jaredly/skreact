// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import uuid from './utils/uuid'

import Node from './Node'
import Editor from './Editor'
import Tree from './Tree'
import Header from './Header'
import Hairline from './Hairline'
import ComponentList from './ComponentList'
import ConfigurationPreview from './ConfigurationPreview'
import Icon from './Icon'
import Menu from './Menu'
import PopupMenu from './PopupMenu'
import ConfigurationEditor from './ConfigurationEditor'
import ReimportDialog from './ReimportDialog'

import evalComponent from './utils/evalComponent'
import {colors} from './styles'
import {mergeData} from './utils/process'

import type {SkreactFile} from './utils/types'

const throttle = <T>(fn: (args: T) => void, time) => {
  let wait = null
  let wargs = null
  return (args: T) => {
    wargs = args
    if (!wait) {
      wait = setTimeout(() => {
        wait = null
        if (!wargs) return
        fn(wargs)
      }, time)
    }
  }
}

type Props = {
  initialData: SkreactFile,
  saveData: (data: SkreactFile) => Promise<void>,
  reimportData: () => Promise<SkreactFile>,
}

export default class App extends Component {
  static childContextTypes = {
    data: React.PropTypes.any,    
  }

  props: Props

  state: {
    data: SkreactFile,
    currentComponent: string,
    componentInstances: any,
    domNodes: any,
    propsMap: any,
    selectedTreeItem: string,
    currentConfiguration: string,
    configurationTicks: {[id: string]: number},
    clickToSelect: boolean,
    savedAt: number,
    reimporting: boolean,
    showingReimport: boolean,
    reimportError: ?string,
  }

  constructor(props: any) {
    super()
    console.log('app initial', props)
    window.app = this
    this.state = {
      data: props.initialData,
      savedAt: Date.now(),
      currentComponent: 'root',
      domNodes: {},
      propsMap: {},
      configurationTicks: {},
      componentInstances: {},
      selectedTreeItem: 'root',
      currentConfiguration: 'default',
      clickToSelect: false,
      reimporting: false,
      showingReimport: false,
      reimportError: null,
    }
  }

  componentDidMount() {
    window.app = this
  }

  recheck = () => {
    // TODO maybe do this sometime?
  }

  getChildContext() {
    return {
      data: this.state.data,
    }
  }

  reimportData = () => {
    this.setState({reimporting: true})
    this.props.reimportData().then(
      data => {
        const mergedData = mergeData(this.state.data, data)
        this.saveState(data)
        this.setState({
          data,
          reimporting: false,
          showingReimport: false,
        })
      },
      err => {
        console.error(err)
        console.error('failed to import')
        this.setState({reimportError: 'Failed to import from sketch'})
      }
    )
  }

  saveState: * = throttle((data: SkreactFile) => {
    console.log('saving')
    if (!this.props.saveData) return console.warn('cannot save')
    this.props.saveData(data).then(saved => {
      this.setState({savedAt: Date.now()})
      console.log('saved')
    }, err => {
      console.error(err)
      console.error('failed to saive')
    })
  }, 2000)

  updateData(data: SkreactFile) {
    this.setState({data})
    this.saveState(data)
  }

  switchCurrentComponent = (currentComponent: string) => {
    this.setState({
      currentComponent,
      selectedTreeItem: 'root',
      currentConfiguration: 'default', // TODO select one of the active ones
      configurationTicks: {},
      domNodes: {},
      propsMap: {},
      componentInstances: {},
    })
  }

  commitComponent = (source: string) => {
    const id = this.state.currentComponent
    const {data} = this.state
    const Component = evalComponent(data.components[id].name, source, Node)
    if (!Component) {
      return
    }
    const components = {
      ...data.components,
      [id]: { ...data.components[id], Component, source },
    }
    // saveComponents(components)
    this.updateData({...this.state.data, components})
  }

  renderConfigurations() {
    const {Component, visibleConfigurations, savedConfigurations} = this.state.data.components[this.state.currentComponent]
    return <div className={css(styles.display)}>
      {visibleConfigurations.map(id => {
        if (!this.state.domNodes[id]) this.state.domNodes[id] = {}
        if (!this.state.propsMap[id]) this.state.propsMap[id] = {}
        if (!this.state.componentInstances[id]) this.state.componentInstances[id] = {}
        const selected = this.state.currentConfiguration === id
        const tick = this.state.configurationTicks[id] || 0
        return <ConfigurationPreview
          key={id + tick}
          Component={Component}
          current={selected}
          config={id === 'default' ? undefined : savedConfigurations[id]}
          domNodes={this.state.domNodes[id]}
          propsMap={this.state.propsMap[id]}
          componentInstances={this.state.componentInstances[id]}
          clickToSelect={selected && this.state.clickToSelect}
          selectFromClick={this.selectFromClick}
          selectConfiguration={() => this.setState({currentConfiguration: id, selectedTreeItem: 'root'})}
          renameConfiguration={name => this.renameConfiguration(id, name)}
          removeConfiguration={() => this.hideConfiguration(id)}
          deleteConfiguration={() => this.deleteConfiguration(id)}
        />
      })}
    </div>
  }

  setStyle = (id: string, style: any) => {
    this.updateData({
      ...this.state.data,
      nodes: {
        ...this.state.data.nodes,
        [id]: {
          ...this.state.data.nodes[id],
          style,
        }
      }
    })
  }

  onChangeStyleMerge = (updates: any) => {
    const {data, selectedTreeItem} = this.state
    const style = {...data.nodes[selectedTreeItem].style, ...updates}
    this.setStyle(selectedTreeItem, style)
  }

  changeStyle = (id: string, attr: ?string, value: any, prevAttr?: string) => {
    const {data} = this.state
    const style = {...data.nodes[id].style}
    if (prevAttr && prevAttr !== attr) {
      delete style[prevAttr]
    }
    if (attr) {
      style[attr] = value
    }
    this.setStyle(id, style)
  }

  onChangeStyle = (attr: ?string, value: any, prevAttr?: string) => {
    this.changeStyle(this.state.selectedTreeItem, attr, value, prevAttr)
  }

  changeConfiguration = (id: string, configuration: any) => {
    const {data: {components}, currentComponent} = this.state
    if (id === 'default') {
      throw new Error("can't modify the default configuration")
    }
    const {savedConfigurations} = components[currentComponent]
    this.updateData({
      ...this.state.data,
      components: {
        ...components,
        [currentComponent]: {
          ...components[currentComponent],
          savedConfigurations: {
            ...savedConfigurations,
            [id]: configuration,
          },
        },
      },
    })
  }

  renameConfiguration = (id: string, name: string) => {
    const {data: {components}, currentComponent} = this.state
    this.changeConfiguration(id, {
      ...components[currentComponent].savedConfigurations[id],
      name,
    })
  }

  onChangeConfiguration = (configuration: any) => {
    const {currentConfiguration} = this.state
    this.changeConfiguration(currentConfiguration, configuration)
    this.setState({
      configurationTicks: {
        ...this.state.configurationTicks,
        [currentConfiguration]: (this.state.configurationTicks[currentConfiguration] || 0) + 1,
      }
    })
  }

  setSelectedTreeItem = (item: string) => {
    this.setState({selectedTreeItem: item})
  }

  selectFromClick = (item: string) => {
    this.setState({selectedTreeItem: item, clickToSelect: false})
  }

  toggleHidden = (id: string) => {
    const node = this.state.data.nodes[id]
    const importedHidden = node.importedStyle.display === 'none'
    if (importedHidden) {
      if (!node.style.display || node.style.display === 'none') {
        return this.changeStyle(id, 'display', 'flex')
      } else {
        return this.changeStyle(id, null, null, 'display')
      }
    } else {
      if (node.style.display === 'none') {
        return this.changeStyle(id, null, null, 'display')
      } else {
        return this.changeStyle(id, 'display', 'none')
      }
    }
  }

  createComponent = (id: string) => {
    const {data} = this.state
    console.error('NOT IMPLEMENTED')
  }

  createNewConfiguration = () => {
    const id = uuid()
    const {data, currentComponent, currentConfiguration, componentInstances} = this.state
    const props = currentConfiguration === 'default'
      ? data.components[currentComponent].Component.defaultProps
      : data.components[currentComponent].savedConfigurations[currentConfiguration].props
    const state = currentConfiguration === 'default'
      ? (componentInstances[currentConfiguration].root) && componentInstances[currentConfiguration].root.state
      : data.components[currentComponent].savedConfigurations[currentConfiguration].state
    this.updateData({
      ...data,
      components: {
        ...data.components,
        [currentComponent]: {
          ...data.components[currentComponent],
          savedConfigurations: {
            ...data.components[currentComponent].savedConfigurations,
            [id]: {
              name: 'Untitled configuration',
              props: {...props},
              state: {...state},
            },
          },
          visibleConfigurations: data.components[currentComponent].visibleConfigurations.concat([id]),
        }
      }
    })
  }

  showConfiguration = (id: string) => {
    const {currentComponent, data} = this.state
    const {components} = data
    const {visibleConfigurations} = components[currentComponent]
    this.updateData({
      ...data,
      components: {
        ...data.components,
        [currentComponent]: {
          ...data.components[currentComponent],
          visibleConfigurations: visibleConfigurations.concat([id]),
        }
      }
    })
  }

  hideConfiguration = (id: string) => {
    const {currentComponent, data} = this.state
    const {components} = data
    const {visibleConfigurations} = components[currentComponent]
    this.updateData({
      ...data,
      components: {
        ...data.components,
        [currentComponent]: {
          ...data.components[currentComponent],
          visibleConfigurations: visibleConfigurations.filter(cid => cid !== id),
        }
      }
    })
  }

  deleteConfiguration = (id: string) => {
    const {currentComponent, data} = this.state
    const {components} = data
    const {visibleConfigurations} = components[currentComponent]
    const configurations = {...data.components[currentComponent].savedConfigurations}
    delete configurations[id]
    this.updateData({
      ...data,
      components: {
        ...data.components,
        [currentComponent]: {
          ...data.components[currentComponent],
          savedConfigurations: configurations,
          visibleConfigurations: visibleConfigurations.filter(cid => cid !== id),
        }
      }
    })
  }

  renderMenu = (onClose: () => void) => {
    const {components} = this.state.data
    const {currentComponent} = this.state
    const {savedConfigurations, visibleConfigurations} = components[currentComponent]
    const ids = Object.keys(savedConfigurations).filter(id => visibleConfigurations.indexOf(id) === -1)
    const items = [{
      title: 'Create new configuration',
      action: () => this.createNewConfiguration(),
    }]
    if (visibleConfigurations.indexOf('default') === -1) {
      items.push({
        title: 'Default configuration',
        action: () => this.showConfiguration('default'),
      })
    }
    const extras = ids.map(id => ({
      title: savedConfigurations[id].name,
      action: () => this.showConfiguration(id),
    }))
    items.push(...extras)
    return <Menu onClose={onClose} items={items} />
  }

  mergeRectWithParent = (id: string) => {
    const {data: {nodes}} = this.state
    const node = nodes[id]
    if (!node.parent) return
    const parent = nodes[node.parent]
    if (node.type !== 'Rectangle' ||
        (parent.type !== 'Group' &&
        parent.type !== 'SymbolMaster')) return console.log('not right')
    if (node.importedStyle.opacity &&
        node.importedStyle.opacity !== 1) {
      return alert("Not merging b/c rectangle is partially transparent")
    }
    this.setState({
      selectedTreeItem: parent.id,
    })
    this.updateData({
      ...this.state.data,
      nodes: {
        ...nodes,
        [parent.id]: {
          ...parent,
          children: parent.children.filter(cid => cid !== id),
          importedRectStyle: node.importedStyle,
          mergedRectId: id,
        },
        [id]: {
          ...node,
          parent: null,
        }
      }
    })
  }

  render() {
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
          <Header>
              Components
              <div style={{flex: 1}} />
              {!!this.props.reimportData && <Icon
                name="ios-download-outline"
                className={css(styles.importIcon)}
                onClick={() => this.setState({showingReimport: true})}
              />}
          </Header>
          <ComponentList
            components={components}
            selected={currentComponent}
            onSelect={this.switchCurrentComponent}
          />
          <Header
          >
            <div onClick={() => this.setState({selectedTreeItem: 'root'})}>Instance Tree</div>
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
            toggleHidden={this.toggleHidden}
            navigateToComponent={this.switchCurrentComponent}
            mergeRectWithParent={this.mergeRectWithParent}
            createComponent={this.createComponent}
          />
          <Hairline />
          <ConfigurationEditor
            nodes={nodes}
            Component={Component}
            configuration={components[currentComponent].savedConfigurations[this.state.currentConfiguration]}
            selectedTreeItem={selectedTreeItem}
            onChangeStyle={this.onChangeStyle}
            onChangeStyleMerge={this.onChangeStyleMerge}
            componentInstances={this.state.componentInstances[this.state.currentConfiguration]}
            onChangeConfiguration={this.onChangeConfiguration}
          />
        </div>
        <div className={css(styles.preview)}>
          <Header
          >
            <div>Application Preview</div>
            <div style={{flex: 1}} />
            <PopupMenu
              align="right"
              title={
                <div style={{flexDirection: 'row', alignItems: 'center', 
                  padding: '5px 10px',
                }}>
                  Add a configuration
                  <Icon
                    name="ios-arrow-down"
                    className={css(styles.icon)}
                  />
                </div>
              }
              menu={this.renderMenu}  
            />
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
      {this.state.showingReimport &&
        <ReimportDialog
          loading={this.state.reimporting}
          onLoad={this.reimportData}
          onClose={() => this.setState({showingReimport: false})}
          error={this.state.reimportError}
        />}
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
    // overflow: 'auto',
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

  icon: {
    paddingLeft: 5,
    lineHeight: '16px',
    fontSize: 11,
  },

  importIcon: {
    padding: 5,
    fontSize: 20,
    color: colors.highlight,
    cursor: 'pointer',
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
