// @flow

import React, {Component} from 'react'
import {css, StyleSheet} from 'aphrodite'

import App from './App'

import {colors} from './styles'
import * as storage from './utils/storage'
import sketchImport from './sketchImport'

import type {SkreactFile} from './utils/types'

const PROJECT_HISTORY = 'skreact:project-history'

const save = (key, val) => localStorage[key] = JSON.stringify(val)
const tryLoad = key => {
  try {
    return JSON.parse(localStorage[key] || '')
  } catch (e) {
    return null
  }
}

const projectHistory = tryLoad(PROJECT_HISTORY)

type ProjectHistory = {
  folder: string,
  lastOpened: number,
}[]

export default class ProjectHistoryWrapper extends Component {
  state: {projectHistory: ?ProjectHistory} = {
    projectHistory: null
  }

  componentWillMount() {
    Promise.all((tryLoad(PROJECT_HISTORY) || []).map(storage.verifyProjectExists)).then(results => {
      this.setState({projectHistory: results.filter(x => x)})
    }, err => {
      this.setState({projectHistory: []})
    })
  }

  render() {
    if (!this.state.projectHistory) {
      return <div className={css(styles.loading)}>
        Loading...
      </div>
    }
    return <AppWrapper projectHistory={this.state.projectHistory} />
  }
}

class AppWrapper extends Component {
  state: {
    projectHistory: ProjectHistory,
    selectedProject: ?string,
    initialProjectData: ?SkreactFile,
    newProjectLocation: string,
    importError: ?string,
    loadingError: ?string,
    importing: boolean,
    creating: boolean,
  }

  constructor(props) {
    super()
    this.state = {
      projectHistory: props.projectHistory,
      newProjectLocation: '',
      selectedProject: null,
      initialProjectData: null,
      importError: null,
      loadingError: null,
      importing: false,
      creating: false,
    }
  }

  createProject = () => {
    const {newProjectLocation, initialProjectData} = this.state
    if (!newProjectLocation || !initialProjectData) return
    const folder = newProjectLocation
    const projectHistory = this.state.projectHistory.concat([{
      folder,
      lastOpened: Date.now(),
    }])
    this.setState({creating: true})
    storage.saveDataInFolder(folder, initialProjectData)
      .then(() => {
        save(PROJECT_HISTORY, projectHistory)
        this.setState({ projectHistory, newProjectLocation: '', selectedProject: folder })
      }, err => {
        console.error('failed to do it')
      });
  }

  // TODO maybe save both to localstorage and to file?
  // and save to file only on command?
  // dunno whether people would be mad
  saveData = (data: SkreactFile) => {
    if (!this.state.selectedProject) return
    storage.saveDataInFolder(this.state.selectedProject, data)
  }

  loadProject = (folder: string) => {
    save(PROJECT_HISTORY, this.state.projectHistory.map(item => item.folder === folder
      ? {folder, lastOpened: Date.now()}
      : item
    ))
    this.setState({selectedProject: folder})
    return storage.loadDataFromFolder(folder)
      .then(
        data => this.setState({initialProjectData: data}),
        err => (console.error(err), this.setState({loadingError: `Unable to load from ${folder}`}))
      )
  }

  importFromSketch = () => {
    this.setState({importing: true})
    sketchImport().then(
      data => this.setState({initialProjectData: data, importing: false }),
      err => {
        console.log('import failed', err)
        this.setState({importError: "Unable to import from sketch"})
      }
    )
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

  renderImporter() {
    return <div>
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
          reimportData={sketchImport}
        />
      }
      return <div className={css(styles.loading)}>Loading...</div>
    }

    const {projectHistory, newProjectLocation} = this.state
    const isValidLocation = !!newProjectLocation.match(/\.skreact$/)
    return <div className={css(styles.container)}>
      <div className={css(styles.inner)}>
      {projectHistory.length > 0 && <div className={css(styles.recentList)}>
        {this.state.projectHistory.map(item => (
          <div
            key={item.folder}
            className={css(styles.recentProject)}
            onClick={() => this.loadProject(item.folder)}
          >
            <div className={css(styles.name)}>
            {projectName(item.folder)}
            </div>
            <div className={css(styles.location)}>
            {item.folder}
            </div>
          </div>
        ))}
      </div>}
      <div className={css(styles.newProject)}>
        <div className={css(styles.extensionNode)}>
          Project location must end in '.skreact'
        </div>
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
        {this.state.initialProjectData
          ? <button
              onClick={this.createProject}
              disabled={!isValidLocation}
            >
              Create project
            </button>
          : this.renderImporter()}
      </div>
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

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    color: '#888',
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
  },

  recentList: {
    alignSelf: 'stretch',
    border: '1px solid #ccc',
    marginBottom: 30,
  },

  recentProject: {
    padding: '10px 20px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#eee',
    }
  },

  location: {
    fontSize: '80%',
  },

})