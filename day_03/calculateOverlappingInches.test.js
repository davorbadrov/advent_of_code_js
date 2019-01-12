const calculateOverlappingInches = require('./calculateOverlappingInches')
const { readFileInLines } = require('../utilities/file')

test('simple inputs', () => {
  const inputs = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
  ]
  const actual = calculateOverlappingInches(inputs)
  const expected = 4
  expect(actual).toEqual(expected)
})

test('large input', () => {
  const largeInput = readFileInLines(__dirname, 'largeInput.txt')
  const actual = calculateOverlappingInches(largeInput)
  const expected = 117948
  expect(actual).toEqual(expected)
})
