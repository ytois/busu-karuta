<template lang="pug">
  nav#footer.navbar.is-ffixed-bottom.level
    .level-item.has-text-centered
      p {{ currentText }}
    .navbar-end
      .navbar-item
        .buttons
          button.button(@click='readText') 読む
          button.button() 終了
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

  methods: {
    async readText() {
      // カードを読み上げる
      // TODO: 完了前に再実行すると文字列が混ざってしまう
      const vm = this
      if (!this.currentCard || !this.currentCard.text) return

      let textArray = this.currentCard.text.split('')
      vm.currentText = ''

      while (textArray.length > 0) {
        await sleep(300)
        vm.currentText += textArray.shift()
      }
    },
  },
}
</script>
