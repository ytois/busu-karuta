<template lang="pug">
div
  p hello world
  UserRegistration
</template>

<script>
import UserRegistration from '../components/UserRegistrationForm'

export default {
  components: { UserRegistration },

  data() {
    return {
      ws: null,
    }
  },

  computed: {
    endpoint() {
      return `${location.origin.replace(/^http/, 'ws')}`
    },
  },

  mounted() {
    const self = this
    this.ws = new WebSocket(this.endpoint)

    this.ws.onopen = event => {
      self.ws.send('hoge hoge')
    }
  },
}
</script>
