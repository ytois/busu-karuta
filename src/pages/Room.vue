<template lang="pug">
  .container
    nav#footer.navbar.is-ffixed-bottom.level
      .level-item.has-text-centered
        p {{ currentText }}
      .navbar-end
        .navbar-item
          .buttons
            button.button(@click='readText') 読む
            button.button(@click='revoke') 終了

    .karuta-card-container
      Card(
        v-for='card in cardList'
        :cardNumber='card.id'
        :name='card.name'
        :src='card.src'
        :text='card.text'
        :show='isShow(card.id)'
        @click='answer'
      )

    ResultDialog(v-model='dialog' :game='result')
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import cardMaster from '@/card_list'

import Card from '@/components/Card'
import ResultDialog from '@/components/ResultDialog'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default {
  components: {
    Card,
    ResultDialog,
  },

  data: () => ({
    currentText: '',
    dialog: false,
    result: null,
  }),

  computed: {
    ...mapState({
      game: state => state.game.currentGame,
    }),
    ...mapGetters(['currentCard']),

    cardList() {
      return _.shuffle(cardMaster)
    },

    endOfGame() {
      // 残りカードがなくなったら終了
      return this.game && this.game.card_list.length === 0
    },
  },

  methods: {
    ...mapActions(['answerCard', 'revokeGame', 'finishGame']),

    isShow(cardId) {
      // 残りカードに含まれているか
      if (!this.game || !this.game.card_list) return false
      return _.includes(this.game.card_list, cardId)
    },

    answer(cardId) {
      this.answerCard(Number(cardId))
        .then(result => {
          if (result) {
            this.$snackbar.open({
              message: '正解',
              type: 'is-success',
            })
            this.readText()
          } else {
            this.$snackbar.open({
              message: '不正解',
              type: 'is-danger',
            })
          }
        })
        .then(() => {
          if (this.endOfGame) {
            // 残りカードがなくなったらゲームを終了する
            return this.finish()
          }
        })
    },

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

    revoke() {
      const vm = this
      return this.revokeGame(this.game.id).then(() => {
        vm.$router.push({ name: 'root' })
      })
    },

    async finish() {
      const payload = {
        gameId: this.game.id,
        incorrect: this.incorrectCount,
      }
      this.result = this.finishGame(payload)
      this.dialog = true
    },
  },
}
</script>

<style scoped>
#footer {
  border: 1px solid #aaa;
}
</style>
