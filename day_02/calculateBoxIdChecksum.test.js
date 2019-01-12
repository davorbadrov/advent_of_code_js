const calculateBoxIdChecksum = require('./calculateBoxIdChecksum')
const { readFileInLines } = require('../utilities/file')

test('simple inputs', () => {
  const inputs = [
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab'
  ]
  const actual = calculateBoxIdChecksum(inputs)
  const expected = 12
  expect(actual).toEqual(expected)
})

test('large input test', () => {
  const input = readFileInLines(__dirname, 'largeInput.txt')
  const actual = calculateBoxIdChecksum(input)
  const expected = 5658
  expect(actual).toEqual(expected)
})
