<template lang="pug">
nav.navbar.is-fixed-top
  .has-text-centered.with-full
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

<style scoped>
.with-full {
  width: 100%;
}
</style>
