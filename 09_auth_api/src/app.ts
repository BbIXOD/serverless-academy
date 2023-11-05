import express from 'express'
import * as controllers from './controllers.js'
import * as middleware from './middleware.js'
import userDb from './dbController.js'

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.post('/auth/sign-in', controllers.signIn)
app.post('/auth/sign-up', middleware.registerValidation, controllers.signUp)
app.get('/me', middleware.validateToken, controllers.getUser)

app.listen(port, () => console.log(`Server running on port ${port}`))
userDb.connect()
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err))

const shutDown = () => {
  console.log('Closing application')
  userDb.$pool.end()
  console.log('Database disconnected')
  process.exit(0)
}

process.on('beforeExit', shutDown)
process.on('SIGINT', shutDown)
