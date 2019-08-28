import firebase from 'firebase'
import _ from 'lodash'
import cardList from './card_list'

export default {
  state: {
    currentGame: null,
  },

  getters: {
    currentCard: state => {
      if (!state.currentGame) return null
      const cardNum =
        state.currentGame.card_list && state.currentGame.card_list[0]
      return _.find(cardList, card => {
        return card.id === cardNum
      })
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

    answerCard({ state, getters }, cardId) {
      const card = getters.currentCard
      if (card.id === cardId) {
        state.currentGame.card_list.shift()
        return true
      } else {
        return false
      }
    },

    revokeGame() {},
  },
}
