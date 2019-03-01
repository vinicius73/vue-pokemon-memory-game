import { size, map, chunk, shuffle, find } from 'lodash-es'
import { randomIntList } from '../support/utils'
import { getColsNumber } from '../support/grid'

export default {
  // count all pokemon
  pokemonRawCount: ({ pokemonRawList }) => size(pokemonRawList),
  // number of cards
  levelCount: ({ level }) => level * 2,
  // number of pokemon found
  foundCount: ({ found }) => size(found),
  // random pokemon pokemon list
  pokemon: ({ level, pokemonRawList }, { pokemonRawCount }) => {
    if (pokemonRawCount <= 0) {
      return []
    }

    const indexes = randomIntList(level, pokemonRawCount - 1, 0)
    return map(indexes, index => pokemonRawList[index])
  },
  // list of pokecards
  pokeCards: (state, { pokemon }) => {
    const list = shuffle([...pokemon, ...pokemon])

    return map(list, (row, index) => {
      return {
        ...row,
        index
      }
    })
  },
  // lists of pokemon list
  pokeCardsLists: (state, { pokeCards }) => {
    return chunk(
      pokeCards,
      getColsNumber(size(pokeCards))
    )
  },
  // poke cards selected
  selectedCards: ({ selecteds }, { pokeCards }) => {
    return map(selecteds, index => {
      return find(pokeCards, card => card.index === index)
    })
  },
  // all pokemon has find
  isDone: ({ level }, { foundCount }) => {
    if (foundCount === 0) {
      return false
    }

    return level === foundCount
  },
  // cards selected is math
  isMath: (state, { selectedCards }) => {
    if (size(selectedCards) === 2) {
      const [a, b] = selectedCards
      return a.id === b.id
    }

    return false
  },
  baseScore: ({ level }) => {
    return level * level
  },
  nextScoreIncrement: ({ level, failures }, { baseScore }) => {
    if (failures === 0) {
      return baseScore
    }

    // max factor
    const factor = failures < 10 ? (failures / 10) : 0.9
    const value = baseScore - (baseScore * factor)

    return Math.floor(value)
  }
}
