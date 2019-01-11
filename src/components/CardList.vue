<template lang="pug">
  div
    ul
      li(v-for='card in cardList')
        Card(:cardNumber='card.id' :name='card.name', :src='card.src' :text='card.text')
</template>

<script>
import Card from './Card'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('room')

export default {
  components: { Card },

  computed: {
    ...mapState(['cardList']),
  },
}
</script>
