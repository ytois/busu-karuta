<template lang="pug">
  .container
    nav#footer.navbar.is-ffixed-bottom.level
      .level-item.has-text-centered
        p {{ currentText }}
      .navbar-end
        .navbar-item
          .buttons
            button.button(@click='readText(currentCard.text)') 読む
            button.button(@click='revoke') 終了

    #card-area
      ul
        li(v-for='card in cardList')
          Card(
            :cardNumber='card.id'
            :name='card.name'
            :src='card.src'
            :text='card.text'
            :show='isShow(card.id)'
            @click='answer'
          )

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import cardMaster from '@/card_list'

import Card from '@/components/Card'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

export default {
  components: {
    Card,
  },

  data: () => ({
    num: null,
    currentText: '',
  }),

  computed: {
    ...mapState({
      game: state => state.game.currentGame,
    }),
    ...mapGetters(['currentCard']),

    cardList() {
      return _.shuffle(cardMaster)
    },
  },

  methods: {
    ...mapActions(['answerCard', 'revokeGame']),

    isShow(cardId) {
      // 残りカードに含まれているか
      if (!this.game || !this.game.card_list) return false
      return _.includes(this.game.card_list, cardId)
    },

    answer(cardId) {
      this.answerCard(Number(cardId))
      console.log(cardId)
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

    revoke() {
      const vm = this
      this.revokeGame(this.game.id).then(() => {
        vm.$router.push({ name: 'root' })
      })
    },
  },
}
</script>

<style scoped>
#footer {
  border: 1px solid #aaa;
}
</style>
