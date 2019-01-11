<template lang="pug">
  .karuta-card(v-show='show' :style='rotate' @click='onClick')
    img(v-if='src' :src='src')
    p(v-else) {{ name }}
</template>

<script>
export default {
  props: {
    cardNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    rotate() {
      let angle = Math.floor(Math.random() * Math.floor(30))
      return `transform: rotate(${angle - 15}deg);`
    },
  },

  methods: {
    onClick() {
      // this.$buefy.snackbar.open(this.text)
      this.$emit('click', this.cardNumber)
    },
  },
}
</script>
