'use strict'
import readline from 'readline'
import { chooseInput, question, init } from './inputController.js'
import { register, find } from './databaseController.js'

const search = res => {
  const AGREE = 'y'
  if (res === AGREE) {
    question('Enter name:')
      .then(find)
      .then(console.log)
  }
}

init()
while (true) {
  const name = await question("Enter user's name:")
  if (name === '') break
  const user = { name }
  console.log("Select user's gender:")
  const gender = await chooseInput('male', 'female')
  readline.moveCursor(process.stdout, 0, -1)
  readline.clearLine(process.stdout)
  console.log("User's gender is: " + gender)
  user.gender = gender

  const age = await question("Enter user's age:")
  user.age = age

  register(user)
}

question('Perform search? (y/n):')
  .then(search)
