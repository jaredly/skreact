// @flow

import {spawn} from 'child_process'
import fs from 'fs'

import {stateFromImportedData} from './utils/storage'

const coscript = require('electron').remote.require('coscript')
const pluginBase = '/Users/jared/khan/skreact/scripts'
const dumpDest = `${pluginBase}/dump.json`
const scriptPath = `${pluginBase}/export.sketchplugin`
const command = `${coscript} -e "[[[COScript app:\\\"Sketch\\\"] delegate] runPluginAtURL:[NSURL fileURLWithPath:\\\"${scriptPath}\\\"]]"`


export default () => {
  return new Promise((res, rej) => {
    if (fs.existsSync(dumpDest)) {
      fs.unlinkSync(dumpDest)
    }

    const cmd = spawn(command, {shell: true});

    cmd.stdout.on('data', (data) => {
      console.log(`stdout: ${data.toString()}`);
    });

    cmd.stderr.on('data', (data) => {
      console.log(`stderr: ${data.toString()}`);
    });

    cmd.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      fs.readFile(dumpDest, 'utf8', (err, text) => {
        if (err) return rej(err)
        try {
          const data = JSON.parse(text)
          res(stateFromImportedData(data))
        } catch (e) {
          console.log('parsing failed')
          rej(e)
        }
      })
    });

    cmd.on('error', err => {
      rej(err)
    })

    /*
    exec(command, (err, stdout, stderr) => {
      console.log('err', err)
      console.log('out', stdout)
      console.log('errr', stderr)
      if (err) return rej(err)
    })
    */
  })
}