import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import {colors} from './styles'

const Header = ({children}) => <div className={css(styles.Header)}>{children}</div>;
export default Header

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: 400,
    borderBottom: '1px solid ' + colors.line,
    padding: '10px 7px',
    backgroundColor: colors.background,
  },
})

