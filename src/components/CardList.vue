<template lang="pug">
div
  div
    ul
      li(v-for='card in cardList')
        Card(:name='card.name', :src='card.src' :text='card.text')
  div
    TermText
</template>

<script>
import TermText from './TermText'
import Card from './Card'
import images from '../lib/images'

export default {
  // props: ['cardList'],

  components: { TermText, Card },

  computed: {
    cardList() {
      // TODO: 一旦ベタ。サーバーからpropsで渡すように変更する
      return images
    },
  },
}
</script>
