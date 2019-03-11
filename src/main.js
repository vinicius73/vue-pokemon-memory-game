import Vue from 'vue'
import store from './store'
import { install as Filters } from './support/filters'
import { install as Ga } from './support/ga'
import { install as Buefy } from './buefy'
import './registerServiceWorker'
import './assets/scss/app.scss'

Vue.use(Ga)
Vue.use(Buefy)
Vue.use(Filters)

Vue.config.productionTip = false

const App = () => import(/* webpackChunkName: "app-shell" */ './AppShell.vue')

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
