import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import cardsActions from './plugins-cards-actions'

Vue.use(Vuex)

export default new Store({
  mutations,
  actions,
  getters,
  state,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [cardsActions]
})
