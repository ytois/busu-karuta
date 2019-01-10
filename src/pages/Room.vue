<template lang="pug">
  div
    CardList
    button.button.is-success(@click='sendAnser') send
</template>

<script>
import CardList from '../components/CardList'

export default {
  components: { CardList },

  data() {
    return {
      ws: null,
    }
  },

  computed: {
    endpoint() {
      let base = `${location.origin.replace(/^http/, 'ws')}`
      return `${base}${this.$route.path}`
    },
  },

  methods: {
    sendAnser() {
      let msg = { method: 'anser', data: 'test message' }
      this.ws.send(JSON.stringify(msg))
    },
  },

  mounted() {
    const self = this
    this.ws = new WebSocket(this.endpoint)

    this.ws.onopen = event => {
      self.ws.send('hoge hoge')
    }

    this.ws.onmessage = event => {
      console.log(`receive message: ${event.data}`)
    }
  },
}
</script>
