const findRepeatingFrequency = require('./findRepeatingFrequency')

test('+1, -2, +3, +1 => 2 repeats', () => {
  const actual = findRepeatingFrequency([1, -2, 3, 1])
  const expected = 2
  expect(actual).toEqual(expected)
})

test('+1, +1, -2 = 1 repeats', () => {
  const actual = findRepeatingFrequency([1, 1, -2])
  const expected = 0
  expect(actual).toEqual(expected)
})

test('+1, -1 => 0 repeats', () => {
  const actual = findRepeatingFrequency([1, -1])
  const expected = 0
  expect(actual).toEqual(expected)
})

test('+3, +3, +4, -2, -4 => 10 repeats', () => {
  const actual = findRepeatingFrequency([3, 3, 4, -2, -4])
  const expected = 10
  expect(actual).toEqual(expected)
})

test('-6, +3, +8, +5, -6 => 5 repeats', () => {
  const actual = findRepeatingFrequency([-6, 3, 8, 5, -6])
  const expected = 5
  expect(actual).toEqual(expected)
})

test('7, 7, -2, -7, -4 => 0 repeats', () => {
  const actual = findRepeatingFrequency([7, 7, -2, -7, -4])
  const expected = 14
  expect(actual).toEqual(expected)
})
