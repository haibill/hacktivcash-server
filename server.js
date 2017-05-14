const path = require('path')
const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const db = new sqlite3.Database('./data/try.db')

const controllers = require('./controllers')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// Static files
app.use(express.static('public'))

// Routes
app.get('/', controllers.index)
app.get('/detail/:id', controllers.details)

app.listen(5432, () => {
  console.log('Magic happen at http://localhost:5432')
})

// MODELS

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY AUTOINCREMENT, 
image VARCHAR(100),
description TEXT);`
const DROP_TABLE = `DROP TABLE IF EXISTS items;`
const INSERT_ITEM = `INSERT INTO items (id, image, description) VALUES (1, "/img/1-jlol_sp_ed_bb-8_sphero_force_band.jpg", "abc");`
const INSERT_ITEM_STMT = `INSERT INTO items (id, image, description) VALUES (?, ?, ?)`
const SELECT_ITEM = `SELECT * FROM items;`
const UPDATE_ITEM = `UPDATE items SET description='HACKTIVCAST new items'`
const DELETE_ITEM = `DELETE FROM items WHERE id=1;`

db.serialize(() => {
  db.run(DROP_TABLE)
  db.run(CREATE_TABLE)
  const stmt = db.prepare(INSERT_ITEM_STMT)
  for (let i = 1; i <= 10; i++) {
    stmt.run(i, `/img/${i}`, `Item #${i}`)
  }
  stmt.finalize()

  db.each(SELECT_ITEM, (err, row) => {
    console.log(row.id, ': ', row.description)
  })
  db.run(UPDATE_ITEM)
  db.each(SELECT_ITEM, (err, row) => {
    console.log(row.id, ': ', row.description)
  })
  db.run(DELETE_ITEM)
  db.each(SELECT_ITEM, (err, row) => {
    console.log('After DELETE: ', row.id, ': ', row.description)
  })
})

db.close()
