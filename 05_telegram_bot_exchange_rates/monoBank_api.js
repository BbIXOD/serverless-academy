'use strict'
// file works with MonoBank api
import axios from 'axios'
import * as globals from './globals.js'

// this error is ok, because it caused by amount of requests
const MANY_REQUESTS_ERROR = 'ERR_BAD_REQUEST'

// returns function which gets currencies from api or cached
export const currenciesGetter = () => {
  let cache = []

  return async () => {
    return await axios.get('https://api.monobank.ua/bank/currency')
      .then(res => {
        cache = res.data
        return res.data
      })
      .catch(err => {
        if (err.code !== MANY_REQUESTS_ERROR) console.error(err.code)
        return cache
      })
  }
}

// initialize function for getting currencies
const getCurrencies = currenciesGetter()

// get currency by name
export const getCurrencyByName = async (from, to) => {
  const data = await getCurrencies()
  for (const item of data) {
    if (item.currencyCodeA === globals.currencyCodes[from] &&
      item.currencyCodeB === globals.currencyCodes[to]) {
      return { rateBuy: item.rateBuy, rateSell: item.rateSell }
    }
  }
  return globals.CURRENCY_ERROR
}
