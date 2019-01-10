<template lang="pug">
  .karuta-card(@click='onClick' :style='rotate')
    p {{ text }}
</template>

<script>
export default {
  props: ['text'],

  computed: {
    rotate() {
      let angle = Math.floor(Math.random() * Math.floor(20))
      return `transform: rotate(${angle - 10}deg);`
    },
  },

  methods: {
    onClick() {
      console.log(`click: ${this.text}`)
    },
  },
}
</script>

<style scoped>
.karuta-card {
  padding: 5px;
  width: 50px;
  height: 80px;
  background-color: white;
  border: solid 1px #bbb;
  box-shadow: 1px 1px 3px #bbb;
  margin: 10px;
  float: left;
  text-align: right;
}
</style>