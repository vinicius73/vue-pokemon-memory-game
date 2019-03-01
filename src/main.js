import Vue from 'vue'
import App from './App.vue'
import BNotification from 'buefy/dist/components/notification'
import BIcon from 'buefy/dist/components/icon'
import BLoading from 'buefy/dist/components/loading'
import store from './store'
import { install as Filters } from './support/filters'
import './registerServiceWorker'
import './assets/scss/app.scss'

Vue.use(BNotification)
Vue.use(BIcon)
Vue.use(BLoading)
Vue.use(Filters)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
