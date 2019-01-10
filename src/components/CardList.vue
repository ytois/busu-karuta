<template lang="pug">
div
  div
    ul
      li(v-for='card in cardList')
        Card(:text='card.name')
  div
    TermText
</template>

<script>
import TermText from './TermText'
import Card from './Card'

export default {
  // props: ['cardList'],

  components: { TermText, Card },

  computed: {
    cardList() {
      // TODO: 一旦ベタ。サーバーからpropsで渡すように変更する
      return [
        { number: 1, name: 'あ', src: '' },
        { number: 2, name: 'い', src: '' },
        { number: 3, name: 'う', src: '' },
        { number: 4, name: 'え', src: '' },
        { number: 4, name: 'お', src: '' },
      ]
    },
  },
}
</script>
