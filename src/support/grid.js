import { cond, stubTrue, curry, constant, gte } from 'lodash-es'

const isDivisible = curry((a, b) => {
  return (b % a) === 0
})

const getLargeCols = cond([
  [isDivisible(10), constant(10)],
  [isDivisible(12), constant(12)],
  [stubTrue, constant(16)]
])

const getColsNumber = cond([
  [val => gte(val, 60), getLargeCols],
  [isDivisible(7), constant(7)],
  [isDivisible(9), constant(9)],
  [isDivisible(8), constant(8)],
  [stubTrue, constant(6)]
])

const getColsMobileNumber = cond([
  [val => gte(val, 24), constant(4)],
  [stubTrue, constant(3)]
])

export { getColsNumber, getColsMobileNumber }
