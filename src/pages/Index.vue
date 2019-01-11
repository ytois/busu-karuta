<template lang="pug">
div.container
  UserRegistration

  div.room-list
    ul
      li(v-for='room in roomList')
        router-link(:to='{ name: "room", params: { id: room.id } }')
          | room-id: {{ room.id }}

  div
    button.button.is-success(@click='createRoom') New Room

</template>

<script>
import axios from 'axios'
import UserRegistration from '../components/UserRegistrationForm'

export default {
  components: { UserRegistration },

  data() {
    return {
      roomList: [],
    }
  },

  mounted() {
    this.fetchRoomList()
  },

  methods: {
    fetchRoomList() {
      const self = this
      axios.get('/api/room').then(res => (self.roomList = res.data))
    },

    createRoom() {
      // TODO: あとで作る
      return null
    },
  },
}
</script>
