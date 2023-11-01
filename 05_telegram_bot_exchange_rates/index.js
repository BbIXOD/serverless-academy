'use strict'
// file responds for user commands
import TelegramBot from 'node-telegram-bot-api'
import * as mono from './monoBank_api.js'
import * as privat from './privatBank_api.js'
import * as globals from './globals.js'

process.env.NTBA_FIX_350 = 1 // to fix deprecation warning

const token = '6801706322:AAHxwdpdWWuf4Is7BhQ5NTMGToYdeR2fWTU'// process.env.TELEGRAM_BOT_TOKEN

const markup = {
  reply_markup: {
    keyboard: [
      [globals.currencyNames.USD, globals.currencyNames.EUR]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
}

const bot = new TelegramBot(token, { polling: true })

const logCurrency = (data, label, id) => {
  if (data.error) {
    bot.sendMessage(id, `Error in ${label}: ${data.error}`)
    return
  }
  bot.sendMessage(id, `${label}\nBuy rate: ${data.rateBuy}\nSell rate: ${data.rateSell}`)
}

// start the bot and get keyboard
bot.onText(/\/start/, (msg) => {
  const id = msg.from.id

  bot.sendMessage(id, 'Choose your currency', markup)
})

bot.on('message', async msg => {
  const id = msg.from.id
  const text = msg.text

  const currencyMono = mono.getCurrencyByName(text, globals.currencyNames.UAH)
  const currencyPrivat = privat.getCurrencyByName(text, globals.currencyNames.UAH)
  logCurrency(await currencyMono, 'MonoBank', id)
  logCurrency(await currencyPrivat, 'PrivatBank', id)
})

bot.on('error', err => console.log(err))
