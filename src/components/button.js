import { Component } from '@sndcds/mvc'


export default class Button extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)

    this.label = 'Button'
    this.onClick = undefined

    this.setProperties(setupData)
  }

  defaultClass() {
    return 'custom-button'
  }

  propertyNames() {
    const names = [
      'label', 'onClick'
    ]
    return super.propertyNames(names)
  }

  propertiesChanged() {
    if (this.e !== null) {
      this.e.innerText = this.label
    }
  }

  build() {
    this.e = this.addDomElement('button')
    this.e.innerText = this.label

    this.buildChilds()

    this.e.addEventListener('click', () => this.onClick(this))
    // this.e.addEventListener('click', this.onClick)
  }
}