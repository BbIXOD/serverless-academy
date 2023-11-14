import express from 'express'

const linkPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]+)?(\/[^\s]*)?$/

export const validateLink = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (!linkPattern.test(req.body.longLink)) {
      return res.status(400).json({ success: false, error: 'Invalid link' })
    }
    next()
  }
  catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
}