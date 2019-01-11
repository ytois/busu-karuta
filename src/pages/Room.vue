<template lang="pug">
  div
    TermText
    CardList.margin-top
    button.button.is-success(@click='requestQuestion') request
</template>

<script>
import CardList from '../components/CardList'
import TermText from '../components/TermText'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('room')

export default {
  components: { CardList, TermText },

  computed: {
    ...mapState(['websocket']),
  },

  mounted() {
    this.connectSocket({
      roomPath: this.$route.path,
      roomId: this.$route.params.id,
    })
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

<style scoped>
.margin-top {
  margin-top: 50px;
}
</style>
