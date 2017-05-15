const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

const controllers = require('./controllers')
const sequelize = require('./models').sequelize

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Static files
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))

// Routes
app.get('/', controllers.index)
app.get('/add', controllers.add)
app.post('/save', controllers.save)
app.get('/detail/:id', controllers.details)
app.get('/edit/:id', controllers.edit)
app.put('/update', controllers.update)
app.get('/remove/:id', controllers.remove)

sequelize.sync()
  .then(() => {
    app.listen(5432, () => {
      console.log('Magic happen at http://localhost:5432')
    })
  })
  .catch(err => console.error('Something happen with sync(). Error message: ', err))
