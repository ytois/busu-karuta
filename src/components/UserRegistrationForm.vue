<template lang="pug">
  div
    p {{ userId }}
    p {{ userName }}
    v-field(label='UserName')
      b-input(v-model='inputText')
    a.button.is-primary(@click='onSave') 登録
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

  watch: {
    userName() {
      this.inputText = this.userName
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
  },
}
</script>
