// @flow
import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import Header from './Header'
import Hairline from './Hairline'
import Icon from './Icon'

import PopupMenu from './PopupMenu'
import Menu from './Menu'
import Input from './Input'

import {colors} from './styles'

const ReimportDialog = ({
  loading, onLoad, onClose
}: {
  loading: boolean,
  onLoad: () => void,
  onClose: () => void,
}) => (
  <div
    className={css(styles.container)}
    onMouseDown={onClose}
  >
  <div
    className={css(styles.center)}
    onMouseDown={evt => evt.stopPropagation()}
  >
    <div className={css(styles.title)}>
    Reimport
    </div>
    {loading
      ? <div>Importing...<progress /></div>
      : <button onClick={onLoad}>
          Import from sketch
        </button>}
  </div>
  </div>
)

export default ReimportDialog

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 100000,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  title: {
    padding: 10,
    marginBottom: 20,
  },

  center: {
    backgroundColor: 'white',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    width: 300,
    height: 200,
    padding: 40,
    borderRadius: 3,
    alignItems: 'center',
  }
})