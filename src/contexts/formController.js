import { ContextController, Model, View, Component } from '@sndcds/mvc'
import { App, Button, HTMLArea } from './../index.js'


export class FormController extends ContextController {
  /* eslint no-useless-constructor: 0 */
  constructor(app) {
    super(app)

    this.prepareView()
    this.buildView('#context-root')
  }

  onDataChanged(data) {
  }

  handleEvent(component) {
    this.app.router.loadRouteByName(component.routeName)
  }

  prepareView() {
    this.model = new Model()
    this.view = new View()

    new Button(this.view, 'button-to-home', { label: 'Home', routeName: 'home', events: [{ type: 'click', handler: this }] })
    new Button(this.view, 'button-to-data', { label: 'Data', routeName: 'data', events: [{ type: 'click', handler: this }] })

    new HTMLArea(this.view, 'html-area', { html: '<h1>Hello World, i am The Form Context.</h1>' })
  }
}