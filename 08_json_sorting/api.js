'use strict'
import axios from 'axios'

const connectionTries = process.env.CONNECTION_TRIES || 3

// finds property in data on any level of nesting
const findProperty = (data, property) => {
  const querry = [data]

  for (let i = 0; i < querry.length; i++) {
    for (const key in querry[i]) {
      if (key === property) { // really don't know how will be better to remove it for arrays
        return { [key]: querry[i][key] }
      }
      if (typeof querry[i][key] === 'object' || Array.isArray(querry[i][key])) {
        querry.push(querry[i][key])
      }
    }
  }

  return { error: 'Cannot find property' }
}

// just a common get request, but we try try to get data couple of times
const getJSONWithRetry = async (url) => {
  for (let i = 0; i < connectionTries; i++) {
    const response = await axios.get(url)
      .then(res => res.data)
      .catch(err => {
        if (err.code === 'ENOTFOUND') return
        console.log(err)
      })

    if (response) return response
  }

  return { error: 'The endpoint is unavailable' }
}

// gets property from response
export const getResProperty = async (url, property) => {
  const response = await getJSONWithRetry(url)

  if (response.error) return response
  return findProperty(response, property)
}
