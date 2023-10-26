'use strict'
import executions from './controllers.js'
import readline from 'readline'

const UNKNOWN_COMMAND_ERROR = 'Error: got unexpected command!'

const rl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
)
const data = []

const execute = () => {
  rl.question('Type number from 1 to 6 + ENTER:', value => {
    if (value in executions) console.log(executions[value](data))
    else console.error(UNKNOWN_COMMAND_ERROR)
    execute()
  })
}

rl.on('error', err => console.error(err))

rl.question('Input data for initial array:', input => {
  data.push(...input.trim().split(' '))
  execute()
})

rl.close()
