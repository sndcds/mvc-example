import { ContextController, Model, View, Component } from '@sndcds/mvc'
import { App, Button, EventContainer } from './../index.js'


export class DataController extends ContextController {
  constructor(app) {
    super(app)

    this.prepareView()
    this.buildView('#context-root')

    this.app.fetchJsonData('./events.json') // TODO: Create app config file by environment
  }

  onDataChanged(data) {
    this.sendMessageToComponent('event-view-1', { eventData: data })
  }

  handleEvent(component) {
    this.app.router.loadRouteByName(component.routeName)
  }

  prepareView() {
    this.model = new Model()
    this.view = new View()

    new Button(this.view, 'button-to-home', { label: 'Home', routeName: 'home', events: [{ type: 'click', handler: this }] })
    new Button(this.view, 'button-to-form', { label: 'Form', routeName: 'form', events: [{ type: 'click', handler: this }] })

    new EventContainer(this.view, 'event-view-1', { classList: 'event-container, grid-4-2-1' })
  }
}