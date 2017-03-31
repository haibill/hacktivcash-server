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
app.get('/hacktiv8', (req, res) => {
  res.redirect('https://hacktiv8.com/')
})
app.get('/sending', (req, res) => {
  res.sendFile('/Users/riza/Music/cool_song.mp3')
})

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})
