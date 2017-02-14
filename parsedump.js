// This is for parsing the output of `class-dump` http://stevenygard.com/projects/class-dump/
// Made for converting sketch data to json

const fs = require('fs')
const text = fs.readFileSync('./sketch.dump', 'utf8')

const structs = {}
const ifaces = {}

const lines = text.split('\n')

let instruct = null
let inface = null
let props = null

const black = ['objectID', 'hash', 'superclass', 'userInfo']

lines.forEach((line, i) => {
  if (inface) {
    if (line.match(/^@end\s*$/)) {
      inface = false
      return
    }
    line = line.split(/\/\//)[0]
    const res = line.match(/^@property(\([^)]+\))? ((\S+\s*)+);/)
    if (!res) return
    const [_, __, things] = res
    const items = things.split(/\s+/g)
    const types = items.slice(0, -1)
    let isPointer = false
    let name = items[items.length - 1]
    if (name[0] === '*') {
      isPointer = true
      name = name.slice(1)
    }
    if (black.indexOf(name) !== -1) return
    if (types[0] === '__weak') types.shift()
    let type
    if (types[0] === 'struct') {
      type = {type: types[1], name}
    } else if (['long', 'unsigned', 'double'].indexOf(types[0]) !== -1) {
      type = {type: types[types.length - 1], name}
    } else if (types[0] === 'id') {
      if (types[1]) {
        type = {type: types[1].slice(1, -1), name}
      } else {
        // console.log("can't know automatically", name)
        type = {type: null, name} // TODO can't do this automatically
      }
    } else {
      if (types.length > 1) {
        console.log('LOTS OF TYPES', types)
      }
      type = {type: types[0], name}
    }
    props.push(type)

  } else if (instruct) {
    if (line.match(/^};$/)) {
      instruct = false
      return
    }
    const parts = line.trim().slice(0, -1).split(/\s+/g)
    if (parts[0] === 'struct') {
      if (parts.length !== 3) console.log('weird struct struct', parts)
      props.push({type: parts[1], name: parts[parts.length - 1]})
    } else {
      if (parts.length !== 2 && ['unsigned', 'long'].indexOf(parts[0]) === -1) console.log('weird struct', parts)
      props.push({type: parts[0], name: parts[parts.length - 1]})
    }

  } else if (line.match(/^struct .*?{\s*$/)) {
    props = []
    const name = line.split(/\s+/g)[1]
    structs[name] = instruct = {name, properties: props}
    return
  } else if (line.match(/^@interface /)) {
    const [_, name, __, superclass] = line.match(/^@interface\s+(\w+)\s*(:\s+(\w+))?/) || []
    if (!name) {
      console.log('weird interface', line)
      fail
    }
    props = []
    ifaces[name] = inface = {name, superclass, properties: props}
  }
})

fs.writeFileSync('parse.json', JSON.stringify({structs, ifaces}, null, 2), 'utf8')
