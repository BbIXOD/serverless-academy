'use strict'
import readline from 'readline'
import { chooseInput, question, setEncoding } from './inputController.js'
import { register, find } from './databaseController.js'

//search, but if we need so
const search = res => {
  const AGREE = 'y'
  if (res === AGREE) {
    question('Enter name:')
      .then(find)
      .then(console.log)
  }
}

setEncoding()

//infinite user registration loop
while (true) {
  const name = await question("Enter user's name:")
  if (name === '') break
  const user = { name }

  console.log("Select user's gender:")
  const gender = await chooseInput('male', 'female')
  readline.moveCursor(process.stdout, 0, -1) // clear last line to
  readline.clearLine(process.stdout)         // show result instead
  console.log("User's gender is: " + gender)
  user.gender = gender

  const age = await question("Enter user's age:")
  user.age = age

  register(user)
}

question('Perform search? (y/n):')
  .then(search)
