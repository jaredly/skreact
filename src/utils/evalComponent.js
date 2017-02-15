
const React = require('react')
const {Component} = React

export default (name, text, Node) => {
  try {
    return eval(babelme(text + ';' + name).code)
  } catch (e) {
    console.error('failed to eval component')
    console.error(e)
    return
    // TODO show error
  }
  // const Component = eval(name)
  // return Component
}
