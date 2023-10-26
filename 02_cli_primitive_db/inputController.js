'use strict'
import readline from 'readline'

export const initialize = () => {
  process.stdin.setDefaultEncoding('utf-8')
  process.stdin.on('error', err => console.error(err))
}

// prints question and returns user input
// don't used readline because later I need to off echo and readline doesn't
// good for it. it can but switch between visibilities are lagging
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

// get menu where you can choose one option
export const chooseInput = async (...options) => {
  let index = 0
  let quitFlag = false
  const length = options.length

  const commands = {
    '\u001b[A': () => { // up
      if (index > 0) index--
      else index = length - 1
    },
    '\u001b[B': () => { // down
      if (index < length - 1) index++
      else index = 0
    },
    '\r': () => {
      quitFlag = true
    }, // enter
    '\x03': () => process.exit(0) // ctrl + c
  }

  const clearVariants = () => {
    readline.cursorTo(process.stdout, 0, process.stdout.rows - length)
    readline.clearScreenDown(process.stdout)
  }

  // print variants
  const printWithSelected = () => {
    for (const [key, option] of options.entries()) {
      const output = key === index
        ? `\x1b[34m> ${option}\x1b[0m` // highlight selected
        : '  ' + option
      process.stdout.write(output + (key === length - 1 ? '' : '\n'))
    }
  }

  // input handler
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

  // wrap into event and promise
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
