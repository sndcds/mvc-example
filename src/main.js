import { Model, View, Router, Controller, Component } from '@sndcds/mvc'
import { App, AppModel, HomeController, DataController, FormController, MapController, HTMLArea } from './index.js'


// Create model
const model = new AppModel()

// Create view
const view = new View()

// Create an instance of App with the model and view
const app = new App(model, view)


const homeRouteHandler = () => {
  new HomeController(app)
}

const dataRouteHandler = () => {
  new DataController(app)
}

const formRouteHandler = () => {
  new FormController(app)
}

const mapRouteHandler = () => {
  new MapController(app)
}

// Define routes object with path and name
const routes = [
  { name: 'home', path: '/', title: 'Home', inject: '#context-root', handler: homeRouteHandler },
  { name: 'data', path: '/data', title: 'Data', inject: '#context-root', handler: dataRouteHandler },
  { name: 'form', path: '/form', title: 'Form', inject: '#context-root', handler: formRouteHandler },
  { name: 'map', path: '/map', title: 'Map', inject: '#context-root', handler: mapRouteHandler }
]


// Create an instance of Router
const router = new Router(app, routes)
router.start('home')

// Configure app
app.configurate({ 'locale': 'de-DE' })

// Build view, not necessary when app uses contexts
new HTMLArea(app.view, 'html-area', { html: '<h1>@sndcds/mvc-example</h1>' })
app.buildView('#root')

// Init app, must be called after configurate and buildView
app.initApp()