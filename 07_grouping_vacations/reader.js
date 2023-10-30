import fs from 'fs/promises'

/**
 * Reads a JSON file from the specified path and returns the parsed JSON data.
 *
 * @param {string} path - The path of the JSON file to be read.
 * @return {Promise} A promise that resolves to the parsed JSON data.
 */
export const getJSON = (path) => {
  return fs.readFile(path, 'utf-8')
    .then(data => JSON.parse(data))
    .catch(err => console.error(err))
}