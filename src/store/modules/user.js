export default {
  namespaced: true,

  state: {
    userId: null,
    userName: null,
  },

  mutations: {
    saveId(state, id) {
      state.userId = id
    },

    saveName(state, name) {
      state.userName = name
    },
  },
}
