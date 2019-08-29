<template lang="pug">
  div
    b-loading(
      :is-full-page='true'
      :active.sync='isLoading'
    )

    Navbar

    router-view
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
