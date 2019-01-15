class Connection {
  constructor() {
    this.connections = {}
  }

  open(sessionId, roomId, socket) {
    // 重複を防ぐため既存のsocketを閉じる
    this.close(sessionId, roomId)

    this.connections[sessionId] = {
      roomId: roomId,
      socket: socket,
    }
  }

  close(sessionId, roomId) {
    let conn = this.connections[sessionId]
    if (conn && conn.roomId === roomId) {
      conn.socket.close()
      delete this.connections[sessionId]
    }
  }

  search(roomId) {
    const self = this
    let keys = Object.keys(this.connections).filter(key => {
      return self.connections[key].roomId === roomId
    })
    return keys
  }

  sendRoom(roomId, message) {
    const self = this
    this.search(roomId).forEach(sessionId => {
      const conn = self.connections[sessionId]
      if (conn.socket.readyState === 1) {
        conn.socket.send(JSON.stringify(message))
      }
    })
  }
}

module.exports = Connection
