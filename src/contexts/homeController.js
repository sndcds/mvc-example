import { ContextController, Model, View, Component, Router } from '@sndcds/mvc'
import { App, Button, HTMLArea } from './../index.js'


export class HomeController extends ContextController {
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

    new HTMLArea(this.view, 'html-area', { html: '<h1>Hello World, you are at home :-)</h1>' })
    new HTMLArea(this.view, 'html-area', { html: '<p>Please click a button...</p>' })

    new Button(this.view, 'button-to-form', { label: 'Form', routeName: 'form', events: [{ type: 'click', handler: this }] })
    new Button(this.view, 'button-to-data', { label: 'Data', routeName: 'data', events: [{ type: 'click', handler: this }] })
  }
}