import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userDb from './dbController.js'

const acessSecret = process.env.ACCESS_TOKEN_SECRET || 'secret'
const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'secret'

const accessTokenExpires = process.env.ACESS_TOKEN_EXPIRES || '1h' //in another source you said 1m but it's not enough
const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES || '99999d' // there is no forever

const rounds = process.env.SALT_ROUNDS || 10

const sendTokens = (data: {}, id: string, res: express.Response) => {
  const acessToken = jwt.sign(data, acessSecret, { expiresIn: accessTokenExpires })
  const refreshToken = jwt.sign(data, refreshSecret, { expiresIn: refreshTokenExpires })

  res.status(200).json({ sucsess: true, data: { id, acessToken, refreshToken } })
}

export const signUp = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    const encryptedPassword = bcrypt.hashSync(password, rounds)

    await userDb.query('INSERT INTO users_db (email, password) VALUES ($1, $2)', [email, encryptedPassword])
    const data = await userDb.query('SELECT * FROM users_db WHERE email = $1', [email])

    sendTokens({ email, encryptedPassword }, data[0].id, res)
  } 
  catch (error: any) {
    res.status(500).json({ sucsess: false, error: error.message })
  }
}

export const signIn = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body

    const data = await userDb.query('SELECT * FROM users_db WHERE email = $1', [email])
    
    if (data.length === 0 || !bcrypt.compareSync(password, data[0].password)) {
      return res.status(404).json({ sucsess: false, error: 'Not found' })
    }
    
    sendTokens({ email, password }, data[0].id, res)
  }
  catch (error: any) {
    res.status(500).json({ sucsess: false, error: error.message })
  }
}

export const getUser = async (req: express.Request, res: express.Response) => {
  const authHeader = 'authorization'

  try {

    const email = req.user!.email

    const user = await userDb.query('SELECT * FROM users_db WHERE email = $1', [email])

    if (user.length === 0) return res.status(404).json({ sucsess: false, error: 'Not found' })

    res.json({ sucsess: true, data: { id: user[0].id, email }})
  }
  catch (error: any) {
    res.status(500).json({ sucsess: false, error: error.message })
  }
}