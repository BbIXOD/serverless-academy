'use strict'
import http from 'http'
import url from 'url'
// just a simple server

const PORT = 3000

const server = http.createServer((req, res) => {
  const path = new url.URL(req.url, 'http://localhost:3000').pathname

  console.log(`[Request] ${path}`)

  switch (path) { // switch is bad but its just for this example
    case '/easy':
      res.end(JSON.stringify({ result: 'easy', code: 200, isDone: true }))
      break
    case '/medium':
      res.end(JSON.stringify({ result: 'medium', code: 200, something: { property: false, isDone: false } }))
      break
    case '/hard':
      res.end(JSON.stringify({
        result: 'hard',
        code: { code: 200, isNaN: false },
        something: { some: { property: 'hello' }, some2: { isDone: true } }
      }))
      break
    case '/pro':
      res.end(JSON.stringify({
        result: 'hard',
        code: { code: 200, isNaN: false },
        something: [{ property: 'hello' }, { isDone: true }]
      }))
      break
    default:
      res.end(JSON.stringify({ result: 'not found', code: 404 }))
      break
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
