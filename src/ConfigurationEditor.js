// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'
import StyleEditor from './StyleEditor'
import Icon from './Icon'

import KeyValueEditor from './KeyValueEditor'

const updateProps = (props, key, val, oldKey) => {
  const res = {...props}
  if (oldKey && oldKey !== key) {
    delete res[oldKey]
  }
  if (key) {
    res[key] = JSON.parse(val)
  }
  return res
}

const jsonStrings = props => {
  const res = {}
  for (let name in props) {
    res[name] = JSON.stringify(props[name])
  }
  return res
}

const ConfigurationEditor = ({
  nodes,
  Component,
  selectedTreeItem,
  componentInstances,
  onChangeConfiguration,
  configuration,
  onChangeStyle,
}: *) => {
  if (selectedTreeItem === 'root') {
    if (configuration) {
      return <div className={css(styles.container)}>
        <Header
        >
          <div>Properties</div>
        </Header>
        <pre className={css(styles.json)}>
          <KeyValueEditor
            emptyPlaceholder="Add prop"
            data={jsonStrings(configuration.props)}
            onChange={(key, val, oldKey) => (
              onChangeConfiguration({
                ...configuration,
                props: updateProps(configuration.props, key, val, oldKey),
              })
            )}
          />
        </pre>
      </div>
    }
    const props = Component ? Component.defaultProps : {}
    // ummmm how do I snoop on props n stuff?
    return <div className={css(styles.container)}>
      <Header
      >
        <div>Props</div>
      </Header>
      To make changes to the default configuration, modify `defaultProps` in the component editor.
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  }
  const node = nodes[selectedTreeItem]
  return <div className={css(styles.container)}>
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
        <pre className={css(styles.json)}>
      {JSON.stringify(node.importedStyle, null, 2)}
    </pre>
  </div>
}

export default ConfigurationEditor

const styles = StyleSheet.create({
  container: {
    flexBasis: 400,
    flexShrink: 2,
    overflow: 'auto',
  },
  json: {
    overflow: 'auto',
    alignSelf: 'stretch',
  }
})