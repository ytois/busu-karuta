const Base = require('./base')

class Room extends Base {
  static get MAX_CONNECT() {
    return 2
  }

  static get keyName() {
    return 'room:'
  }

  constructor(object) {
    super()
    this.id = object.id
    this.status = object.status
    this.connections = object.connections
    this.cardList = []
    this.score = {}
    this.currentQuestion = {}
  }

  get remainingCard() {
    return this.cardList.length
  }

  get keyName() {
    return `${Room.keyName}${this.id}`
  }

  update() {
    return this.redis.set(this.keyName, this.string)
  }

  isEnterable() {
    return Room.MAX_CONNECT > this.connections
  }

  get json() {
    return {
      id: this.id,
      status: this.status,
      connections: this.connections,
    }
  }

  get string() {
    return JSON.stringify(this.json)
  }
}

module.exports = Room
