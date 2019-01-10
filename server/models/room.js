class Room {
  static get MAX_CONNECT() {
    return 2
  }

  constructor(object) {
    this.id = object.id
    this.status = object.status
    this.connections = object.connections
  }

  fetch(id) {
    // fetch redis
  }

  update() {
    // save redis: this.string
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
