<template lang="pug">
nav.navbar.is-fixed-top
  .navbar-start
    .has-text-centered.with-full
      p {{ currentSentence }}
  .navbar-end
    .navbar-item
      .buttons
        button.button(@click='request') 読む
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
    ...mapActions('room', ['requestQuestion']),

    request() {
      this.requestQuestion({ roomId: this.$route.params.id })
    },
  },
}
</script>

<style scoped>
.with-full {
  width: 100%;
}
</style>
