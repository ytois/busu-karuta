import path from 'path'
import game from './game'
import WebsocketMessage from './websocket_message'

export default {
  namespaced: true,

  modules: {
    game,
    WebsocketMessage,
  },

  state: {
    websocket: null,
    cardList: [],
  },

  actions: {
    connectSocket({ state, dispatch }, payload) {
      const base = `${location.origin.replace(/^http/, 'ws')}`
      const endpoint = path.join(base, payload.roomPath)
      state.websocket = new WebSocket(endpoint)

      state.websocket.onopen = event => {
        state.websocket.send('connection open')
        console.log('connection success.')

        // 接続完了時にカードリストをリクエストする
        dispatch('requestCardList', { roomId: payload.roomId })
      }

      state.websocket.onmessage = event => {
        console.log(`receive message: ${event.data}`)
        dispatch('room/WebsocketMessage/recieve', event, {
          root: true,
        })
      }
    },

    requestCardList({ state }, roomId) {
      state.websocket.send(
        JSON.stringify({ method: 'requestCardList', data: roomId })
      )
    },

    requestQuestion({ state }, roomId) {
      state.websocket.send(
        JSON.stringify({ method: 'requestQuestion', data: roomId })
      )
    },

    setCardList({ state }, cardList) {
      state.cardList = cardList
    },
  },
}
