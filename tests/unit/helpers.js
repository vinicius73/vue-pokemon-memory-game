import { install as Buefy } from '@/buefy'
import { install as filters } from '@/support/filters'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const factoryVue = () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)
  localVue.use(filters)
  localVue.use(Buefy)

  return localVue
}

export { factoryVue }
