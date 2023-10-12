import { Model, View, Router, Controller, Component, GridComponent } from '@sndcds/mvc'
import { App, AppModel, HomeController, DataController, FormController } from './index.js'

// Create model
const model = new AppModel()

// Create view
const view = new View()

// Create an instance of App with the model and view
const app = new App(model, view)

// Define routes object with path and name
const routes = [
  { path: '/', controller: 'homeController' },
  { path: '/data', controller: 'dataController' },
  { path: '/form', controller: 'formController' }
]

const homeController = () => {
  new HomeController(app)
}

const dataController = () => {
  new DataController(app)
}

const formController = () => {
  new FormController(app)
}

// Create an object that maps controller names to controller functions.
const controllers = {
  homeController,
  dataController,
  formController
}

// Create an instance of Router
const router = new Router(app, routes, controllers)
router.start()

// Configure app
app.configurate({ 'locale': 'de-DE' })
app.buildView('root')

// Init app, must be called after configurate and buildView
app.initApp('./details.json', 13)