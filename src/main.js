import { Model, View, Router, Controller, Component, GridComponent } from '@sndcds/mvc'
import { App, AppModel, TestComponent, DistrictSelectComponent, PopComponent, StateController } from './index.js'


// Create an instance of AppModel
const model = new AppModel()

// Create an instance of View
const view = new View()

// Create an instance of App with the model and view
const app = new App(model, view)

// Define routes object with path and name
const routes = [
    { path: '/', controller: 'demoController1' }
]

const demoController1 = () => {
    const a = new StateController(app)
}

// Create an object that maps controller names to controller functions.
const controllers = {
    demoController1
}

// Create an instance of Router
const router = new Router(app, routes, controllers)
router.start()

// Build the view in the HTML and append view to element with id `root`
app.buildView('root')

// Initialize the application with url and district id
app.initApp('./details.json', 13)