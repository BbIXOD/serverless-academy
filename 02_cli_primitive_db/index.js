'use strict'
import readline from readline
import { chooseInput } from "./inputController.js";

export default rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


while (true) {
  const name = (await rl.question("Enter user's name", name => name))
    .trim()
  if (name === '') break
  const user = { name }

  console.log("Select user's gender:");
  const gender = chooseInput(rl, 'male', 'female')
  rl.cursorTo(process.stdout, 0, process.stdin.count - 1)
  rl.clearLine(process.stdout)
  console.log("User's gender is: " + gender)
  user.gender = gender

  const age = (await rl.question("Enter user's name", name => name))
    .trim()
  user.age = age
}

