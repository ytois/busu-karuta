<template lang="pug">
  .modal(:class='className')
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title 結果
        button.delete(@click='close' aria-label='close')
      section.modal-card-body
        p 時間: {{ resultTime }}秒
        p 不正回数: {{ game && game.incorrect }}
      footer.modal-card-foot
        button.button(@click='close') 終了
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    endOfGame() {
      // end_atに値があった場合は自動でダイアログを開く
      return !!(this.game && this.game.end_at)
    },

    className() {
      return this.endOfGame ? 'is-active' : ''
    },

    resultTime() {
      // かかった時間
      if (!this.game || !this.game.end_at) return null
      return this.game.end_at._seconds - this.game.created_at._seconds
    },
  },

  methods: {
    close() {
      this.$router.push({ name: 'root' })
    },
  },
}
</script>
