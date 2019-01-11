import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'
import Room from '../pages/Room'

Vue.use(VueRouter)

const routes = [
  { name: 'root', path: '/', component: Index },
  { name: 'room', path: '/room/:id', component: Room },
]

export default new VueRouter({
  routes,
})
