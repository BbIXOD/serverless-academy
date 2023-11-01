'use strict'
import * as api from './api.js'

const urls = process.env.URLS || [ 
  //'https://jsonbase.com/sls-team/json-793',
  'http://localhost:3000/easy',
  'http://localhost:3000/medium',
  'http://localhost:3000/hard',
]


const property = process.env.PROPERTY || 'isDone'

//so, we check every url
for (const url of urls) {
  const data = await api.getResProperty(url, property)
  if (data.error) console.error(`[Fail] ${url}: ${data.error}`)
  else console.log(`[Success] ${url}: ${property} - ${data[property]}`)
}