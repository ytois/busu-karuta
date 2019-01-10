const Redis = require('ioredis')

class Base {
  constructor() {
    this.redis = new Redis()
  }
}

module.exports = Base
