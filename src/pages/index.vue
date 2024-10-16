<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useMap from '../composables/useMap'
import { useCsvStore } from '../stores/csv'


const {
  init, removeMap, resetMarker
} = useMap()

const { fetchStore } = useCsvStore()
onMounted(async () => {
  await Promise.all([init(), fetchStore()])
  resetMarker()
})

onBeforeUnmount(removeMap)
</script>

<template>
<section class="container mx-auto">
  <div class=" h-svh" id="map"></div>
</section>
</template>

<style scoped>
</style>