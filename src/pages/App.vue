<template lang="pug">
  div
    Navbar
    .container
      router-view

    b-loading(
      :is-full-page='true'
      :active.sync='isLoading'
    )
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,
  },

  computed: {
    ...mapState(['isLoading']),
  },
}
</script>
