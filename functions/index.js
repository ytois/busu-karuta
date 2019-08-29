const functions = require('firebase-functions')
const express = require('express')
const Game = require('./models/game')
const admin = require('./admin')
const cors = require('cors')

// ゲーム取得
exports.fetchGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid
  const gameId = data.game_id
  const game = new Game(gameId)
  return await game.get()
})

// ゲーム作成
exports.createGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid
  const user = {
    name: context.auth.token.name,
    picture: context.auth.token.picture,
  }
  const game = new Game()
  return await game.create(uid, user)
})

// ゲームの強制終了
exports.revokeGame = functions.https.onCall(async (data, context) => {
  const gameId = data.game_id
  const game = new Game(gameId)
  return await game.revoke()
})

// ゲームの終了
exports.finishGame = functions.https.onCall(async (data, context) => {
  const gameId = data.game_id
  const incorrect = data.incorrect
  const game = new Game(gameId)
  return await game.finish(incorrect)
})

const api = express()
api.use(cors({ origin: true }))
// ランキング
api.get('/ranking', async (request, response) => {
  const docRef = await admin
    .firestore()
    .collection('games')
    .where('status', '=', 'finish')
    .orderBy('seconds')
    .get()
  const ranking = docRef.docs.map(doc => {
    const data = doc.data()
    const user = data.user || {}
    return {
      userName: user.name,
      userPicture: user.picture,
      seconds: data.seconds,
      incorrect: data.incorrect,
    }
  })
  response
    .status(200)
    .json(ranking)
    .end()
})

exports.api = functions.https.onRequest(api)
