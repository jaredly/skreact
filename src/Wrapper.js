// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import App from './App'

import {colors} from './styles'
import {initialImport, loadSavedState, saveState} from './utils/storage'

import type {SkreactFile} from './utils/types'

const PROJECT_HISTORY = 'skreact:project-history'

const save = (key, val) => localStorage[key] = JSON.stringify(val)
const tryLoad = key => {
  try {
    return JSON.parse(localStorage[key])
  } catch (e) {
    return null
  }
}

const projectHistory = tryLoad(PROJECT_HISTORY)

export default class AppWrapper extends Component {
  state: {
    projectHistory: {
      folder: string,
      lastOpened: number,
    }[],
    selectedProject: ?string,
    initialProjectData: ?SkreactFile,
    newProjectLocation: ?string,
    importError: ?string,
    loadingError: ?string,
    importing: boolean,
  }

  constructor() {
    super()
    this.state = {
      projectHistory: tryLoad(PROJECT_HISTORY) || [],
      newProjectLocation: '',
      selectedProject: null,
      initialProjectData: null,
      importError: null,
      loadingError: null,
      importing: false,
    }
  }

  // TODO maybe save both to localstorage and to file?
  // and save to file only on command?
  // dunno whether people would be mad
  saveData = (data: SkreactFile) => {
    storage.saveDataInFolder(this.state.selectedProject, data)
  }

  loadProject = (folder: string) => {
    save(PROJECT_HISTORY, this.state.projectHistory.map(item => item.folder === folder
      ? {folder, lastOpened: Date.now()}
      : item
    ))
    this.setState({selectedProject: folder})
    storage.loadDataFromFolder(folder)
      .then(
        data => this.setState({initialProjectData: data}),
        err => (console.error(err), this.setState({loadingError: `Unable to load from ${folder}`}))
      )
  }

  doImport = () => {
    loadSavedState()
      // .then(data => data || initialImport()) // TODO remove
      .then(data => this.setState({loading: false, data}))
    this.setState({data: initialImport()})
  }

  _render() {
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    if (!this.state.data) {
      return <div>
        To get started, import something
        <button
          onClick={this.doImport}
        >
          Import
        </button>
        Note: currently this only imports data that was pre-exported from sketch.
        In future we'll grab it from the currently opened sketch file.
      </div>
    }
    return <App initialData={this.state.data} />
  }

  importFromSketch = () => {
    this.setState({importing: true})
  }

  browse = () => {
    const {remote} = require('electron')
    let file = remote.dialog.showSaveDialog({
      title: 'Select save location',
      defaultPath: process.env.HOME,
    })
    if (!file) return
    if (!file.match(/\.skreact$/)) {
      file += '.skreact'
    }
    this.setState({newProjectLocation: file})
  }

  render() {
    if (this.state.selectedProject) {
      if (this.state.loadingError) {
        return <div>
          Error loading
          <button onClick={() => this.setState({selectedProject: null})}>
            Load another project
          </button>
        </div> // TODO
      }
      if (this.state.initialProjectData) {
        return <App
          initialData={this.state.initialProjectData}
          saveData={this.saveData}
        />
      }
      return <div>Loading...</div>
    }

    const {projectHistory, newProjectLocation} = this.state
    return <div className={css(styles.container)}>
      {projectHistory.length > 0 && <div className={css(styles.recentList)}>
        {this.state.projectHistory.map(item => (
          <div className={css(styles.recentProject)}>
            {projectName(item.folder)}
          </div>
        ))}
      </div>}
      <div className={css(styles.newProject)}>
        <div className={css(styles.inputLine)}>
          <input
            type="text"
            value={this.state.newProjectLocation}
            className={css(styles.input)}
            onChange={e => this.setState({newProjectLocation: e.target.value})}
            placeholder="New project location"
          />
          <button
            className={css(styles.browseButton)}
            onClick={this.browse}
          >
            Browse
          </button>
        </div>
        <div className={css(styles.newProjectPrompt)}>
          Make sure Sketch is open & the artboard you want to import is selected.
        </div>
        {this.state.importing
         ? <div >Importing....<progress /></div> // TODO show progress bar or something
         : <button
              onClick={this.importFromSketch}
              className={css(styles.importButton)}
            >
              Import artboard
            </button>}
        {this.state.importError &&
          <div className={css(styles.importError)}>
            {this.state.importError}
          </div>}
      </div>
    </div>
  }
}

const projectName = item => item.split('/').slice(-1)[0].split('.').slice(0, -1).join('.')

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  input: {
    flex: 1,
  },

  newProjectPrompt: {
    fontSize: '80%',
    padding: '10px 0',
  },

  importButton: {
    alignSelf: 'center',
  },

  inputLine: {
    flexDirection: 'row',
    alignItems: 'center',
  }

})