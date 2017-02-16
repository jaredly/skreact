
export default (name, layerName) => `
class ${name} extends Component {
  static rootName = "${layerName}"

  static defaultProps = {
  }

  constructor(props) {
    super()
    this.state = {
    }
  }

  render() {
    return <Node
      name={${name}.rootName}
      props={{
        // pass in overrides to children
      }}
      {...this.props}
    />
  }
}
`

/*
      holes={{
        // the name of the hole, and the thing you're putting in it.
      }}
*/