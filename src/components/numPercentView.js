import { Component } from '@sndcds/mvc'


/**
 * Component for displaying a label, value, bar and percentage.
 * Can be used for displaying numeric information, i. e. of statistics and other number related contexts.
 *
 * @since 20.9.2023
 */
export default class NumPercentView extends Component {
  /**
     * Create a NumPercentView.
     *
     * @param {Component} parent - The parent component.
     * @param {String} id - The id of the new Component.
     * @param {any} setupData - Optional set up data.
     */
  constructor(parent, id, setupData) {
    super(parent, id, setupData)
    this.label = 'Label'
    this.value = 100
    this.percentage = 10
    this.barOffset = 0
    this.barColor1 = '#999'
    this.barColor2 = '#333'

    this.setProperties(setupData)
  }

  defaultClass() {
    return 'custom-num-percent'
  }

  /**
     *  Build the DOM Elements for HTML rendering og the component.
     *
     *  This method mus be overridden in derived classes.
     *
     *  Styling:
     *  One solution is to assign classes to the emelemts.
     */
  build() {
    this.e = this.addDomElement('div')

    let a = this.e.appendChild(this.domCreateElement('div'))
    a.style.textAlign = 'center'
    a.innerText = this.label
    a.className = this.prefixedClassName('label')

    a = this.e.appendChild(this.domCreateElement('div'))
    a.style.textAlign = 'center'
    a.innerText = this.value
    a.className = this.prefixedClassName('value')

    const gradient = this.gradient()

    a = this.e.appendChild(this.domCreateElement('div'))
    a.style.textAlign = 'left'
    a.style.background = gradient
    a.className = this.prefixedClassName('bar')

    a = this.e.appendChild(this.domCreateElement('div'))
    a.style.textAlign = 'center'
    a.innerText = `${this.percentage} %`
    a.className = this.prefixedClassName('percentage')

    this.buildChilds()
  }

  propertyNames() {
    const names = [
      'label',
      'value',
      'percentage',
      'barOffset',
      'barColor1',
      'barColor2'
    ]

    return super.propertyNames(names)
  }

  propertiesChanged() {
    if (this.e !== null) {
      this.e.children.item(1).innerText = this.value
      this.e.children.item(2).style.background = this.gradient()
      this.e.children.item(3).innerText = `${this.percentage} %`
    }
  }


  gradient() {
    const p = parseFloat(this.percentage)
    const color1 = this.barColor1
    const color2 = this.barColor2
    const spot1 = `${this.barOffset}%`
    const spot2 = `${this.barOffset + 0.1}%`
    const spot3 = `${this.barOffset + p - 0.1}%`
    const spot4 = `${this.barOffset + p}%`
    return `linear-gradient(90deg, ${color1} 0%, ${color1} ${spot1}, ${color2} ${spot2}, ${color2} ${spot3}, ${color1} ${spot4})`
  }
}