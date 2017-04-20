const path = require('path')
const express = require('express')
const items = require('./data/items.json')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {items: items})
})

app.get('/detail/:id', (req, res) => {
  const item = items.find(i => {
    return i.id === parseInt(req.params.id)
  })
  console.log(item)
  res.render('detail', {item: item})
})

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})
