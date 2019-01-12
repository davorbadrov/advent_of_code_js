const calculateFrequency = require('./calculateFrequency')
const { readFileInLines } = require('../utilities/file')

test('+1, -2, +3, +1 = 3', () => {
  const actual = calculateFrequency([1, -2, 3, 1])
  const expected = 3
  expect(actual).toEqual(expected)
})

test('+1, +1, +1 = 3', () => {
  const actual = calculateFrequency([1, 1, 1])
  const expected = 3
  expect(actual).toEqual(expected)
})

test('+1, +1, -2 = 0', () => {
  const actual = calculateFrequency([1, 1, -2])
  const expected = 0
  expect(actual).toEqual(expected)
})

test('-1, -2, -3, = -6', () => {
  const actual = calculateFrequency([-1, -2, -3])
  const expected = -6
  expect(actual).toEqual(expected)
})

test('large input test', () => {
  const rawInput = readFileInLines(__dirname, 'largeInput.txt')
  const input = rawInput.map(x => parseInt(x, 10))
  const actual = calculateFrequency(input)
  const expected = 561
  expect(actual).toEqual(expected)
})
