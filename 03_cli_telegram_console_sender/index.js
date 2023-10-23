'use strict'
//file catches commands and gives them to the bot.js
import { Command } from "commander"
import { sendMessage, sendImage } from "./bot.js"

const program = new Command()

const messageCommand = async (text) => {
  await sendMessage(text)
  process.exit(0)
}

const imageCommand = async (path) => {
  await sendImage(path)
  process.exit(0)
}

program
  .name('bot-sender')
  .description('Simple Telegram text and image sender')
  .version('0.0.7')

program
  .command('send-message')
  .description('Send a message to telegram chat')
  .argument('<text>')
  .action(messageCommand)

program
  .command('send-image')
  .description('Send an image to telegram chat')
  .argument('<image>')
  .action(imageCommand)

program.parse(process.argv)