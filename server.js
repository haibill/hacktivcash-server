const path = require('path')
const express = require('express')
const items = require('./data/items.json')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const db = new sqlite3.Database('./data/try.db')

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
  res.render('detail', {item: item})
})

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})

const CREATE_TABLE = `CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, 
username VARCHAR(100),
password TEXT);`
const ALTER_TABLE = `ALTER TABLE users ADD dateCreated DATE;`
const DROP_TABLE = `DROP TABLE users;`

db.serialize(() => {
  db.run(CREATE_TABLE)
  db.run(ALTER_TABLE)
  db.run(DROP_TABLE)
})

db.close()
