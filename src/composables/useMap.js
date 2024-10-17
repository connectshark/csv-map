import L from 'leaflet'
import { ref, onBeforeUnmount, watchEffect } from 'vue'
import useDistance from '../composables/useDistance'

export default (filterList) => {
  const map = ref(null)
  const marketIcon = ref(null)
  const markersGroup = ref(null)
  const iceIcon = ref(null)

  const {
    filterPointsBounds
  } = useDistance()

  const resetMarker = () => {
    const bounds = map.value.getBounds()
    let list = filterPointsBounds(bounds)
    const hasFilter = filterList.value.length >= 1
    if (hasFilter) {
      list = list.map(shop => {
        const ice = shop.service.some(service => {
          return filterList.value.includes(service)
        })
        return{
          ...shop,
          ice: ice
        } 
      })
    }
    markersGroup.value.clearLayers()
    list.forEach(place => {
      const icon = place.ice ? iceIcon.value : marketIcon.value
      const marker = L.marker([place.lat, place.lng], {
        icon: icon
      }).bindTooltip(place.name)
      markersGroup.value.addLayer(marker)
    })
  }

  const init = async (center) => {
    map.value = L.map('map', {
      zoom: 16,
      center: center || [25.023293, 121.468481],
      renderer: L.canvas()
    })
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 14,
      bounds:[
        [19.715015145512087, 117.49902343749999],
        [26.892679095908164, 123.969482421875]
      ],
      attribution: ''
    }).addTo(map.value)
    const user = L.icon({
      iconUrl: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_7.png',
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    })
    L.marker(center, {
      icon: user
    }).bindPopup('Hi，大概的位置').addTo(map.value).openPopup()
    marketIcon.value = L.icon({
      iconUrl: '/familymart.svg',
      iconSize: [30, 30],
      popupAnchor: [0, -10]
    })
    iceIcon.value = L.icon({
      iconUrl: '/ice-cream.svg',
      iconSize: [30, 30],
    })
    markersGroup.value = L.layerGroup().addTo(map.value)
    map.value.on('moveend', resetMarker)
    map.value.on('resize', resetMarker)
  }


  onBeforeUnmount(() => {
    map.value.remove()
  })

  return {
    init,
    resetMarker
  }
}