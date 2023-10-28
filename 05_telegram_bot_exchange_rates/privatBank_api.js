'use strict'
// file works with PrivatBank api
import axios from 'axios'
import * as globals from './globals.js'

export const getCurrencyByName = async (from, to) => {
  const data = await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(res => res.data)
    .catch(error => { error })
  if (data.error) return data
  
  for (const item of data) {
    if (item.ccy === from &&
      item.base_ccy === to) {
      return { rateBuy: item.buy, rateSell: item.sale }
    }
  }
  return globals.CURRENCY_ERROR
}