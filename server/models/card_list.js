const Base = require('./base')

class CardList extends Base {
  static get keyPrefix() {
    return 'card:*'
  }

  constructor() {
    super()
    this.list = []
    const self = this
    this.loadList().then(() => {
      self.shuffle()
    })
  }

  loadList() {
    const self = this
    return this.redis.keys('card:*').then(keys => {
      self.redis.mget(keys).then(results => {
        self.list = results.map(value => {
          return JSON.parse(value)
        })
      })
    })
  }

  shuffle() {
    this.list = this.list.sort(() => {
      return Math.random() - 0.5
    })
  }

  pick() {
    const index = Math.floor(Math.random() * this.list.length)
    return this.list.splice(index, 1)
  }
}

module.exports = CardList
