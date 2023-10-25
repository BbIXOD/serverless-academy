'use strict'
const SEPARATOR = process.env.SEPARATOR

export const cityChooseKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'London',
          callback_data: `city${SEPARATOR}London` // command + value
        }
      ]
    ]
  }
}

export const intervalChooseKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '3 hours',
          callback_data: `interval${SEPARATOR}1`
        }
      ],
      [
        {
          text: '6 hours',
          callback_data: `interval${SEPARATOR}2`
        }
      ]
    ]
  }
}
