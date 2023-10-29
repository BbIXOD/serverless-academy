'use strict'
// here all functions main file uses
import fs from 'fs'
import util from 'util'
import path from 'path'

const readDir = util.promisify(fs.readdir)

// returns array of files in directory
export const getFilesInDir = async dirPath => {
  return await readDir(dirPath)
    .then(data => data.map(item => path.join(dirPath, item)))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

// returns array of unique values which were separated by \n
export const getUniqueInFile = fileName => {
  const values = []
  const stream = fs.createReadStream(fileName, { encoding: 'utf-8' })
  let last
  let unfinished = false

  stream.on('data', chunk => {
    const lines = chunk.split('\n')

    if (unfinished) { // finish previous line
      values.push(last + lines.shift()) // add directly to set
      unfinished = false
    } else if (chunk[0] === '\n') lines.shift() // remove empty line

    if (chunk[chunk.length - 1] === '\n' && chunk.length > 1) lines.pop() // same + prepare for finishing
    else {
      last = lines.pop()
      unfinished = true
    }

    values.push(...lines)
  })

  return new Promise(resolve => stream.on('end', () => {
    resolve(Array.from(new Set(values)))
  }))
}

// returns array contains unique values of each, so if same value appears in different files it will be shown more than once
export const getUniqueForAllFiles = async files => {
  const values = []
  const promises = []

  for (const file of files) {
    const promise = getUniqueInFile(file)
    promises.push(promise)
    promise.then(data => values.push(...data))
  }

  await Promise.all(promises)

  return values
}

// counts how many times each value of set appears in array
export const countItemsInArray = (set, array) => {
  const inputs = {}

  for (const item of array) {
    inputs[item] = (inputs[item] || 0) + 1
  }

  return inputs
}
