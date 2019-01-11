const Base = require('./base')

class CardList extends Base {
  static get keyName() {
    return 'card:'
  }

  static async generate() {
    const allKeys = await this.redis.keys(`${CardList.keyName}*`)
    const records = await this.redis.mget(allKeys)
    const list = records.map(value => {
      return JSON.parse(value)
    })

    const cardList = new this()
    cardList.list = list
    cardList.shuffle()
    return cardList
  }

  constructor(ids) {
    super()
    const self = this
    this.list = []
    if (ids) {
      CardList.getAll(ids).then(list => {
        self.list = list
      })
    }
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

  get ids() {
    return this.list.map(card => card.id)
  }

  get keys() {
    return this.list.map(card => {
      return `${CardList.keyName}${card.id}`
    })
  }
}

module.exports = CardList
