import { Component } from '@sndcds/mvc'


export default class DemoComponent extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)
    this.demoProperty = 0

    this.setProperties(setupData)
  }

  defaultClass() {
    return 'custom-demo-component'
  }

  propertyNames() {
    return super.propertyNames(['demoProperty'])
  }

  setMessage(message) {
    if (this.e) {
      if (this.childs.length < 1) {
        this.e.innerHTML = `<p>${this.id}<p>`
      }
      // this.e.style.backgroundColor = '#88a';
    }

    this.childs.forEach((item) => {
      item.setMessage(message)
    })
  }

  build() {
    this.e = this.addDomElement('p')
    this.e.innerText = 'Hello'
    this.e.style.backgroundColor = '#999'
    this.buildChilds()
  }
}