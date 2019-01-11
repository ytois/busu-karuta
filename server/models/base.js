const Redis = require('ioredis')

class Base {
  constructor() {
    this.redis = new Redis()
  }

  static get redis() {
    return new Redis()
  }

  static get keyName() {
    return ''
  }

  static async get(id) {
    // TODO: 存在しない場合の例外処理
    const redisKey = `${this.keyName}${id}`
    const obj = await this.redis.get(redisKey)
    return new this(JSON.parse(obj))
  }

  static async getAll(ids) {
    let keys = ids.map(id => {
      return `${this.keyName}${id}`
    })
    let records = await this.redis.mget(keys)
    return records.map(value => JSON.parse(value))
  }
}

module.exports = Base
