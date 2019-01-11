const Base = require('./base')
const Card = require('./card')

class Room extends Base {
  static get MAX_CONNECT() {
    return 2
  }

  static get keyName() {
    return 'room:'
  }

  static async lastRoomId() {
    // IDをredisに保存しておきインクリメントして使う
    const roomId = await this.redis.get('lastRoomId')
    return Number(roomId) || 0
  }

  static async generate() {
    const room = Room.emptyRoom()
    const roomId = (await this.lastRoomId()) + 1
    const cardList = await Card.generateCollection()
    room.id = roomId
    room.cardListIds = cardList.map(card => card.id)
    await room.update()
    await this.redis.set('lastRoomId', roomId)
    return room
  }

  static emptyRoom() {
    return new this({
      id: null,
      tittle: '',
      status: '',
      connections: 0,
      cardListIds: [],
      score: {},
      currentQuestion: {},
    })
  }

  get keyName() {
    return `${Room.keyName}${this.id}`
  }

  get remainingCard() {
    return this.cardListIds.length
  }

  update() {
    return this.redis.set(this.keyName, this.string)
  }

  isEnterable() {
    return Room.MAX_CONNECT > this.connections
  }

  pickQuestion() {
    const index = Math.floor(Math.random() * this.cardListIds.length)
    const cardId = this.cardListIds.splice(index, 1)
    return Card.get(cardId)
  }
}

module.exports = Room
