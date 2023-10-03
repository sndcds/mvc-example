import { Component } from '@sndcds/mvc'


/**
 * Component for displaying a label, value, bar and percentage.
 * Can be used for displaying numeric information, i. e. of statistics and other number related contexts.
 *
 * @since 20.9.2023
 */
export default class VBarsView extends Component {
  constructor(parent, id, setupData) {
    super(parent, id, setupData)
    this.heights = [10, 20, 100, 30, 2, 10, 60, 50, 10, 39, 54, 12, 30]
    this.setProperties(setupData)
  }

  defaultClass() {
    return 'custom-vbars'
  }

  propertyNames() {
    return super.propertyNames()
  }

  build() {
    this.e = this.addDomElement('div')
    this.e.style.display = 'grid'
    this.e.style.gridTemplateColumns = 'repeat(13, 1fr)'

    this.heights.forEach((height) => {
      height = Math.floor(Math.random() * 90 + 10)
      const a = this.e.appendChild(this.domCreateElement('div'))
      a.style.height = `${height}%`
      a.style.position = 'relative'
      a.style.top = `${100 - height}%`
    })


    this.buildChilds()
  }
}