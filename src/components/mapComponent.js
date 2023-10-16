import { Component } from '@sndcds/mvc'


export class MapComponent extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)

    this.setProperties(setupData)
  }

  getPropertyNames() {
    const names = []
    return super.getPropertyNames(names)
  }

  propertiesChanged() {
  }

  build() {
    this.e = this.addDomElement('div')
    this.e.id = 'map'
  }
}