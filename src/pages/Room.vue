<template lang="pug">
  .container
    p {{ game }}

    div
      input(v-model='num')
      button.button(@click='answerNumber') ans

    nav#footer.navbar.is-fixed-bottom.level
      .level-item.has-text-centered.with-full
        p {{ currentText }}
      .navbar-end
        .navbar-item
          .buttons
            button.button(@click='readText(currentCard.text)') 読む
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default {
  data: () => ({
    num: null,
    currentText: '',
  }),

  computed: {
    ...mapState({
      game: state => state.game.currentGame,
    }),
    ...mapGetters(['currentCard']),
  },

  methods: {
    ...mapActions(['answerCard']),

    answerNumber() {
      this.answerCard(Number(this.num))
    },

    async readText(text) {
      const vm = this
      let textArray = text.split('')
      vm.currentText = ''

      while (textArray.length > 0) {
        await sleep(300)
        vm.currentText += textArray.shift()
      }
    },
  },
}
</script>

<style scoped>
#footer {
  border-top: 1px solid #aaa;
}
</style>
