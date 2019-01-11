module.exports = findCorrectBoxLetters

/**
 * Takes a box ID list and finds the correct box letters.
 *
 * @param  {string[]} boxIds List of box IDs
 * @return {string}                 Matching boxes
 */
function findCorrectBoxLetters (boxIds) {
  for (let x = 0; x < boxIds.length; x++) {
    for (let y = x + 1; y < boxIds.length; y++) {
      const commonLetters = findCommonLetters(boxIds[x], boxIds[y])
      const distance = boxIds[x].length - commonLetters.length

      if (distance <= 1) {
        return commonLetters
      }
    }
  }
}

function findCommonLetters (firstBoxId, secondBoxId) {
  let commonLetters = []
  for (let x = 0; x < firstBoxId.length; x++) {
    if (firstBoxId[x] === secondBoxId[x]) {
      commonLetters.push(firstBoxId[x])
    }
  }

  return commonLetters.join('')
}
