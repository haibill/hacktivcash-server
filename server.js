const path = require('path')
const express = require('express')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index', {data: 'Hello, Bandung!'})
})

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})
