'use strict'
// like a main file
import * as controllers from './controllers.js'
import Timer from './timer.js'

const PATH = './data'
const MIN_INCLUSION = 10

const files = await controllers.getFilesInDir(PATH)
const promises = []
const timer = new Timer()

// returns all values which appeared more than min times
const presenceCount = (values, min) => {
  const unique = new Set(values)
  const counts = controllers.countItemsInArray(unique, values)
  let counter = 0

  for (const count of Object.values(counts)) {
    if (count >= min) counter++
  }

  return counter
}

// logs count of unique values
const uniqueCount = values => {
  const unique = new Set(values)

  console.log(`Unique values: ${unique.size}`)
}

const presenceInEvery = (values, length) => {
  const counter = presenceCount(values, length)
  console.log(`Files present in every file: ${counter}`)
}

const presenceInSome = (files, min) => {
  const counter = presenceCount(values, min)
  console.log(`Files present in at least ${min} files: ${counter}`)
}

timer.start()

const values = await controllers.getUniqueForAllFiles(files)

uniqueCount(values)
presenceInEvery(values, files.length)
presenceInSome(values, MIN_INCLUSION)

timer.stop()
console.log(`Elapsed time: ${timer.getTime()}`)
