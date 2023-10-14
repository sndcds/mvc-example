import { Model } from '@sndcds/mvc'


export class AppModel extends Model {
  constructor() {
    super()
    this.data = null
  }

  bindDataChanged(callback) {
    this.onDataChanged = callback
  }

  setDataObject(data) {
    this.data = data
    this.setStorage('data', data)
  }
}