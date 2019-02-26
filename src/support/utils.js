import { random } from 'lodash-es'

const randomIntList = (size, max, min = 0) => {
  return new Array(size).fill(0)
    .map(() => random(min, max))
}

export { randomIntList }
