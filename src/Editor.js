import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'
import CodeMirror from 'react-codemirror'

import Header from './Header'

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({value: nextProps.text})
      // this.editor.getCodeMirror().setValue(nextProps.text)
    }

  }

  save = () => {
    this.props.onSave(this.state.value)
  }

  render() {
    return <div
      className={css(styles.container)}  
    >
      <Header >
        <div>{this.props.name}.jsx</div>
        <div style={{flex: 1}} />
        <button
          onClick={this.save}
          className={css(styles.button)}
        >
          Update component
        </button>
      </Header>
      <CodeMirror
        ref={editor => this.editor = editor}
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
  button: {
    // padding: '10px 20px',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    cursor: 'pointer',
    border: 'none',
    ':hover': {
      backgroundColor: '#eee',
    }
  }
})
css(styles.container)