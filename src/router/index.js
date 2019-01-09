import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'

Vue.use(VueRouter)

const routes = [{ path: '/', component: Index }]

export default new VueRouter({
  routes,
})
