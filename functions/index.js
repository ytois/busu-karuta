const functions = require('firebase-functions')
const express = require('express')
const app = express()

// 現在のゲームを取得. 無い場合は新たに作る
app.get('/api/game', (request, response) => {
  const json = {
    id: 'xxxxxxxxx',
    status: 'active',
    created_at: '2019-08-01 12:00:00',
    remainingCard: 50,
  }
  response
    .status(200)
    .json(json)
    .end()
})

// 回答する
app.post('/api/game/:gameId/answer', (request, response) => {
  const json = {
    collect: true,
    next_card: {
      id: 1,
      text: 'hoge',
    },
  }
  response
    .status(200)
    .json(json)
    .end()
})

// ゲームを中断する
app.post('/api/game/:gameId/revoke', (request, response) => {
  const json = {
    status: 'ok',
  }
  response
    .status(200)
    .json(json)
    .end()
})

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
