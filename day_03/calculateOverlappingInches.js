module.exports = calculateOverlappingInches

function calculateOverlappingInches (cutIds) {
  const cutCoordinates = cutIds.map(parseCutId)
  const cutMap = {}

  for (const cut of cutCoordinates) {
    for (let x = cut.x1; x < cut.x2; x++) {
      for (let y = cut.y1; y < cut.y2; y++) {
        cutMap[`${x},${y}`] = cutMap[`${x},${y}`]
          ? cutMap[`${x},${y}`] + 1
          : 1
      }
    }
  }

  return Object
    .values(cutMap)
    .filter(v => v >= 2)
    .length
}

/**
 * Parses a cut ID string into coordinates.
 * '#123 @ 3,2: 5x4'
 * =>
 * {x1: 3, y1: 2, x2: 8, y2: 6}
 *
 * @param  {string} cutId cut ID
 * @return {object}       coordinates of the cut
 */
function parseCutId (cutId) {
  const [_, coordinatePart] = cutId.split(' @ ')
  const [
    startCoordinatePart,
    endCoordinatePart
  ] = coordinatePart.split(': ')

  const [x1Str, y1Str] = startCoordinatePart.split(',')
  const [x2Str, y2Str] = endCoordinatePart.split('x')

  const x1 = parseInt(x1Str, 10)
  const y1 = parseInt(y1Str, 10)
  const wx = parseInt(x2Str, 10)
  const wy = parseInt(y2Str)
  const x2 = x1 + wx
  const y2 = y1 + wy

  return { x1, y1, x2, y2 }
}

function calculateLetterCounts (boxId) {
  const letters = [...boxId]

  const letterCountMap = letters.reduce((letterCounts, letter) => {
    if (letterCounts[letter]) {
      letterCounts[letter] = letterCounts[letter] + 1
    } else {
      letterCounts[letter] = 1
    }

    return letterCounts
  }, {})

  return Object.values(letterCountMap)
}
