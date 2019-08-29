<template lang="pug">
  .container
    #ranking-table
      table.table.is-striped.is-hoverable.is-fullwidth
        thead
          tr
            th.has-text-centered ランク
            th.has-text-centered ユーザー
            th.has-text-centered タイム
            th.has-text-centered 不正解数
        tbody
          tr(v-for='rank, index in ranking')
            th.has-text-centered {{ index + 1 }}
            td.has-text-centered {{ rank.userName || '***' }}
            td.has-text-right {{ rank.seconds }}秒
            td.has-text-centered {{ rank.incorrect }}
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    ranking: [],
  }),

  computed: {
    apiUrl() {
      // return 'http://localhost:5000/busu-karuta/us-central1/api/ranking'
      return 'https://us-central1-busu-karuta.cloudfunctions.net/api/ranking'
    },
  },

  created() {
    this.fetchRanking()
  },

  methods: {
    ...mapMutations(['startLoading', 'endLoading']),

    fetchRanking() {
      const vm = this
      this.startLoading()
      return axios
        .get(this.apiUrl)
        .then(res => {
          vm.ranking = res.data
        })
        .finally(this.endLoading)
    },
  },
}
</script>

<style scoped>
#ranking-table {
  padding: 0 10%;
}
</style>
