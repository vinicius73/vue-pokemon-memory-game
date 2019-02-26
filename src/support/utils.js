import { random } from 'lodash-es'

const randomIntList = (size, max, min = 0) => {
  return new Array(size).fill(0)
    .map(() => random(min, max))
}

const pokeDBSprite = key => {
  return `https://img.pokemondb.net/artwork/${key}.jpg`
}

const pokeApiSprite = id => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export { randomIntList, pokeDBSprite, pokeApiSprite }
