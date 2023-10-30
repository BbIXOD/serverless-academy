'use strict'
// here all functions main file uses
import { readdir} from 'fs/promises'
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
export const getUniqueInFile = fileName => {
  const values = new Set()
  const stream = createReadStream(fileName, { encoding: 'utf-8' })
  let lastLine = ''

  stream.on('data', chunk => {
    const lines = chunk.split('\n')

    for ( const line of lines.slice(1, -1) ) { //first and last are handled separate
      values.add(line)
    }

    values.add(lastLine + lines[0])
    lastLine = lines[lines.length - 1]
  })

  return new Promise(resolve => stream.on('end', () => {
    if (lastLine !== '') values.add(lastLine)
    resolve(Array.from(values))
  }))
}

// returns array contains unique values of each, so if same value appears in different files it will be shown more than once
async function* getUniqueForAllFiles (files) {

  for (const file of files) {
    yield await getUniqueInFile(file)
      .then(data => data)
      .catch(err => console.error(err))
  }
}

// counts how many times each value of set appears in array
export const countItemsInArray = async (files) => {
  const arrayGen = getUniqueForAllFiles(files)
  const inputs = new Map()

  for await (const item of arrayGen) {
    for (const value of item) {
      inputs.set(value, (inputs.has(value) ? inputs.get(value) + 1 : 1))
    }
  }

  return inputs
}
