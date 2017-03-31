const express = require('express')

const app = express()

app.use((request, response, next) => {
  console.log('Satu')
  next()
})

app.use((request, response, next) => {
  console.log('Dua')
  next()
})

const handleGetRoot = (request, response) => {
  response.send('This is / route')
}

const handleGetEcho = (request, response) => {
  response.send(`This is /echo route. Hello ${request.params.name}`)
}
app.get('/', handleGetRoot)
app.get('/echo/:name', handleGetEcho)

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})
