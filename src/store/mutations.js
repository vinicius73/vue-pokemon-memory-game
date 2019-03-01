import { size, uniq } from 'lodash-es'
import * as types from './mutations.type'

const isSet = action => action === 'set'
const makeMutation = prop => (state, value) => {
  state[prop] = value
}

const mutations = Object.entries(types)
  .reduce((acc, [key, value]) => {
    const [action, prop] = value.split('/')

    if (isSet(action)) {
      acc[value] = makeMutation(prop)
    }

    return acc
  }, {})

export default {
  ...mutations,
  [types.resetFound]: state => {
    state.found = []
  },
  [types.resetSelecteds]: state => {
    state.selecteds = []
  },
  [types.addFound]: (state, id) => {
    state.found = uniq([...state.found, id])
  },
  [types.addSelected]: (state, id) => {
    if (size(state.selecteds) < 2) {
      state.selecteds = uniq([...state.selecteds, id])
    }
  }
}
