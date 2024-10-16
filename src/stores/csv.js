import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCsvStore = defineStore('csv', () => {
  const stores = ref([])

  const fetchStore = async () => {
    const fetch_response = await fetch('https://cdn.jsdelivr.net/gh/Minato1123/taiwan-cvs-map@main/src/assets/json/f_data.json')
    const data = await fetch_response.json()
    stores.value = data
  }

  return { stores, fetchStore }
})
