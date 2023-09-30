import { Component, GridComponent } from '@sndcds/mvc'
import { DistrictSelectComponent, PopComponent } from './index.js'


export default class StateController {
    constructor(app) {
        this.app = app
        app.state = this

        this.buildView()
        if (app.model.data === null) {
            app.fetchData('./details.json')
        }
    }

    onDataChanged(data) {
        this.app.model.setDataObject(data)
        this.app.model.setDistrictObject(this.app.model.districtId)

        if (this.app.state !== null) {
            this.app.state.onDistrictChanged = this.app.state.onDistrictChanged.bind(this)  // TODO: Description!
        }

        const d = { 'data': this.app.model.data, 'districtId': this.app.model.districtId }
        this.app.setProperties('districtSelect', d)
        const c = this.app.componentById('districtSelect')
        c.bindDistrictChanged(this.app.onDistrictChanged)
        // this.renderAgeSection()
    }

    onDistrictChanged(id) {
        this.app.model.setDistrictId(id + 1)
        this.app.model.setDistrictObject(id + 1)
        // this.renderAgeSection()
    }

    buildView() {
        // Create a GridComponent called 'container1' within the view
        const container1 = new GridComponent(this.app.view, 'container1')
        const subView = new Component(container1, 'subView')
        const c = new DistrictSelectComponent(subView, 'districtSelect')
        // new TestComponent(subView, 'test1')

        const container2 = new GridComponent(this.app.view, 'container2')

        // Create a series of 'PopComponent' instances within 'container2'
        for (let i = 1; i <= 8; i++) {
            const labels = ['0 - 18', '18 - 30', '30 - 45', '45 - 65', '65 - 80', '80+', '0 - 8', '60+']
            new PopComponent(container2, `ageView${i}`, {
                'classPrefix': 'xyz',
                'label': labels[i - 1],
                'value': 123,
                'percentage': 87.3,
                'barOffset': 13.2,
                'barColor1': '#d1e4fd',
                'barColor2': '#0069f6'
            })
        }
    }

    renderAgeSection() {
        const items = [
            { id: 'ageView1', path: ['district_detail', '2021', 'age_groups', 'age_to_under_18'] },
            { id: 'ageView2', path: ['district_detail', '2021', 'age_groups', 'age_18_to_under_30'] },
            { id: 'ageView3', path: ['district_detail', '2021', 'age_groups', 'age_30_to_under_45'] },
            { id: 'ageView4', path: ['district_detail', '2021', 'age_groups', 'age_45_to_under_65'] },
            { id: 'ageView5', path: ['district_detail', '2021', 'age_groups', 'age_65_to_under_80'] },
            { id: 'ageView6', path: ['district_detail', '2021', 'age_groups', 'age_80_and_above'] },
            { id: 'ageView7', path: ['district_detail', '2021', 'age_groups', 'age_0_to_under_7'] },
            { id: 'ageView8', path: ['district_detail', '2021', 'age_groups', 'age_60_and_above'] }
        ]

        items.forEach((item) => {
            const c = this.app.componentById(item.id)
            const d = this.app.getNestedValue(this.app.model.districtObject, item.path)
            c.setProperties({ value: this.app.formatNumberWithDot(d) })
        })
    }

    renderDistrictSelect() {
        new DistrictSelectComponent()
    }
}