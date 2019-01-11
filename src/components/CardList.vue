<template lang="pug">
  div
    ul
      li(v-for='card in cardList')
        Card(:cardNumber='card.id' :name='card.name', :src='card.src' :text='card.text')

    button.button(@click='requestCardList') get card
</template>

<script>
import Card from './Card'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('room')

export default {
  components: { Card },

  computed: {
    ...mapState(['cardList']),
  },

  methods: {
    ...mapActions(['requestCardList']),
  },
}
</script>
