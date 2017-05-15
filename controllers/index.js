const Item = require('../models').Item

const index = (req, res) => {
  Item.findAll()
    .then(items => {
      res.render('index', { items: items })
    })
}

const details = (req, res) => {
  Item.findOne({where: { id: parseInt(req.params.id) }})
    .then(item => {
      res.render('detail', { item: item })
    })
    .catch(err => console.error(err))
}

const add = (req, res) => {
  res.render('add')
}

const save = (req, res) => {
  Item.create(req.body)
    .then((item) => {
      res.redirect(`/detail/${item.id}`)
    })
    .catch(err => console.error(err))
}

module.exports = {
  index: index,
  details: details,
  add: add,
  save: save
}
