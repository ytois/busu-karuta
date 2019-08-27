<template lang="pug">
  .container
    section.hero
      .hero-body
        .container
          h1.title.level-item.has-text-centered
            | Tittle

    .level-item.has-text-centerd
      template(v-if='user.uid')
        button.button(@click='createGame') Start Game!
      template(v-else)
        Login
</template>

<script>
import firebase from 'firebase'
import Login from '@/components/Login'

export default {
  components: {
    Login,
  },

  computed: {
    user() {
      return this.$user.get()
    },
  },

  methods: {
    createGame() {
      const createGame = firebase.functions().httpsCallable('createGame')
      createGame().then(res => {
        const game = res.data
        // const gameId = game.id
        console.log(game)
      })
    },
  },
}
</script>
