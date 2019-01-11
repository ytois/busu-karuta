<template lang="pug">
  .karuta-card(@click='onClick' :style='rotate')
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
  },

  computed: {
    rotate() {
      let angle = Math.floor(Math.random() * Math.floor(30))
      return `transform: rotate(${angle - 15}deg);`
    },
  },

  methods: {
    onClick() {
      this.$snackbar.open(this.text)
    },
  },
}
</script>

<style scoped>
.karuta-card {
  width: 70px;
  background-color: white;
  border: solid 1px #bbb;
  box-shadow: 1px 1px 3px #bbb;
  margin: 10px;
  float: left;
  text-align: right;
}
</style>
