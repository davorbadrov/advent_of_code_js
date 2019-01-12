const findNonOverlapingCut = require('./findNonOverlapingCut')
const { readFileInLines } = require('../utilities/file')

test('simple inputs', () => {
  const inputs = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 6,6: 2x2'
  ]
  const actual = findNonOverlapingCut(inputs)
  const expected = '3'
  expect(actual).toEqual(expected)
})

test('more complex input', () => {
  const inputs = [
    '#1 @ 1,1: 3x2',
    '#2 @ 4,1: 2x3',
    '#3 @ 7,2: 2x2',
    '#4 @ 3,2: 5x3',
    '#5 @ 9,6: 1x1'
  ]
  const actual = findNonOverlapingCut(inputs)
  const expected = '5'
  expect(actual).toEqual(expected)
})

test('large input', () => {
  const largeInput = readFileInLines(__dirname, 'largeInput.txt')
  const actual = findNonOverlapingCut(largeInput)
  const expected = '567'
  expect(actual).toEqual(expected)
})
