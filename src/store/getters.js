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
  pokeCards: ({ shuffleCount }, { pokemon }) => {
    const list = shuffle([...pokemon, ...pokemon])

    return map(list, (row, index) => {
      return {
        ...row,
        shuffleCount, // only to force update of the list.
        index
      }
    })
  },
  // lists of pokemon list
  pokeCardsLists: ({ isMobile }, { pokeCards }) => {
    return chunk(
      pokeCards,
      isMobile ? 3 : getColsNumber(size(pokeCards))
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
  baseScore: ({ level, isEasyMode, isRouletteMode }) => {
    const factor = isRouletteMode ? 3 : 2
    const base = Math.pow(level, factor)

    return isEasyMode
      ? Math.floor(base * (isRouletteMode ? 0.25 : 0.50))
      : base
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
