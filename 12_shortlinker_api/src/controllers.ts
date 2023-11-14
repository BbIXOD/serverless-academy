import express from 'express'
import JSONBaseController from './dbController.js'

const db = new JSONBaseController(process.env.DB_PATH || './db.json')

export const postLink = async (req: express.Request, res: express.Response) => {
  try {
    const { longLink, shortLink } = req.body

    const result = await db.set(shortLink, longLink)

    if (!result.success) {
      return res.status(500).json({ success: false, error: result.data })
    }

    res.json({ success: true, data: req.hostname + '/' + shortLink }) //i think hostname must be chosen in frontend
  }
  catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }

}

export const getLink = async (req: express.Request, res: express.Response) => {
  try {
    const { link } = req.params

    const result = await db.get(link)

    if (!result.success) {
      return res.status(500).json({ success: false, error: result.data })
    }
    res.redirect(result.data)
  }
  catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}