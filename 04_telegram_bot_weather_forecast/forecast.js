import axios from "axios";

const apiKey = process.env.WEATHER_API_KEY;

const getLocation = async (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?
    q=${city}&appid=${apiKey}`
  const response = await axios.get(url)

  const prepared = { 
    lat: response.lat,
    lon: response.lon
  }
  return prepared
}

const cacheAsyncFunction = callback => {
  const results = {}
  return async (...args) => {
    if (results[args]) return results[args]

    const result = await callback(...args)
    results[args] = result
    return result
  }
}

const getLocationCache = cacheAsyncFunction(getLocation)

const getForcast = async (hours, city) => {
  const { lat, lon } = await getLocationCache(city)
  const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?
  lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=${hours}`
  const response = await axios.get(url)
  return response.data
}