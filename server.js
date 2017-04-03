const path = require('path')
const express = require('express')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {storename: 'HACKTIVcash'})
})

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})
