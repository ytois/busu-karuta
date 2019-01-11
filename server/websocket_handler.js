const Card = require('./models/card')
const Room = require('./models/room')

class WebsocketHandler {
  constructor(websocket, connections) {
    this.websocket = websocket
    this.connections = connections
  }

  receiveMessage(message) {
    let json = this.parseMessage(message)

    switch (json.method) {
      case 'anser':
      case 'requestQuestion':
      case 'requestCardList':
        this[json.method](json.data)
        break

      default:
        console.log(`undefined message: ${json}`)
        break
    }
  }

  parseMessage(data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return { text: data }
    }
  }

  anser(data) {
    console.log(data)
    let response = { method: 'test', data: { text: 'test message' } }
    this.sendConnections(response)
  }

  async requestCardList(data) {
    const room = await Room.get(data.roomId)
    const cardList = await Card.getAll(room.cardListIds)
    const response = { method: 'cardList', data: { cardList: cardList } }
    this.sendConnections(response)
  }

  async requestQuestion(data) {
    const room = await Room.get(data.roomId)
    const question = await room.pickQuestion()
    let response = { method: 'question', data: question }
    this.sendConnections(response)
  }

  sendConnections(data) {
    this.connections.forEach(connect => {
      // TODO: いずれかがcloseになってるとエラーになるためいったん回避
      if (connect.socket.readyState === 1) {
        connect.socket.send(JSON.stringify(data))
      }
    })
  }

  closeConnection() {
    console.log('close connection')
  }
}

module.exports = WebsocketHandler
