// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'
import StyleEditor from './StyleEditor'
import Icon from './Icon'
import PopupMenu from './PopupMenu'
import Menu from './Menu'

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

// TODO code duplication
const rectangleStyle = style => ({
  backgroundColor: style.backgroundColor,
  borderRadius: style.borderRadius,
  border: style.border,
  boxShadow: style.boxShadow,
  // TODO do I use these?
  width: style.width,
  height: style.height,
  // TODO background opacity...
  // opacity: node.styleFromRect.opacity,
})

const ConfigurationEditor = ({
  nodes,
  Component,
  selectedTreeItem,
  componentInstances,
  onChangeConfiguration,
  configuration,
  onChangeStyleMerge,
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
  let imported = node.importedStyle
  if (node.importedRectStyle) {
    imported = {
      ...imported,
      ...rectangleStyle(node.importedRectStyle),
    }
  }
  return <div className={css(styles.container)}>
    <Header
    >
      <div>Style</div>
      <div style={{flex: 1}} />
      <PopupMenu
        title={<Icon name="ios-arrow-down" className={css(styles.revealArrow)} />}
        align="right"
        menu={onClose => <Menu
          onClose={onClose}
          items={createStyleCommandsMenu(node.style, imported, onChangeStyleMerge)}
        />}
      />
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
      {JSON.stringify(imported, null, 2)}
    </pre>
  </div>
}

const createStyleCommandsMenu = (customStyle, imported, onChangeStyleMerge) => {
  return [{
    title: 'Center children both',
    style: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  }, {
    title: 'Clear abs positioning',
    style: {
      top: 0,
      left: 0,
      position: 'relative',
    }
  }, {
    title: 'Distribute children horizontally',
    style: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    }
  }].map(({title, style}) => ({title, action: () => onChangeStyleMerge(style)}))
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
  },

  revealArrow: {
    padding: 10,
    cursor: 'pointer',
  }
})