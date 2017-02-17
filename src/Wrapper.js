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

const setupMenu = (items) => {
  const {Menu} = require('electron').remote
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(items)
  )
}

const browserWindow = require('electron').remote.getCurrentWindow()

const defaultMenuItems: any = [{
  label: 'Always on top',
  type: 'checkbox',
  checked: browserWindow.isAlwaysOnTop(),
  click: (item) => {
    browserWindow.setAlwaysOnTop(item.checked)
    // item.checked = !item.checked
  }
}, {
  role: 'reload',
}, {
  role: 'toggledevtools',
}, {
  role: 'quit',
}]

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
    setupMenu([{
      label: 'File',
      submenu: defaultMenuItems,
    }])
  }

  componentDidUpdate(prevProps, prevState) {
    const prevLoaded = prevState.initialProjectData && prevState.selectedProject
    const nowLoaded = this.state.initialProjectData && this.state.selectedProject
    if (prevLoaded && !nowLoaded) {
      setupMenu([{
        label: 'File',
        submenu: defaultMenuItems,
      }])
    } else if (nowLoaded && !prevLoaded) {
      setupMenu([{
        label: 'File',
        submenu: [{
          label: 'Close project',
          click: () => this.setState({initialProjectData: null, selectedProject: null})
        }, {
          type: 'separator',
        }, ...defaultMenuItems],
      }])
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
  saveData = (data: SkreactFile): Promise<void> => {
    if (!this.state.selectedProject) return Promise.reject(new Error("State error: no open project"))
    return storage.saveDataInFolder(this.state.selectedProject, data)
  }

  loadProject = (folder: string) => {
    let found = false
    const projectHistory = this.state.projectHistory.map(item => item.folder === folder
      ? (found = true, {folder, lastOpened: Date.now()})
      : item
    )
    if (!found) {
      projectHistory.push({folder, lastOpened: Date.now()})
    }
    this.setState({selectedProject: folder})
    return storage.loadDataFromFolder(folder)
      .then(
        data => {
          save(PROJECT_HISTORY, projectHistory)
          this.setState({selectedProject: folder, projectHistory})
          this.setState({initialProjectData: data})
        },
        err => (console.error(err), this.setState({loadingError: `Unable to load from ${folder}`}))
      )
  }

  importFromSketch = () => {
    this.setState({importing: true})
    sketchImport().then(
      data => this.setState({initialProjectData: data, importing: false }),
      err => {
        console.log('import failed', err)
        this.setState({importing: false, importError: "Unable to import from sketch"})
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

  openProject = () => {
    const {remote} = require('electron')
    let folder = remote.dialog.showOpenDialog({
      title: 'Select ProtoReact project',
      defaultPath: process.env.HOME,
      properties: ['openFile'],
      filters: [{name: 'ProtoReact projects', extensions: ['skreact']}]
    })
    if (!folder || folder.length !== 1) return
    if (!folder[0].match(/\.skreact$/)) {
      return
    }
    this.loadProject(folder[0])
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

  renderNewProject() {
    const {newProjectLocation} = this.state
    const isValidLocation = !!newProjectLocation.match(/\.skreact$/)
    return <div className={css(styles.newProject)}>
      <div className={css(styles.newProjectTitle)}>
        Create a new project
      </div>
      <div className={css(styles.extensionNote)}>
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
    return <div className={css(styles.container)}>
      <div className={css(styles.inner)}>
        <button
          className={css(styles.openbutton)}
          onClick={this.openProject}
        >
          Open existing project
        </button>
        {projectHistory.length > 0 &&
        <div className={css(styles.recentList)}>
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
        {this.renderNewProject()}
      </div>
    </div>
  }
}

const projectName = item => item.split('/').slice(-1)[0].split('.').slice(0, -1).join('.')

const button = {
    padding: '6px 20px',
    border: 'none',
    boxShadow: '0 1px 3px #aaa',
    backgroundColor: '#eee',
    borderRadius: 3,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.highlight,
      color: 'white',
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  inner: {
    flexShrink: 1,
    marginTop: 20,
    marginBottom: 20,
  },

  newProjectTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    padding: '5px 10px',
    textAlign: 'center',
  },

  extensionNote: {
    fontSize: '70%',
    padding: '4px 0',
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
    fontSize: 12,
    lineHeight: '20px',
    paddingLeft: 4,
    border: '1px solid #ccc',
    borderRadius: 3,
    marginRight: 10,
  },

  newProjectPrompt: {
    fontSize: '80%',
    padding: '10px 0',
  },

  browseButton: {
    ...button,
  },

  openbutton: {
    ...button,
    alignSelf: 'center',
    marginBottom: 10,
  },

  importButton: {
    alignSelf: 'center',
    padding: '7px 20px',
    ...button,
  },

  inputLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  recentList: {
    alignSelf: 'stretch',
    border: '1px solid #ccc',
    borderRadius: 3,
    overflow: 'auto',
    flex: 1,
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