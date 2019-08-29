<template lang="pug">
  nav.navbar(role='navigation', aria-label='main navigation')
    .navbar-brand
      a.navbar-item
        p busu-karuta.com
    .navbar-menu
      .navbar-end
        b-dropdown(position='is-bottom-left', aria-role='menu')
          a.navbar-item.navbar-burger.burger(slot='trigger', role='button')
            span(aria-hidden='true')
            span(aria-hidden='true')
            span(aria-hidden='true')
          b-dropdown-item(aria-role='menu-item', :focusable='false', custom='', paddingless='')
            a.navbar-item
              router-link(:to='{ name: "root" }') Home
            a.navbar-item
              router-link(:to='{ name: "ranking" }') Ranking
            hr.navbar-divider
            a.navbar-item
              button.button(v-show='user.uid' @click='signOut') Logout
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
    signOut() {
      firebase.auth().signOut()
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
  },
}
</script>
