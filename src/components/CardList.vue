<template lang="pug">
div
  ul
    li(v-for='card in cardList')
      div(@click='onClick')
        | {{ card.name }}
  TermText
</template>

<script>
import TermText from './TermText'

export default {
  // props: ['cardList'],

  components: { TermText },

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

  methods: {
    onClick() {
      return null
    },
  },
}
</script>
