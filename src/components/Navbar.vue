<template lang="pug">
  b-navbar
    template(slot='brand')
      b-navbar-item
        router-link.navbar-item(:to='{ name: "root" }')
          | ブサイク回文カルタ
    template(slot='start')
      b-navbar-item
        router-link(:to='{ name: "root" }') Home
      b-navbar-item
        router-link(:to='{ name: "ranking" }') ランキング
    template(slot='end')
      b-navbar-item
        UserProfile
      b-navbar-item
        .buttons
          button.button(v-show='user.uid' @click='signOut') Logout
</template>

<script>
import firebase from 'firebase'
import UserProfile from '@/components/UserProfile'
import Login from '@/components/Login'

export default {
  components: {
    UserProfile,
    Login,
  },

  computed: {
    user() {
      return this.$user.get()
    },
  },

  methods: {
    signOut() {
      firebase.auth().signOut()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
}
</script>
