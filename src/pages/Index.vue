<template lang="pug">
  .container
    section.hero
      .hero-body
        .container
          h1.title.level-item.has-text-centered
            | Tittle

    .level-item.has-text-centerd
      template(v-if='user.uid')
        button.button(v-if='!game' @click='newGame') New Game
        button.button(v-if='game' @click='startGame') Continue Game
      template(v-else)
        Login
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Login from '@/components/Login'

export default {
  components: {
    Login,
  },

  computed: {
    ...mapState({
      game: state => state.game.currentGame,
    }),

    user() {
      return this.$user.get()
    },
  },

  methods: {
    ...mapActions(['createGame']),

    newGame() {
      const vm = this
      this.createGame().then(_game => {
        vm.$router.push({ name: 'game' })
      })
    },

    startGame() {
      this.$router.push({ name: 'game' })
    },
  },
}
</script>
