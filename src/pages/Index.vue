<template lang="pug">
  .container
    section.hero
      .hero-body
        .container
          h1.title.level-item.has-text-centered
            | Tittle

    .level-item.has-text-centerd
      template(v-if='user.uid')
        button.button(@click='newGame') Start Game!
        router-link(:to='{ name: "room", params: { gameId: "2N96HlKPSbGyiV1szU5l"}}') room
      template(v-else)
        Login
</template>

<script>
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
    newGame() {
      this.$router.push({ name: 'new_room' })
    },
  },
}
</script>
