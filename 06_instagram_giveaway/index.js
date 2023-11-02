'use strict'
// like a main file
import * as controllers from './controllers.js'
import Timer from './timer.js'

const path = process.env.PATH
const MIN_INCLUSION = 10

const files = await controllers.getFilesInDir(path)
const timer = new Timer()

// returns all values which appeared more than min times
const presenceCount = (counts, min) => {
  let counter = 0

  for (const count of counts) {
    if (count >= min) counter++
  }

  return counter
}

// logs count of unique values
const uniqueCount = values => {
  console.log(`Unique values: ${values.size || values.length}`)
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

const counted = await controllers.countItemsInArray(files)
uniqueCount(counted)
presenceInEvery(counted.values(), files.length)
presenceInSome(counted.values(), MIN_INCLUSION)

timer.stop()
console.log(`Elapsed time: ${timer.getTime()}`)
