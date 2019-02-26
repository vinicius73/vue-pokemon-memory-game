import { random } from 'lodash-es'

const randomIntList = (size, max, min = 0) => {
  return new Array(size).fill(0)
    .map(() => random(min, max))
}

const pokeSprite = id => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export { randomIntList, pokeSprite }
