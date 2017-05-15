const path = require('path')
const express = require('express')

const app = express()

const controllers = require('./controllers')
const sequelize = require('./models').sequelize

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Static files
app.use(express.static('public'))

// Routes
app.get('/', controllers.index)
app.get('/detail/:id', controllers.details)

sequelize.sync()
  .then(() => {
    app.listen(5432, () => {
      console.log('Magic happen at http://localhost:5432')
    })
  })
  .catch(err => console.error('Something happen with sync(). Error message: ', err))
