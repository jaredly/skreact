// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Icon from './Icon'
import KeyValueEditor from './KeyValueEditor'

import {colors} from './styles'

const stringToStyle = (key, val: any) => {
  if (!key) return val
  if (+val == val) {
    return +val
  }
  return val
}

const styleToString = style => {
  const data = {}
  // TODO do I need anything more complex?
  Object.keys(style).forEach(key => data[key] = '' + style[key])
  return data
}

type Props = {
  style: {[key: string]: string},
  onChange: (key: ?string, val: ?any, oldKey?: string) => void,
}

const StyleEditor = ({style, onChange}: Props) => (
  <KeyValueEditor
    data={styleToString(style)}
    onChange={(key, val, oldKey) => onChange(key, stringToStyle(key, val), oldKey)}
    emptyPlaceholder="Add a style override"
  />
)

export default StyleEditor