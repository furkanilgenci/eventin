import axios from 'axios'

export default async function resolveLocation(address, apiKey) {
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&fields=formatted_address,name,geometry&key=${apiKey}`
  const response = (await axios.post(endpoint)).data

  if (response.status == 'ZERO_RESULTS') throw new Error(`Can't resolve provided location`)

  const [result] = response.results

  return {
    data: {
      address: result.formatted_address,
      coordinates: [result.geometry.location.lat, result.geometry.location.lng],
    },
  }
}
