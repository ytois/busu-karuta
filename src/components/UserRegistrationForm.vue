<template lang="pug">
  section
    b-field(horizontal='' label='Name')
      b-input(v-model='inputText')
      p.control
        button.button.is-primary(@click='onSave') 変更
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('user')

export default {
  data() {
    return {
      inputText: null,
    }
  },

  computed: {
    ...mapState(['userName', 'userId']),

    defaultName() {
      return 'no_name'
    },
  },

  methods: {
    ...mapMutations(['saveId', 'saveName']),

    generateId() {
      return Math.random()
        .toString(36)
        .slice(-10)
    },

    onSave() {
      this.save(this.userId, this.inputText)
      this.$snackbar.open('変更しました')
    },

    save(id, name) {
      // cookieへ保存
      this.saveId(id)
      this.saveName(name)
    },
  },

  mounted() {
    if (!this.userId) {
      this.save(this.generateId(), this.defaultName)
    }
    this.inputText = this.userName
  },
}
</script>
