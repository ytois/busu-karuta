const functions = require('firebase-functions')
const express = require('express')
const Game = require('./models/game')

// ゲーム取得
exports.fetchGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid
  const gameId = data.game_id
  const game = new Game(gameId)
  // TODO: ユーザーチェック
  return await game.get()
})

// ゲーム作成
exports.createGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid
  const game = new Game()
  return await game.create(uid)
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
