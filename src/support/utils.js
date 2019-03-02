import { random, uniq, size } from 'lodash-es'

const nextUniq = (length, min, max, original = []) => {
  const cleaned = uniq(original)

  if (size(cleaned) === length) {
    return cleaned
  }

  return nextUniq(length, min, max, [...cleaned, random(min, max)])
}

const randomIntList = (length, max, min = 0) => {
  return nextUniq(length, max, min)
}

const pokeDBSprite = key => {
  return `https://img.pokemondb.net/artwork/${key}.jpg`
}

const pokeApiSprite = id => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const isMobile = () => window.screen.width <= 699

const makeLevels = (base, length) => Array.from({ length }).map((_, index) => {
  return base * (index + 1)
})

export { randomIntList, pokeDBSprite, pokeApiSprite, isMobile, makeLevels }
