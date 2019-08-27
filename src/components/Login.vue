<template lang="pug">
  #firebaseui-auth-container
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

export default {
  computed: {
    config() {
      return {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
      }
    },
  },

  mounted() {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', this.config)
  },
}
</script>
