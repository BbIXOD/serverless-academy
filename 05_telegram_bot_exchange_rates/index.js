'use strict'
// file responds for user commands
import TelegramBot from 'node-telegram-bot-api'
import { getCurrencyByName } from './bank_api.js'
import * as globals from './globals.js'

process.env.NTBA_FIX_350 = 1 // to fix deprecation warning

const token = '6801706322:AAHxwdpdWWuf4Is7BhQ5NTMGToYdeR2fWTU'//process.env.TELEGRAM_BOT_TOKEN

const markup = {
  reply_markup: {
    keyboard: [
      [globals.currencyNames.USD, globals.currencyNames.EUR]
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  }
}

const bot = new TelegramBot(token, { polling: true })

//start the bot and get keyboard
bot.onText(/\/start/, (msg) => {
  const id = msg.from.id

  bot.sendMessage(id, 'Choose your currency', markup)
})

bot.on('message', async msg => {
  const id = msg.from.id
  const text = msg.text

  const currency = await getCurrencyByName(text, globals.currencyNames.HRN)
  if (currency.error) {
    bot.sendMessage(id, currency.error)
    return
  }

  bot.sendMessage(id, `Buy rate: ${currency.rateBuy}\nSell rate: ${currency.rateSell}`)
})

bot.on('error', err => console.log(err))
