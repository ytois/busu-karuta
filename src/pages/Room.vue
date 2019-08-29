<template lang="pug">
  .container
    .karuta-card-container
      Card(
        v-for='card in cardList'
        :key='card.id'
        :cardNumber='card.id'
        :name='card.name'
        :src='card.src'
        :text='card.text'
        :show='isShow(card.id)'
        @click='answer'
      )
    GameNavigation
    ResultDialog(:game='game')
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'
import cardMaster from '@/card_list'

import Card from '@/components/Card'
import GameNavigation from '@/components/GameNavigation'
import ResultDialog from '@/components/ResultDialog'

export default {
  components: {
    Card,
    GameNavigation,
    ResultDialog,
  },

  data: () => ({
    incorrectCount: 0,
  }),

  computed: {
    ...mapState({
      game: state => state.game.currentGame,
    }),

    cardList() {
      return _.shuffle(cardMaster)
    },

    endOfGame() {
      // 残りカードがなくなったら終了
      return this.game && this.game.card_list.length === 0
    },
  },

  methods: {
    ...mapMutations(['startLoading', 'endLoading']),
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
          } else {
            this.incorrectCount += 1
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

    revoke() {
      const vm = this
      return this.revokeGame(this.game.id).then(() => {
        vm.$router.push({ name: 'root' })
      })
    },

    async finish() {
      this.startLoading()
      const payload = {
        gameId: this.game.id,
        incorrect: this.incorrectCount,
      }
      return this.finishGame(payload).finally(this.endLoading)
    },
  },
}
</script>

<style scoped>
#footer {
  border: 1px solid #aaa;
}
</style>
