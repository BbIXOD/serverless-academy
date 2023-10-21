'use strict'

export const chooseInput = async (rl, ...options) => {
  let index = 0,
    quitFlag = false
  const length = options.length

  const commands = {
    'up': () => {
      if (index > 0) index--
      else index = length - 1
    },
    'down': () => {
      if (index < length) index++
      else index = 0
    },
    'enter': () => quitFlag = true
  }

  const clearVariants = () => {
    rl.cursorTo(process.stdin, 0, process.stdout.rows - length)
    rl.clearScreenDown(process.stdout)
  }

  const printWithSelected = () => {
    clearVariants()

    for (const [key, option] of options.entries()) {
      const output = key === index ? `\x1b[34m>${option}\x1b[0m` :
        '  ' + option
      console.log(output);
    }
  }

  const onKeyPress = () => {
    rl.onсe('keypress', (_str, key) => {
      commands[key.name]()
      if (quitFlag) {
        clearVariants()
        resolve()
      }
      printWithSelected()
      onKeyPress()
    })
  }

  const listener = () => new Promise(onKeyPress())
  await listener()

  return index
}