<template lang="pug">
div
  p {{ currentSentence }}
  button.button(@click='testRead') 読む
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('game')

export default {
  computed: {
    ...mapState(['currentSentence']),
  },

  methods: {
    ...mapActions(['readSentence']),

    testRead() {
      this.readSentence('犬もあるけば棒にあたる')
    },
  },
}
</script>
