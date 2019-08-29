<template lang="pug">
  div
    .container
      Title
      .level
        .level-item.has-text-centerd
          template(v-if='user.uid')
            button.button.is-link.mr-10(@click='newGame') はじめから
            button.button.is-link(v-if='game' @click='startGame') つづきから
          template(v-else)
            Login
    footer.footer
      .content.has-text-centered.is-size-7
        p
          | 回文考えた人
          a(href='https://twitter.com/keeeetee') @KeeeeTee
          | , イラスト描いた人
          a(href='https://twitter.com/00000cm') @00000cm
          | , Web版作った人
          a(href='https://twitter.com/splazoon') @Splazoon
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
.footer {
  background-color: initial;
  color: #bbb;
}
</style>
