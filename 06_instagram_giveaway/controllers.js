'use strict'
// here all functions main file uses
import { readdir } from 'fs/promises'
import { createReadStream } from 'fs'
import path from 'path'

// returns array of files in directory
export const getFilesInDir = async dirPath => {
  return await readdir(dirPath)
    .then(data => data.map(item => path.join(dirPath, item)))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

// returns array of unique values which were separated by \n
export const getUniqueInFile = async (fileName) => {
  const unique = new Set()
  const stream = createReadStream(fileName, { encoding: 'utf-8' })
  let lastLine = ''

  for await (const chunk of stream) {
    const lines = chunk.split('\n')

    for (const line of lines.slice(1, -1)) { // first and last are handled separate
      unique.add(line)
    }

    unique.add(lastLine + lines[0])
    lastLine = lines[lines.length - 1]
  }

  unique.add(lastLine)
  return unique
}

// still work with chunk, but for all files
async function * getUniqueForAllFiles (files) {
  for (const file of files) {
    yield await getUniqueInFile(file)
  }
}

// counts how many times each value of set appears in array
export const countItemsInArray = async (files) => {
  const arrayGen = getUniqueForAllFiles(files)
  const inputs = new Map()

  for await (const chunk of arrayGen) {
    for (const item of chunk) {
      inputs.set(item, (inputs.has(item) ? inputs.get(item) + 1 : 1))
    }
  }

  return inputs
}
