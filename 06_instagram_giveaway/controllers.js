'use strict'
// here all functions main file uses
import fs from 'fs'
import util from 'util'
import path from 'path'
import readline from 'readline'

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
export const getUniqueInFile = async fileName => {
  const uniqueValues = new Set();

  const fileStream = fs.createReadStream(fileName, { encoding: 'utf-8' });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, 
  });

  for await (const line of rl) uniqueValues.add(line);

  rl.close();

  return Array.from(uniqueValues);
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
