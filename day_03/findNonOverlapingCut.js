module.exports = findNonOverlapingCut

function findNonOverlapingCut (cutStrings) {
  const cutCoordinates = cutStrings.map(parseCuts)

  for (let x = 0; x < cutCoordinates.length; x++) {
    let overlap = false
    for (let y = 0; y < cutCoordinates.length; y++) {
      if (x === y) continue
      if (areCoordinatesOverlapping(cutCoordinates[x], cutCoordinates[y])) {
        overlap = true
      }
    }

    if (!overlap) {
      return cutCoordinates[x].id
    }
  }

  return null
}

/**
 * Parses a cut ID string into coordinates.
 * '#123 @ 3,2: 5x4'
 * =>
 * {id: 123, x1: 3, y1: 2, x2: 8, y2: 6}
 *
 * @param  {string} cutString cut ID
 * @return {object}           coordinates of the cut
 */
function parseCuts (cutString) {
  const id = /^#([0-9]+)/.exec(cutString)[1]

  const [_, coordinatePart] = cutString.split(' @ ')
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

  return {
    id,
    lt: {x: x1, y: y1}, // left top
    rb: {x: x2, y: y2}  // right bottom
  }
}

function areCoordinatesOverlapping (c1, c2) {
  if (c1.lt.x > c2.rb.x || c2.lt.x > c1.rb.x) return false
  if (c1.lt.y > c2.rb.y || c2.lt.y > c1.rb.y) return false
  return true
}
