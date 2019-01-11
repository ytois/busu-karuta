const Redis = require('ioredis')

class Base {
  constructor(obj) {
    this.redis = new Redis()
    this.columns = Object.keys(obj)
    Object.assign(this, obj)
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
    var keys = []
    if (ids) {
      keys = ids.map(id => {
        return `${this.keyName}${id}`
      })
    } else {
      keys = await this.redis.keys(`${this.keyName}*`)
    }
    let records = await this.redis.mget(keys)
    return records.map(value => JSON.parse(value))
  }

  get json() {
    let json = {}
    this.columns.forEach(key => {
      json[key] = this[key]
    })
    return json
  }

  get string() {
    return JSON.stringify(this.json)
  }
}

module.exports = Base
