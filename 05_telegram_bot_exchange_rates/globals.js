export const currencyNames = {
  USD: 'USD',
  EUR: 'EUR',
  UAH: 'UAH'
}

export const currencyCodes = {
  [currencyNames.USD]: 840,
  [currencyNames.EUR]: 978,
  [currencyNames.UAH]: 980
}

// maybe we need separate file for errors
export const CURRENCY_ERROR = { error: 'Can not find currency' }
