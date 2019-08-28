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

  modules: {
    game,
  },
})
