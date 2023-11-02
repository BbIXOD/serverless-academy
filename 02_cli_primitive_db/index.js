'use strict'
import { chooseInput, question } from './inputController.js'
import { register, find } from './databaseController.js'

const AGREE = 'y'

const search = res => {
  question('Enter name:')
    .then(find)
    .then(console.log)
}

// infinite user registration loop
const main = async () => {
  while (true) {
    const name = await question("Enter user's name:")
    if (name === '') break
    const user = { name }
  
    user.gender = await chooseInput("Select user's gender:", 'male', 'female')
    user.age = await question("Enter user's age:")
  
    register(user)
  }
}

await main()
const doSearch = await question('Perform search? (y/n):')
if (doSearch === AGREE) search()

