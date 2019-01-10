class WebsocketHandler {
  constructor(websocket, connections) {
    this.websocket = websocket
    this.connections = connections
  }

  receiveMessage(message) {
    let json = this.parseMessage(message)

    switch (json.method) {
      case 'anser':
        this[json.method](json.data)
        break

      default:
        console.log('undefined message: ')
        console.log(json)
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
    this.connections.forEach(connect => {
      connect.socket.send(JSON.stringify(response))
    })
  }

  closeConnection() {
    console.log('close connection')
  }
}

module.exports = WebsocketHandler
