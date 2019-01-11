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
    connectSocket({ state, dispatch }, roomPath) {
      const base = `${location.origin.replace(/^http/, 'ws')}`
      const endpoint = path.join(base, roomPath)
      state.websocket = new WebSocket(endpoint)

      state.websocket.onopen = event => {
        state.websocket.send('connection open')
      }

      state.websocket.onmessage = event => {
        console.log(`receive message: ${event.data}`)
        dispatch('room/WebsocketMessage/recieve', event, {
          root: true,
        })
      }
    },

    requestCardList({ state }) {
      state.websocket.send(JSON.stringify({ method: 'requestCardList' }))
    },

    setCardList({ state }, cardList) {
      state.cardList = cardList
    },
  },
}
