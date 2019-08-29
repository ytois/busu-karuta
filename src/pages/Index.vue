<template lang="pug">
  .container
    Title
    .level
      .level-item.has-text-centerd
        template(v-if='user.uid')
          button.button.is-link.mr-10(@click='newGame') はじめから
          button.button.is-link(v-if='game' @click='startGame') つづきから
        template(v-else)
          Login
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Title from '@/components/Title'
import Login from '@/components/Login'

export default {
  components: {
    Title,
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
    ...mapMutations(['startLoading', 'endLoading']),
    ...mapActions(['createGame']),

    newGame() {
      const vm = this
      this.startLoading()
      this.createGame()
        .then(_game => {
          vm.$router.push({ name: 'game' })
        })
        .finally(this.endLoading)
    },

    startGame() {
      this.$router.push({ name: 'game' })
    },
  },
}
</script>

<style scoped>
.mr-10 {
  margin-right: 10px;
}
</style>
