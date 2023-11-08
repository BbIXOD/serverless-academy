import express from 'express'
import db from './dbController.js'
import { getJSON, putJSON } from './controllers.js'

const PORT = 3000

const app = express()
app.use(express.json())

app.get('/:key', getJSON)
app.put('/:key', putJSON)

app.listen(PORT, () => `Server running on port ${PORT}`)
db.connect()
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err))

const close = async () => {
  console.log('Closing application')
  await db.$pool.end()
  console.log('Database disconnected')
  app.removeAllListeners()
  process.exit(0)
}

process.on('SIGINT', () => close)
process.on('beforeExit', () => close)
