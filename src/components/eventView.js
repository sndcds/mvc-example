import { Component } from '@sndcds/mvc'


export class EventView
  extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)

    this.eventData = null

    this.setProperties(setupData)
  }

  getPropertyNames() {
    const names = ['eventData']
    return super.getPropertyNames(names)
  }

  propertiesChanged() {
  }

  build() {
    this.e = this.addDomElement('div')
    const event = this.eventData
    this.e.innerHTML += `<p>${this.tag}</p>`
    this.e.innerHTML += `<h1>${event.title}</h1>`
    this.e.innerHTML += `<p>${event.date} / ${event.time} / ${event.price}</p>`
    this.e.innerHTML += `<p>${event.description}<br>`
    this.e.innerHTML += `${event.venue.name}<br>`
    this.e.innerHTML += `${event.venue.address}<br>`
    this.e.innerHTML += `${event.links.website}<br>`
    this.e.innerHTML += `${event.links.tickets}</p>`

    const imgUrl = './oklabflensburg_logo.svg'
    this.e.innerHTML += `<img src="${imgUrl}" width="80"/>`
  }
}