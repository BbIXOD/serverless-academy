'use strict'
// file responds for user commands
import TelegramBot from 'node-telegram-bot-api'

process.env.NTBA_FIX_350 = 1 // to fix deprecation warning

const token = process.env.TELEGRAM_BOT_TOKEN

const buttonNames = {
  USD: 'USD',
  EUR: 'EUR'
}
const markup = {
  reply_markup: {
    keyboard: [
      [buttonNames.USD, buttonNames.EUR]
    ]
  }
}

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
  const id = msg.from.id

  bot.sendMessage(id, 'Choose your currency', markup)
})

bot.onText()
