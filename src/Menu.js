// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import {colors} from './styles'

const Menu = ({items, onClose}: *) => (
  <div className={css(styles.container)}>
    {items.map((item, i) => (
      <div key={i}
        onClick={() => (onClose(), item.action())}
        style={item.style}
        className={css(
          styles.item,
          i === 0 && styles.firstItem,
          i === items.length - 1 && styles.lastItem
        )}
      >
        {item.title}
      </div>
    ))}
  </div>
)

export default Menu

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    boxShadow: '0 2px 7px rgba(0, 0, 0, 0.6)',
    padding: '5px 0',
    borderRadius: 3,
    fontWeight: 100,
    fontSize: 12,
    minWidth: 200,
  },
  item: {
    padding: '10px 15px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',

    ':hover': {
      backgroundColor: colors.highlight,
      color: 'white',
    }
  },
})
