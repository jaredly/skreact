import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import CodeMirror from 'react-codemirror'

import 'codemirror/theme/solarized.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

export default class Editor extends Component {
  constructor(props) {
    super()
    this.state = {
      value: props.text,
    }
  }

  componentDidMount() {
  }

  save = () => {
    this.props.onSave(this.state.value)
  }

  render() {
    return <div
      className={css(styles.container)}  
    >
      <button
        onClick={this.save}
      >
        Save
      </button>
      <CodeMirror
        value={this.state.value}
        className={css(styles.editor)}
        onChange={value => this.setState({value})}
        options={{
          mode: 'javascript',
          theme: 'solarized dark',
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
        }}
      />
    </div>
  }
}

const styles = StyleSheet.create({
  container: {
    width: 500,
    flex: 1,
  },
  editor: {
    flex: 1,
    height: 600,
  },
})
css(styles.container)