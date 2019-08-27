import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index'
import Room from '@/pages/Room'

Vue.use(VueRouter)

const userPermission = {
  permissions: [
    {
      role: 'guest',
      access: false,
      redirect: 'root',
    },
  ],
}
const routes = [
  { name: 'root', path: '/', component: Index },
  {
    name: 'new_room',
    path: '/room/new',
    component: Room,
    meta: userPermission,
  },
  {
    name: 'room',
    path: '/room/:gameId',
    component: Room,
    meta: userPermission,
  },
]

export default new VueRouter({
  mode: 'history',
  routes,
})
