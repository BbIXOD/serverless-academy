'use strict'
import readline from 'readline'

export const init = () => process.stdin.setDefaultEncoding('utf-8')

export const question = (querry) => {
  return new Promise((resolve) => {
    const callback = data => {
      const prepared = data.toString().trim()
      process.stdin.pause()
      resolve(prepared)
    }

    process.stdout.write(querry)
    process.stdin.resume()
    process.stdin.once('data', data => callback(data))
  })
}

export const chooseInput = async (...options) => {
  let index = 0
  let quitFlag = false
  const length = options.length

  const commands = {
    '\u001b[A': () => {
      if (index > 0) index--
      else index = length - 1
    },
    '\u001b[B': () => {
      if (index < length - 1) index++
      else index = 0
    },
    '\r': () => quitFlag = true,
    '\x03': () => process.exit(0)
  }

  const clearVariants = () => {
    readline.cursorTo(process.stdout, 0, process.stdout.rows - length)
    readline.clearScreenDown(process.stdout)
  }

  const printWithSelected = () => {
    for (const [key, option] of options.entries()) {
      const output = key === index
        ? `\x1b[34m> ${option}\x1b[0m`
        : '  ' + option
      process.stdout.write(output + (key === length - 1 ? '' : '\n'))
    }
  }

  const onKeyPress = (resolve, _reject, key) => {
    if (!(key in commands)) return
    commands[key]()
    clearVariants()

    if (quitFlag) {
      process.stdin.removeListener('data', onKeyPress)
      return resolve()
    }
    printWithSelected()
  }

  const listenerPromise = (resolve, reject) => {
    process.stdin.on('data', onKeyPress.bind(null, resolve, reject))
  }

  process.stdin.setRawMode(true)
  process.stdin.resume()
  printWithSelected()
  await new Promise(listenerPromise)
  clearVariants()
  process.stdin.setRawMode(false)
  process.stdin.pause()

  return options[index]
}
