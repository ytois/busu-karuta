<template lang="pug">
  div
    p {{ game }}

    div
      input(v-model='num')
      button.button(@click='answerNumber') ans
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    num: null,
  }),

  computed: {
    ...mapState({
      game: state => state.game.currentGame,
    }),
  },

  methods: {
    ...mapActions(['answer']),

    answerNumber() {
      this.answer(Number(this.num))
    },
  },
}
</script>
