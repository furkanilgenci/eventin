import axios from 'axios'

export default async function fetchWeatherForecast(coordinates, eventDate) {
  try {
    const endpoint = `https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=${coordinates[0]}&lon=${coordinates[1]}`
    const res = (await axios.get(endpoint)).data

    const eventTime = new Date(eventDate).getTime()

    // Find a forecast at maximum 6 hour before or after the event
    const forecast = res.properties.timeseries
      .map(x => {
        x.distance = Math.abs((eventTime - new Date(x.time)) / 3600000)
        return x
      })
      .sort((a, b) => a.distance - b.distance)[0]

    if (forecast.distance > 6) {
      return {
        image: null,
        text: 'Not available',
      }
    }

    const temperature = forecast.data.instant.details.air_temperature
    const unit = res.properties.meta.units.air_temperature
    const image = `/img/weather-icons/${forecast.data.next_6_hours.summary.symbol_code}.svg`

    return {
      image,
      text: `${temperature} ${unit}`,
    }
  } catch (error) {
    return {
      image: null,
      text: 'Not available',
    }
  }
}
