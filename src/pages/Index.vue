<template lang="pug">
  p hello world
</template>

<script>
export default {
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
