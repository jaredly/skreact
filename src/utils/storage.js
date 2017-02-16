// @flow

import React from 'react'

import Node from '../Node'
import localforage from 'localforage'
import processDump from './process'
import defaultCode from './template'
import evalComponent from './evalComponent'

import type {SkreactFile} from './types'

const COMPONENTS_KEY = 'skreact:components'

const initialComponent = (name, rootName) => {
  const Component = props => <Node name={rootName} {...props} />
  Component.displayName = name
  Component.rootName = rootName
  return Component
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

export const loadSavedState = () => {
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

const pascalify = name => name
  .replace(/[^A-Za-z0-9_][A-Za-z0-9]/g, x => x.slice(1).toUpperCase())
  .replace(/[^A-Za-z0-9_]/g, '')
  .replace(/^\w/, x => x.toUpperCase())

const reifyComponents = components => {
  const result = {}
  for (let symbolId in components) {
    const component = components[symbolId]
    const name = pascalify(component.rootName)
    result[component.id] = {
      name,
      source: defaultCode(name, component.rootName),
      Component: initialComponent(name, component.rootName),
      savedConfigurations: {},
      visibleConfigurations: ['default'],
    }
  }
  return result
}

export const initialImport = (): SkreactFile => {
  // TODO get from not `window.DATA`
  const {root, symbols, byId, idsByName, components} = processDump(window.DATA)
  const rootName = byId[root].uniqueName
  const state = {
    topLevelSketchNodeIds: [root],
    nodes: byId,
    idsByName: idsByName,
    // symbolIds: symbols,
    components: {
      root: {
        name: 'Application',
        source: defaultCode('Application', rootName),
        Component: initialComponent('Application', rootName),
        savedConfigurations: {},
        visibleConfigurations: ['default'],
      },
      ...reifyComponents(components),
    },
  }
  // TODO should I inflate the Application here?

  return state
}
