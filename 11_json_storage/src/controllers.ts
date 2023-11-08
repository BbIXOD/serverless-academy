import express from 'express'
import db from './dbController.js'

export const getJSON = async (req: express.Request, res: express.Response) => {
  try {
    const key = req.params.key
    const data = await db.query('SELECT * FROM json_db WHERE key = $1', [key])
    console.log(data)
    res.json({ sucsess: true, data: data[0].data })
  } catch (error: any) {
    res.status(500).json({ sucsess: false, error: error.message })
  }
}

export const putJSON = async (req: express.Request, res: express.Response) => {
  try {
    const json = req.body
    const key = req.params.key

    await db.query('INSERT INTO json_db (key, data) VALUES ($1, $2) ' +
    'ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data', [key, json])
    res.json({ sucsess: true })
  } catch (error: any) {
    res.status(500).json({ sucsess: false, error: error.message })
  }
}
