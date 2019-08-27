<template lang="pug">
  .container
    section.hero
      .hero-body
        .container
          h1.title.level-item.has-text-centered
            | Tittle

    .level-item.has-text-centerd
      template(v-if='user.uid')
        | Start Game
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
}
</script>
