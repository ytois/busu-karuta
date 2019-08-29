<template lang="pug">
  nav.navbar(role='navigation', aria-label='main navigation')
    .navbar-brand
      router-link.navbar-item(:to='{ name: "root" }')
        | busu-karuta.com
    .navbar-menu
      .navbar-end
        b-dropdown(position='is-bottom-left', aria-role='menu')
          a.navbar-item.navbar-burger.burger(slot='trigger', role='button')
            span(aria-hidden='true')
            span(aria-hidden='true')
            span(aria-hidden='true')
          b-dropdown-item(aria-role='menu-item', :focusable='false', custom='', paddingless='')
            template(v-if='user.uid')
              UserProfile
              hr.navbar-divider
            a.navbar-item
              router-link(:to='{ name: "root" }') Home
            a.navbar-item
              router-link(:to='{ name: "ranking" }') ランキング
            template(v-if='user.uid')
              hr.navbar-divider
              a.navbar-item
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
