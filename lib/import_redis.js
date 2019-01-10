const Redis = require('ioredis')
const images = require('./images')

function importImage() {
  const redis = new Redis()
  images.forEach(image => {
    const key = `card:${image.id}`
    redis.set(key, JSON.stringify(image))
  })
}

module.exports = importImage
