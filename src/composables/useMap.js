import L from 'leaflet'
import { ref } from 'vue'
import useDistance from '../composables/useDistance'

export default () => {
  const map = ref(null)
  const marketIcon = ref(null)
  const markersGroup = ref(null)

  const {
    filterPointsBounds
  } = useDistance()

  const resetMarker = () => {
    const bounds = map.value.getBounds()
    const list = filterPointsBounds(bounds)
    markersGroup.value.clearLayers()
    list.forEach(place => {
      const marker = L.marker([place.lat, place.lng], {
        icon: marketIcon.value
      }).bindTooltip(place.name, { direction: 'top' })
      markersGroup.value.addLayer(marker)
    })
  }

  const init = async () => {
    map.value = L.map('map', {
      zoom: 18,
      center: [25.023293, 121.468481],
      renderer: L.canvas()
    })
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        minZoom: 15,
        bounds:[
          [19.715015145512087, 117.49902343749999],
          [26.892679095908164, 123.969482421875]
        ],
      attribution: ''
    }).addTo(map.value)

    marketIcon.value = L.icon({
      iconUrl: '/familymart.svg',
      iconSize: [28, 20],
      popupAnchor: [0, -10],
      tooltipAnchor: [0, -10]
    })

    markersGroup.value = L.layerGroup().addTo(map.value)

    map.value.on('zoomend', resetMarker)
    map.value.on('moveend', resetMarker)
  }


  const removeMap = () => {
    map.value.remove()
  }

  return {
    init,
    removeMap,
    resetMarker
  }
}