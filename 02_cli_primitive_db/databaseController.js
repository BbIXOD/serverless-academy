'use strict'
import fs from 'fs'

const FILE = 'db.txt'
const SEPARATOR = ':sep:'

export const register = user => {
  fs.appendFile(FILE, JSON.stringify(user), (err) =>
   console.error(err))
}

export const find = name => {
  return fs.readFile(FILE, (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    const loweredName = name.toLowerCase()
    const users = JSON.parse(data.split(SEPARATOR))
    for (const user of users) {
      if (user.name.toLowerCase() === loweredName) return user
    }
    return 'Can not find user'
  })
}