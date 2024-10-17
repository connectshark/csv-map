import { ref } from 'vue'

export default () => {
  const loading = ref(false)
  const result = ref(null)
  const API_KEY = import.meta.env.VITE_IP_API_KEY
  const doFetch = async () => {
    loading.value = true
    const fetch_response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${ API_KEY }`)
    const res = await fetch_response.json()
    result.value = res
    loading.value = false
  }
  
  return {
    loading,
    result,
    doFetch
  }
}