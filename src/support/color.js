import { memoize } from 'lodash-es'
import GeoPattern from 'geopattern'

/**
 * @param {String} val
 * @returns {String}
 */
const getPattern = memoize(val => {
  return GeoPattern.generate(val, { generator: 'squares' })
    .toDataUrl()
})

export { getPattern }
