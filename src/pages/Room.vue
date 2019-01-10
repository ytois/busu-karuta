<template lang="pug">
  div
    CardList
    button.button.is-success(@click='requestQuestion') request
</template>

<script>
import CardList from '../components/CardList'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('room')

export default {
  components: { CardList },

  computed: {
    ...mapState(['websocket']),
  },

  mounted() {
    this.connectSocket(this.$route.path)
  },

  methods: {
    ...mapActions(['connectSocket']),

    requestQuestion() {
      // test method
      let msg = { method: 'requestQuestion' }
      this.websocket.send(JSON.stringify(msg))
    },
  },
}
</script>
