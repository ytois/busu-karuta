const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default {
  namespaced: true,

  state: {
    currentSentence: '',
  },

  mutations: {
    initializeTern(state) {
      state.currentSentence = ''
    },
  },

  actions: {
    async readSentence({ state }, text) {
      state.currentSentence = ''
      let textArray = text.split('')

      while (textArray.length > 0) {
        await sleep(300)
        state.currentSentence += textArray.shift()
      }
    },

    next() {},

    finish() {},
  },
}
