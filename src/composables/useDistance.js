import { useCsvStore } from '../stores/csv'

export default () => {
  const csv = useCsvStore()
  const filterPointsBounds = (bounds) => {
    return csv.stores.filter(place =>
      place.lat <= bounds._northEast.lat &&
      place.lat >= bounds._southWest.lat &&
      place.lng <= bounds._northEast.lng &&
      place.lng >= bounds._southWest.lng
    )
  }

  return {
    filterPointsBounds
  }
}