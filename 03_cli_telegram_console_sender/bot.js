'use strict'
// file gives commands to telegramm bot
import TelegramBot from 'node-telegram-bot-api'

process.env.NTBA_FIX_350 = 1 // to fix deprecation warning
const token = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID
// const token = '6801706322:AAHxwdpdWWuf4Is7BhQ5NTMGToYdeR2fWTU'
// const chatId = '969104809'

const bot = new TelegramBot(token, { polling: true })

export const sendMessage = async text => {
  await bot.sendMessage(chatId, text)
}

export const sendImage = async path => {
  await bot.sendPhoto(chatId, path)
}

// just to get your conversation id
bot.onText(/\/id/, (msg) => {
  const id = msg.from.id
  bot.sendMessage(id, `Your ID: <code>${id}</code>`, { parse_mode: 'html' })
})
