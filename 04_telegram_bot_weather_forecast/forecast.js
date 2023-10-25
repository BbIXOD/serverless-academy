'use strict'
// file responds for interraction with weather api
import axios from 'axios'

const apiKey = process.env.WEATHER_API_KEY
const forecastLimit = process.env.FORECAST_LIMIT

// get location by city name
const getLocation = async (city) => {
  const url = 'http://api.openweathermap.org/geo/1.0/direct?' +
    `q=${city}&appid=${apiKey}`
  const response = await axios.get(url)
  const data = response.data[0]

  const prepared = {
    lat: data.lat,
    lon: data.lon
  }
  return prepared
}

// cache results of async function (unexpected)
const cacheAsyncFunction = callback => {
  const results = {}
  return async (...args) => {
    if (results[args]) return results[args]

    const result = await callback(...args)
    results[args] = result
    return result
  }
}

const getLocationCached = cacheAsyncFunction(getLocation)

// get forecast by city name
const getHourlyForcast = async (city) => {
  if (!city) return 'Sorry, incorrect data, try again, maybe we lost city '

  const { lat, lon } = await getLocationCached(city)

  const url = 'https://api.openweathermap.org/data/2.5/forecast?' +
  `lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=current,minutely,daily,alerts`
  const response = await axios.get(url)
  return response.data.list
}

// get + prepare data for further use
export const preparedForecast = async (interval, city) => {
  const forecast = await getHourlyForcast(city)

  const result = forecast
    .splice(0, forecastLimit) // or move it to controller?
    .filter((_item, index) => index % interval === 0)
    .map(item => ({
      time: item.dt_txt,
      temperature: item.main.temp,
      weather: item.weather[0].description
    }))
  return result
}
