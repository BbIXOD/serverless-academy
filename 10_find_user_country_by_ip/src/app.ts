import express from 'express'
import * as controllers from './controllers.js'

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())



app.listen(port, () => console.log(`Server running on port ${port}`))