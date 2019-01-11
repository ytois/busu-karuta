const Card = require('./models/card')

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

  parseMessage(message) {
    try {
      return JSON.parse(message)
    } catch (e) {
      return { text: message }
    }
  }

  anser(message) {
    console.log(message)
    let response = { method: 'test', data: { text: 'test message' } }
    this.sendConnections(response)
  }

  requestCardList(message) {
    const self = this
    Card.generateCollection().then(cardList => {
      const response = { method: 'cardList', data: { cardList: cardList } }
      self.sendConnections(response)
    })
  }

  requestQuestion(message) {
    // test method
    const sentences = ['猫に小判', 'かっぱの川流れ', '泣きっ面に蜂']
    const text = sentences.sort(() => Math.random() - 0.5)[0]
    let response = { method: 'question', data: { text: text } }
    this.sendConnections(response)
  }

  sendConnections(message) {
    this.connections.forEach(connect => {
      // TODO: いずれかがcloseになってるとエラーになるためいったん回避
      if (connect.socket.readyState === 1) {
        connect.socket.send(JSON.stringify(message))
      }
    })
  }

  closeConnection() {
    console.log('close connection')
  }
}

module.exports = WebsocketHandler
