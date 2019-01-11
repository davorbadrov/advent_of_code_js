const findCorrectBoxLetters = require('./findCorrectBoxLetters')
const { readFileInLines } = require('../utilities/readFile')

test('simple inputs', () => {
  const inputs = [
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'
  ]
  const actual = findCorrectBoxLetters(inputs)
  const expected = 'fgij'
  expect(actual).toEqual(expected)
})

test('large input test', () => {
  const input = readFileInLines(__dirname, 'largeInput.txt')
  const actual = findCorrectBoxLetters(input)
  const expected = 'nmgyjkpruszlbaqwficavxneo'
  expect(actual).toEqual(expected)
})
