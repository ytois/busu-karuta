import firebase from 'firebase'

export default {
  state: {
    currentGame: null,
  },

  getters: {
    currentCard: state => {
      if (!state.currentGame) return null
      return state.currentGame.card_list && state.currentGame.card_list[0]
    },
  },

  mutations: {
    setGame(state, game) {
      state.currentGame = game
    },
  },

  actions: {
    fetchGame({ state, commit }, gameId) {
      const fetchGame = firebase.functions().httpsCallable('fetchGame')
      return fetchGame({ game_id: gameId }).then(res => {
        commit('setGame', res.data)
        return state.currentGame
      })
    },

    createGame({ state, commit }) {
      const createGame = firebase.functions().httpsCallable('createGame')
      return createGame().then(res => {
        commit('setGame', res.data)
        return state.currentGame
      })
    },

    answer({ state, getters }, cardNumber) {
      const card = getters.currentCard
      if (card === cardNumber) {
        state.currentGame.card_list.shift()
        return true
      } else {
        return false
      }
    },
  },
}
