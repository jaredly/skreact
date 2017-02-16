
export default (name, layerName) => `
class ${name} extends Component {
  static rootName = "${layerName}"

  constructor(props) {
    super()
    this.state = {
      // Add state variables here
    }
  }

  // Add callback functions here

  render() {
    // Next level: where the tree is dynamic. How do I do that?
    // Maybe there's a way to "add a hole" to the render tree, which then you can fill through these props.
    return <Node
      name={${name}.rootName}
      hide={{
        // [name]: bool (true for hide)
        // For example, to hide "smiley" when "this.state.happy" is false, do
        // smiley: !this.state.happy,
      }}
      props={{
        // These props will be spread into the container node for the given layer
        // So you can do callback functions, styling things, etc.
        relations: {
          onClick: () => this.setState({showingKeys: !this.state.showingKeys}),
        },
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