import { Component } from '@sndcds/mvc'


export class HTMLArea extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)

    this.html = 'Hello World'

    this.setProperties(setupData)
  }

  getPropertyNames() {
    const names = ['html']
    return super.getPropertyNames(names)
  }

  propertiesChanged() {
    if (this.e !== null) {
      this.e.innerHTML = this.html
    }
  }

  build() {
    this.e = this.addDomElement('div')
    this.e.innerHTML = this.html
  }
}