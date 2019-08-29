import Vue from 'vue'
import VueRouterUserRoles from 'vue-router-user-roles'
import VueAnalytics from 'vue-analytics'
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
    Vue.prototype.$user.set(Object.assign({ role: 'user' }, user))
  }

  Vue.use(VueAnalytics, {
    id: 'G-795GXEH75M',
    router,
  })

  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')
})
