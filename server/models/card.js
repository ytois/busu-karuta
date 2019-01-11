const Base = require('./base')

class Card extends Base {
  static get keyName() {
    return 'card:'
  }

  static generateCollection() {
    return this.getAll()
  }
}

module.exports = Card
