'use strict'
import inquirer from 'inquirer'

const NAME = 'input'

const getPromptPromise = options => {
  options.name = NAME

  return inquirer
    .prompt(options)
    .then(answers => answers[NAME])
    .catch(err => {
      console.error(err)
      return ''
    })
}

// prints question and returns user input
export const question = (querry, defaultPrompt) => {
  return getPromptPromise({
    type: 'input',
    message: querry,
    default: defaultPrompt
  })
}

// get menu where you can choose one option
export const chooseInput = (querry, ...choises) => {
  return getPromptPromise({
    type: 'list',
    message: querry,
    choices: choises
  })
}
