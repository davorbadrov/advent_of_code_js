const calculateFrequency = require('./calculateFrequency')

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

test('-1, -2, -3, = -6', () => {
  const actual = calculateFrequency([-1, -2, -3])
  const expected = -6
  expect(actual).toEqual(expected)
})
