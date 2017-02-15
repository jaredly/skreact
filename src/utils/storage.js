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
  const Component = () => <Node name={rootName} />
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

export const initialImport = (): SkreactFile => {
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
