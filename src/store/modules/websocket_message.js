// websocketからmessageイベントが来たときにこのactionsがdispachされる

export default {
  namespaced: true,

  getters: {
    websocket(_state, _getters, rootState, _rootGetters) {
      return rootState.room.websocket
    },
  },

  actions: {
    recieve({ dispatch }, event) {
      let json = JSON.parse(event.data)

      switch (json.method) {
        case 'question':
        case 'cardList':
          dispatch(json.method, json.data)
          break

        default:
          dispatch('console', event)
          break
      }
    },

    question({ dispatch }, eventData) {
      dispatch('room/game/readSentence', eventData.text, {
        root: true,
      })
    },

    cardList({ dispatch }, eventData) {
      dispatch('room/setCardList', eventData.cardList, {
        root: true,
      })
    },

    console({}, event) {
      console.log(event)
    },
  },
}
