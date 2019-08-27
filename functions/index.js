const functions = require('firebase-functions')
const express = require('express')
const Game = require('./models/game')

// 現在のゲームを取得. 無い場合は新たに作る
exports.createGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid
  const game = new Game()
  return await game.create(uid)
})

// 回答する
exports.answerCard = functions.https.onCall((data, context) => {
  const uid = context.auth.uid
  const number = data.cardNumber
  return {
    collect: true,
    next_card: {
      id: 1,
      text: 'hoge',
    },
  }
})

// ゲームを中断する
exports.revokeGame = functions.https.onCall((data, context) => {
  return {
    status: 'ok',
  }
})

const app = express()
// ランキング
app.get('/api/ranking', (request, response) => {
  const ranking = [
    { userName: 'user1', score: 100, rank: 1 },
    { userName: 'user2', score: 90, rank: 2 },
    { userName: 'user3', score: 80, rank: 3 },
  ]
  response
    .status(200)
    .json(ranking)
    .end()
})

exports.app = functions.https.onRequest(app)
