import express from 'express'
import jwt from 'jsonwebtoken'

const acessSecret = process.env.ACCESS_TOKEN_SECRET || 'secret'

export const registerValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const emailChecker = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/
  const passwordChecker = /^.{6,}$/


  const { email, password } = req.body

  if (emailChecker.test(email) && passwordChecker.test(password)) {
    next()
  }
  else {
    res.status(400).json({ sucsess: false, error: 'Invalid email or password' })
  }
}

export const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ sucsess: false, error: 'No token provided' })
    }

    const token = req.headers.authorization.split(' ')[1] // remove Bearer from string
    const data = jwt.verify(token, acessSecret) as { email: string, password: string }
    req.user = data

    next()
  }
  catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ sucsess: false, error: 'Token expired' })
    }

    res.status(500).json({ sucsess: false, error: error })
  }
}