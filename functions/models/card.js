const _ = require('lodash')
const cardList = require('../card_list')

function createList() {
  return cardList
}

const Card = {
  createList() {
    return _(cardList)
      .map('id')
      .shuffle()
      .value()
  },

  find(number) {
    return _.find(cardList, card => {
      return card.id === number
    })
  },
}

module.exports = Card
