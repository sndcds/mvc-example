import { View, Controller, Component, Router } from '@sndcds/mvc'


export default class App extends Controller {
    /* eslint no-useless-constructor: 0 */
    constructor(model, view) {
        super(model, view)
    }

    initApp(url, id) {
        this.data = this.model.getStorage('data')
        this.districtId = this.model.getStorage('districtId')

        if (this.districtId === null) {
            this.model.setDistrictId(id)
        }
        else {
            this.model.setDistrictId(this.districtId)
        }

        if (this.data === null) {
            this.fetchData(url)
        }
        else {
            // this.state.onDataChanged(this.data)
        }
    }
}