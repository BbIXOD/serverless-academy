'use strict'
// like a main file
import * as controllers from './controllers.js'
import Timer from './timer.js'

const PATH = './data'
const MIN_INCLUSION = 10

const files = await controllers.getFilesInDir(PATH)
const promises = []
const timer = new Timer()

// returns all values which appeared more than once
const presenceCount = async (files, min) => {
  const values = await controllers.getUniqueForAllFiles(files)
  const unique = new Set(values)
  const counts = controllers.countItemsInArray(unique, values)
  let counter = 0

  for (const count of Object.values(counts)) {
    if (count >= min) counter++
  }

  return counter
}

// logs count of unique values
const uniqueCount = async files => {
  const values = await controllers.getUniqueForAllFiles(files)
  const unique = new Set(values)

  console.log(`Unique values: ${unique.size}`)
}

const presenceInEvery = async files => {
  const counter = await presenceCount(files, files.length)
  console.log(`Files present in every file: ${counter}`)
}

const presenceInSome = async (files, min) => {
  const counter = await presenceCount(files, min)
  console.log(`Files present in at least ${min} files: ${counter}`)
}

timer.start()

promises.push(uniqueCount(files))
promises.push(presenceInEvery(files))
promises.push(presenceInSome(files, MIN_INCLUSION))

Promise.all(promises).then(() => {
  timer.stop()
  console.log(`Elapsed time: ${timer.getTime()}`)
})
