<template lang="pug">
  nav.navbar.is-fixed-bottom.level.is-marginless
    .level-item.has-text-centered
      p {{ currentText }}
    .navbar-end
      .navbar-item
        .buttons
          button.button.is-info(@click='readText') 読む
    //-       button.button() 終了
</template>

<script>
import { mapGetters } from 'vuex'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default {
  data: () => ({
    currentText: '',
  }),

  computed: {
    ...mapGetters(['currentCard']),
  },

  watch: {
    currentCard() {
      this.readText()
    },
  },

  created() {
    this.readText()
  },

  methods: {
    async readText() {
      // カードを読み上げる
      const vm = this
      if (!this.currentCard || !this.currentCard.text) return
      const text = this.currentCard.text
      let textArray = text.split('')
      vm.currentText = ''

      while (textArray.length > 0) {
        await sleep(300)
        let currentText = this.currentCard && this.currentCard.text
        if (text !== currentText) {
          break
        }
        vm.currentText += textArray.shift()
      }
    },
  },
}
</script>

<style scoped>
.card-text {
  width: 100%;
  text-align: center;
}
</style>
