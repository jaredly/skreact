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
  Component.defaultProps = {}
  return Component
}

const saveComponents = components => {
  const texts = {}
  for (let id in components) {
    texts[id] = components[id].source
  }
  localStorage[COMPONENTS_KEY] = JSON.stringify(texts)
}

const inflateComponents = components => {
  const res = {}
  for (let id in components) {
    res[id] = {
      ...components[id],
      Component: evalComponent(components[id].name, components[id].source, Node),
    }
  }
  return res
}

const deflateCompnents = components => {
  const res = {}
  for (let id in components) {
    res[id] = {
      ...components[id],
      Component: null,
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

export const saveState = (data: SkreactFile) => {
  return localforage.setItem(COMPONENTS_KEY, {
    ...data,
    components: deflateCompnents(data.components)
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
