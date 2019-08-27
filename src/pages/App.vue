<template lang="pug">
  div
    Navbar
    .container
      router-view
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar,
  },
}
</script>
