import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ paths: ['user'] })],

  modules: {
    user,
  },
})
