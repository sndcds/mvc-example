import { Component, ContextController } from '@sndcds/mvc'
import { App } from './index.js'


export class DataController extends ContextController {
  /* eslint no-useless-constructor: 0 */
  constructor(app) {
    super(app)
  }

  onDataChanged(data) {
  }

  buildView() {
    console.log('dataController', this.app)
  }
}