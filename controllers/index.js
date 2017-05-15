const Item = require('../models').Item

const index = (req, res) => {
  Item.findAll()
    .then(items => {
      res.render('index', { items: items })
    })
}

const details = (req, res) => {
  const item = items.find(i => {
    return i.id === parseInt(req.params.id)
  })
  res.render('detail', { item: item })
}

const add = (req, res) => {
  res.render('add')
}

const save = (req, res) => {
  console.log(req.body)
  res.render('add')
}

module.exports = {
  index: index,
  details: details,
  add: add,
  save: save
}
