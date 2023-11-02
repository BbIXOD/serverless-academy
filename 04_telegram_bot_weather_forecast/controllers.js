'use strict'
// file contains functions which index will use as callbacks
import TelegramBot from 'node-telegram-bot-api'
import { preparedForecast } from './forecast.js'
import { cityChooseKeyboard, intervalChooseKeyboard } from './keyboards.js'

const token = process.env.TELEGRAM_BOT_TOKEN
const SEPARATOR = '::'

export const bot = new TelegramBot(token, { polling: true })

// send /start to start conversation
export const start = (msg) => {
  const id = msg.chat.id
  bot.sendMessage(id, 'Choose your city', cityChooseKeyboard)
}

// get your id
export const id = (msg) => {
  const id = msg.from.id
  bot.sendMessage(id, `Your ID: <code>${id}</code>`, { parse_mode: 'html' })
}

// responds on buttons pressing
export const onQuery = (() => {
  const usersCities = {}

  const commands = {
    city: (id, data) => { // if command is city we need to give him interval chooser
      usersCities[id] = data[1]
      bot.sendMessage(id, 'Choose your interval', intervalChooseKeyboard)
    },
    interval: async (id, data) => { // after interval chosen give him forecast
      const interval = data[1]
      const forecast = await preparedForecast(interval, usersCities[id])
      if (forecast.error) bot.sendMessage(id, `Error: ${forecast.error}`)

      await bot.sendMessage(id, `Weather in ${usersCities[id]}`)
      for (const item of forecast) {
        await bot.sendMessage(id, `Time: <b>${item.time}</b>\nWeather:` +
        `<b>${item.weather}</b>\nTemperature: <b>${item.temperature}</b>`,
        { parse_mode: 'html' })
      }
    }
  }

  return (querry) => { // get function by button callback
    const id = querry.message.chat.id
    const data = querry.data.split(SEPARATOR)
    if (data[0] in commands) commands[data[0]](id, data)
    else console.error(`Unknown command: ${data}`)
  }
})()
