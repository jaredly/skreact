import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

export default class Tree extends Component  {
  constructor(props) {
    super()
    this.state = {
      open: props.isRoot,
    }
  }

  render() {
    const {root, nodes, hover} = this.props
    return (
      <div style={{

      }}>
        <div
          onMouseOver={() => hover(root)}
          onMouseOut={() => hover(null)}
          className={css(styles.treeName)}
          onClick={() => this.setState({open: !this.state.open})}
        >
          {nodes[root].uniqueName}
        </div>
        {this.state.open && <div style={{
          paddingLeft: 5,
          borderLeft: '1px dotted #ccc',
          marginLeft: 10,
        }}>
          {nodes[root].children.map(child => (
            <Tree
              root={child.id}
              nodes={nodes}
              key={child.id}
              hover={this.props.hover}
            />
          ))}
        </div>}
      </div>
    )
  }
} 

const styles = StyleSheet.create({
  tree: {
    overflow: 'auto',
    width: 200,
  },
  treeName: {
    padding: '5px 10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    }
  },
})

