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

const edit = (req, res) => {
  Item.findOne({ where: { id: parseInt(req.params.id) } })
    .then((item) => {
      res.render('edit', { item: item })
    })
    .catch(err => console.error(err))
}

const update = (req, res) => {
  // Update data here
  console.log(req.body)
  Item.update({
    image: req.body.image,
    description: req.body.description
  }, {
    where: {
      id: req.body.id
    }
  })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.error(err))
}

const remove = (req, res) => {
  Item.findOne({where: {
    id: parseInt(req.params.id)
  }})
    .then(item => {
      item.destroy()
      res.redirect('/')
    })
    .catch(err => console.error(err))
}

module.exports = {
  index: index,
  details: details,
  add: add,
  save: save,
  edit: edit,
  update: update,
  remove: remove
}
