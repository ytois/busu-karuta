import firebase from 'firebase'
import _ from 'lodash'
import cardList from '@/card_list'

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

    correct(state) {
      state.currentGame.card_list.shift()
    },

    incorrect(state) {
      state.currentGame.incorrect = (state.currentGame.incorrect || 0) + 1
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

    answerCard({ getters, commit }, cardId) {
      const card = getters.currentCard
      if (card.id === cardId) {
        commit('correct')
        return true
      } else {
        commit('incorrect')
        return false
      }
    },

    revokeGame({ commit }, gameId) {
      const revokeGame = firebase.functions().httpsCallable('revokeGame')
      return revokeGame({ game_id: gameId }).then(() => {
        commit('setGame', null)
      })
    },

    finishGame({ commit }, payload) {
      const finishGame = firebase.functions().httpsCallable('finishGame')
      return finishGame({
        game_id: payload.gameId,
        incorrect: payload.incorrectCount,
      }).then(res => {
        commit('setGame', res.data)
      })
    },
  },
}
