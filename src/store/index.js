import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import game from '@/store/modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'busu_karuta_app',
      paths: ['game.currentGame'],
    }),
  ],

  state: {
    isLoading: false,
  },

  mutations: {
    startLoading(state) {
      state.isLoading = true
    },

    endLoading(state) {
      state.isLoading = false
    },
  },

  modules: {
    game,
  },
})
