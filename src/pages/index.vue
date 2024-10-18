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

const { init, resetMarker, panTo } = useMap(filterService)
watch(filterService, resetMarker)
const { fetchStore } = useCsvStore()
const { doFetch: fetchGeo, result, loading,  error: geoError, success: geoSuccess } = useGeo()

const requestGeo = async () => {
  await fetchGeo()
  if (geoError.value) {
    return
  }
  panTo(result.value)
}

onMounted(async () => {
  await Promise.all([init(), fetchStore()])
  resetMarker()
})
</script>

<template>
<div class="grid gap-10 md:grid-cols-[1fr_3fr] md:w-11/12 mx-auto max-w-5xl">
  <section class="md:col-start-2">
    <div class="aspect-square md:aspect-video mb-4" id="map"></div>
    <div>
      <p class=" text-right w-11/12 md:w-full mx-auto">
        <span v-if="geoSuccess"><i class='bx bxs-navigation align-middle bx-sm'></i>取得成功</span>
        <button v-else :disabled="loading" @click="requestGeo" class="inline-block p-2 rounded-xl bg-primary/10 disabled:bg-gray-100" type="button">
          <i v-if="loading" class='bx bx-target-lock align-middle bx-sm'></i>
          <i v-else class='bx bx-map-pin align-middle'></i>
          <span class=" text-amber-600" v-if="geoError">取得位置失敗</span>
          <span v-else-if="loading">取得位置中</span>
          <span v-else>使用當前位置</span>
        </button>
      </p>
    </div>
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