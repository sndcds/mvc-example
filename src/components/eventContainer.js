import { Component } from '@sndcds/mvc'
import { EventView } from './../index.js'


export class EventContainer
  extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)

    this.setProperties(setupData)
  }

  getPropertyNames() {
    const names = ['eventData']

    return super.getPropertyNames(names)
  }

  propertiesChanged() {
    if (this.e !== null) {
      this.e.innerText = this.label
    }
  }

  build() {
    this.e = this.addDomElement('div')
  }

  handleMessage(message) {
    this.handleNewEvents(message.eventData)
  }

  handleNewEvents(data) {
    const events = data.events

    events.forEach((eventData, i) => {
      const eventView = new EventView(this, `event-view-${i}`, { tag: i, eventData, classList: 'event-view' })
      eventView.build()
    })
  }
}