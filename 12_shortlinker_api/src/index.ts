import express from 'express'
import * as middleware from './middleware.js'
import * as controllers from './controllers.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post('/', middleware.validateLink, controllers.postLink)
app.get('/:link', controllers.getLink)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

