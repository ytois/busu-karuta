<template lang="pug">
  .level.is-marginless
    .level-item
      figure.image.is-32x32
        img.is-rounded(:src="userPicture")
    .level-item
      p {{ userName }}
</template>

<script>
export default {
  computed: {
    user() {
      return this.$user.get()
    },

    userName() {
      return this.user && this.user.displayName
    },

    userPicture() {
      return this.user && this.user.photoURL
    },
  },
}
</script>
