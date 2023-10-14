import { View, Controller, Component, Router } from '@sndcds/mvc'


export class App extends Controller {
  /* eslint no-useless-constructor: 0 */
  constructor(model, view) {
    super(model, view)
  }

  initApp(url) {
    this.data = this.model.getStorage('data')

    if (this.data === null) {
      if (typeof url === 'string') {
        this.fetchData(url)
      }
    }
    else {
      // this.state.onDataChanged(this.data)
    }
  }
}