import { ref } from 'vue'

export default () => {
  const loading = ref(false)
  const result = ref([])
  const error = ref(false)
  const success = ref(false)

  const doFetch = () => {
    return new Promise((resolve) => {
      loading.value = true
      error.value = false
      const successHandler = (position) => {
        result.value = [position.coords.latitude, position.coords.longitude]
        success.value = true
        loading.value = false
        resolve()
      }
      const errorHandler = (err) => {
        error.value = true
        loading.value = false
        resolve()
      }
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
    })
  }
  
  return {
    loading,
    result,
    doFetch,
    error,
    success
  }
}