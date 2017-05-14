const items = require('../data/items.json')

const index = (req, res) => {
  res.render('index', { items: items })
}

const details = (req, res) => {
  const item = items.find(i => {
    return i.id === parseInt(req.params.id)
  })
  res.render('detail', { item: item })
}

module.exports = {
  index: index,
  details: details
}
