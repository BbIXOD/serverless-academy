'use strict'
//file works mostly with telegram bot
import TelegramBot from "node-telegram-bot-api"
import buttons from "./buttons.js";

process.env["NTBA_FIX_350"] = 1 //to fix deprecation warning
//const token = process.env.TELEGRAM_BOT_TOKEN;
const token = '6801706322:AAHxwdpdWWuf4Is7BhQ5NTMGToYdeR2fWTU'

const bot = new TelegramBot(token, {polling: true})

const cityChooseKeyboard = { //IRL it will be done in another way I think 
  reply_markup: {             //because of more cities
    keyboard: [
      [buttons.MAIN_BUTTON]
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  }
}

const intervalChooseKeyboard = {
  reply_markup: {
    keyboard: [
      [buttons.SMALL_INTERVAL],
      [buttons.BIG_INTERVAL]
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  }
}

//allow user to choose city
bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id
  bot.sendMessage(id, "Choose your city", cityChooseKeyboard)
})

//allow user to choose interval
bot.onText(new RegExp(buttons.MAIN_BUTTON), (msg) => {
  const id = msg.chat.id
  bot.sendMessage(id, "Choose interval", intervalChooseKeyboard)
})

//just to get your conversation id
bot.onText(/\/id/, (msg) => {
  const id = msg.from.id;
  bot.sendMessage(id, `Your ID: <code>${id}</code>`, {parse_mode: 'html'})
})