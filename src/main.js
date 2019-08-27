import Vue from 'vue'
import VueRouterUserRoles from 'vue-router-user-roles'
import store from '@/store'
import router from '@/router'
import App from '@/pages/App'
import '@/styles'
import firebase from '@/firebase'

Vue.config.productionTip = false
Vue.use(VueRouterUserRoles, { router })
Vue.prototype.$user.set({ role: 'guest ' })

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    Vue.prototype.$user.set(user)
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
