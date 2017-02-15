import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import {colors} from './styles'

const Hairline = () => <div className={css(styles.hairline)} />;

export default Hairline

const styles = StyleSheet.create({

  hairline: {
    flexBasis: 1,
    flexGrow: 0,
    backgroundColor: colors.line,
    alignSelf: 'stretch',
  },

})


