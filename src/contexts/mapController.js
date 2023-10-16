import { Map as LeafletMap, Marker, tileLayer as leafletTileLayer } from 'leaflet'
import '../../node_modules/leaflet/dist/leaflet.css'

import { ContextController, Model, View, Component } from '@sndcds/mvc'
import { App, Button, MapComponent } from './../index.js'


export class MapController extends ContextController {
  /* eslint no-useless-constructor: 0 */
  constructor(app) {
    super(app)

    this.map = null

    this.prepareView()
    this.buildView('#context-root')
    this.initMap()
  }

  onDataChanged(data) {
  }

  handleEvent(component) {
    this.app.router.loadRouteByName(component.routeName)
  }

  prepareView() {
    this.model = new Model()
    this.view = new View()

    new Button(this.view, 'button-to-home', { label: 'Home', routeName: 'home', events: [{ type: 'click', handler: this }] })
    new MapComponent(this.view, 'map', { classList: 'mapContainer' })
  }

  initMap() {
    // Initialize map
    this.map = new LeafletMap('map', {
      maxZoom: 19
    }).setView([54.8057, 9.443], 13)

    leafletTileLayer.wms('https://sgx.geodatenzentrum.de/wms_basemapde?SERVICE=WMS&Request=GetCapabilities', {
      layers: 'de_basemapde_web_raster_grau',
      maxZoom: 19,
      attribution: '<a href="https://www.bkg.bund.de">GeoBasis-DE BKG</a> | <a href="https://creativecommons.org/licenses/by/4.0">CC BY 4.0</a>'
    }).addTo(this.map)
  }
}