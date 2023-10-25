'use strict'
// file catches commands and gives them to the bot.js
import { Command } from 'commander'
import { sendMessage, sendImage } from './bot.js'

const program = new Command()

const messageCommand = async (text) => {
  await sendMessage(text)
  process.exit(0)
}

const photoCommand = async (path) => {
  await sendImage(path)
  process.exit(0)
}

program
  .name('bot-sender')
  .description('Simple Telegram text and photo sender')
  .version('0.0.7')

program
  .command('send-message')
  .description('Send a message to telegram chat')
  .argument('<text>')
  .action(messageCommand)

program
  .command('send-photo')
  .description('Send an photo to telegram chat')
  .argument('<photo>')
  .action(photoCommand)

program.parse(process.argv)
