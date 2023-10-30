'use strict'
// like a main file
import * as controllers from './controllers.js'
import Timer from './timer.js'

const path = './data'//process.env.PATH
const minInclusion = 10//process.env.MIN_INCLUSION

const files = await controllers.getFilesInDir(path)
const promises = []
const timer = new Timer()

// returns all values which appeared more than min times
const presenceCount = (counts, min) => {
  let counter = 0

  for (const count of counts.values()) {
    if (count >= min) counter++
  }

  return counter
}

// logs count of unique values
const uniqueCount = values => {
  const unique = new Set(values)

  console.log(`Unique values: ${unique.size}`)
}

const presenceInEvery = (counts, length) => {
  const counter = presenceCount(counts, length)
  console.log(`Files present in every file: ${counter}`)
}

const presenceInSome = (counts, min) => {
  const counter = presenceCount(counts, min)
  console.log(`Files present in at least ${min} files: ${counter}`)
}

timer.start()

const valuesGen = controllers.getUniqueForAllFiles(files)
const counted = await controllers.countItemsInArray(valuesGen)

uniqueCount(counted)
presenceInEvery(counted, files.length)
presenceInSome(counted, minInclusion)

timer.stop()
console.log(`Elapsed time: ${timer.getTime()}`)
