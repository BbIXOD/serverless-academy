'use strict'
import fs from 'fs'

const FILE = 'db.txt'
const SEPARATOR = '\r'

// add user to db
export const register = user => {
  fs.appendFileSync(FILE, JSON.stringify(user) + SEPARATOR, err => console.error(err))
}

// find user by name
export const find = name => {
  const data = fs.readFileSync(FILE, { encoding: 'utf-8' }, err => console.error(err))

  const loweredName = name.toLowerCase()
  const users = data.split(SEPARATOR)
  users.pop()
  for (const user of users) {
    try {
      const parsed = JSON.parse(user)
      if (parsed.name.toLowerCase() === loweredName) return parsed
    } catch (err) {
      console.error(err)
    }
  }
  return { error: 'Can not find user' }
}
