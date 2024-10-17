<script setup>
import { onMounted, ref, watch } from 'vue'
import { useCsvStore } from '../stores/csv'
import useMap from '../composables/useMap'
import useGeo from '../composables/useGeo'
import serviceList from '../assets/serviceList.json'

const filterService = ref([
  'single-famiice',
  'two-famiice',
  'chubby-famiice',
  'mont-blanc-famiice'
])

const {
  init, resetMarker
} = useMap(filterService)

watch(filterService, resetMarker)

const { fetchStore } = useCsvStore()
const { doFetch: fetchGeo, result } = useGeo()
onMounted(async () => {
  await fetchGeo()
  const center = [result.value.location.lat, result.value.location.lng]
  await Promise.all([init(center), fetchStore()])
  resetMarker()
})
</script>

<template>
<div class="grid gap-10 md:grid-cols-[1fr_3fr] container mx-auto">
  <section class=" md:col-start-2">
    <div class="aspect-video" id="map"></div>
  </section>
  <aside class=" md:col-start-1 md:row-start-1">
    <h3 class="text-center font-title md:text-left mb-4">服務項目</h3>
    <ul class=" flex md:block items-center justify-center gap-4">
      <li v-for="(value, key) in serviceList">
        <label class="cursor-pointer hover:opacity-80">
          <input class="sr-only peer" v-model="filterService" type="checkbox" :value="key">
          <i v-if="filterService.includes(key)" class='bx bx-check-square peer-checked:text-primary align-middle' ></i>
          <i v-else class='bx bx-square peer-checked:text-primary align-middle'></i>
          <span class="inline-block peer-checked:text-primary align-middle">{{ value }}</span>
        </label>
      </li>
    </ul>
  </aside>
</div>
</template>