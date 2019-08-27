<template lang="pug">
  div
    p {{ game }}
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    game: null,
  }),

  computed: {
    gameId() {
      return this.$route.params.gameId
    },
  },

  created() {
    if (this.gameId) {
      this.fetchGame()
      return
    }

    if (!this.gameId && confirm('new game?')) {
      this.createGame()
    } else {
      this.$router.push({ name: 'root' })
    }
  },

  methods: {
    fetchGame() {
      const vm = this
      const fetchGame = firebase.functions().httpsCallable('fetchGame')
      fetchGame({ game_id: this.gameId }).then(res => {
        vm.game = res.data
        console.log(vm.game)
      })
    },

    createGame() {
      const vm = this
      const createGame = firebase.functions().httpsCallable('createGame')
      createGame().then(res => {
        vm.game = res.data
        this.rewriteUrl(vm.game.id)
        console.log(vm.game)
      })
    },

    rewriteUrl(gameId) {
      window.history.replaceState(null, null, `/room/${gameId}`)
    },
  },
}
</script>
