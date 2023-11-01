'use strict'
// file responds for user commands
import * as controllers from './controllers.js'

process.env.NTBA_FIX_350 = 1 // to fix deprecation warning

const bot = controllers.bot // for escaping two-side dependencies

// allow user to choose city
bot.onText(/\/start/, controllers.start)

// allow user to choose interval
bot.on('callback_query', controllers.onQuery)

// just to get your conversation id
bot.onText(/\/id/, controllers.id)

// log all errors
bot.on('error', err => console.log(err))
