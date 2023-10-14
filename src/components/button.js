import { Component } from '@sndcds/mvc'


export class Button extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)

    this.label = 'Button'

    this.setProperties(setupData)
  }

  getPropertyNames() {
    const names = ['label']
    return super.getPropertyNames(names)
  }

  propertiesChanged() {
    if (this.e !== null) {
      this.e.innerText = this.label
    }
  }

  build() {
    this.e = this.addDomElement('button')
    this.e.innerText = this.label
  }
}