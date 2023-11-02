'use strict'
import * as api from './api.js'

const urls = process.env.URLS || [
  // 'https://jsonbase.com/sls-team/json-793',
  'http://localhost:3000/easy',
  'http://localhost:3000/medium',
  'http://localhost:3000/hard',
  'http://localhost:3000/pro'
]

const property = process.env.PROPERTY || 'isDone'

let falseCount = 0
let trueCount = 0

// so, we check every url
for (const url of urls) {
  const data = await api.getResProperty(url, property)
  if (data.error) console.error(`[Fail] ${url}: ${data.error}`)
  else {
    const value = data[property]
    console.log(`[Success] ${url}: ${property} - ${value}`)

    if (value) trueCount++
    else falseCount++
  }
}
console.log(`\nFound true values: ${trueCount},`)
console.log(`Found false values: ${falseCount}`)
