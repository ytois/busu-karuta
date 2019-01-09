import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'
import Room from '../pages/Room'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Index },
  { path: '/room/:id', component: Room },
]

export default new VueRouter({
  routes,
})
