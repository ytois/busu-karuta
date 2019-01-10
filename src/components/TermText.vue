<template lang="pug">
div
  p {{ currentSentence }}
  button.button(@click='testRead') 読む
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('room/game', {
      currentSentence: state => state.currentSentence,
    }),
  },

  methods: {
    ...mapActions('room/WebsocketMessage', ['question']),

    testRead() {
      this.question({ text: '犬もあるけば棒にあたる' })
    },
  },
}
</script>
