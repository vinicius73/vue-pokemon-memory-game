import * as mutations from './mutations.type'

const loadPokemon = ({ commit }) => {
  commit(mutations.setIsLoading, true)
  commit(mutations.setIsRunning, false)
  commit(mutations.resetSelecteds)
  commit(mutations.resetFound)
  commit(mutations.resetFailures)
  commit(mutations.resetScore)

  return import(/* webpackChunkName: "pokemon-data" */'../assets/pokemon.json')
    .then(module => Object.values(module))
    .then(data => {
      commit(mutations.setError, '')
      commit(mutations.setPokemonRawList, [...data])
      commit(mutations.setIsRunning, true)
    })
    .catch(err => {
      commit(mutations.setError, err.message)
    })
    .then(() => {
      commit(mutations.setIsLoading, false)
    })
}

const selectPokeCard = ({ commit }, pokemon) => {
  commit(mutations.addSelected, pokemon.index)
}

const setLevel = ({ commit, dispatch }, level) => {
  commit(mutations.setLevel, level)

  return dispatch('loadPokemon')
}

const addFound = ({ commit, state, getters }, id) => {
  const { nextScoreIncrement } = getters

  commit(mutations.addFound, id)
  commit(mutations.addScore, nextScoreIncrement)
  commit(mutations.resetFailures)
}

export default { loadPokemon, selectPokeCard, setLevel, addFound }
