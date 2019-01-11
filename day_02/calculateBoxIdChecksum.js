module.exports = calculateBoxIdChecksum

/**
 * Takes a box ID list and calculates the resulting checksum.
 *
 * @param  {number[]} boxIds List of box IDs
 * @return {number}                 Resulting checksum
 */
function calculateBoxIdChecksum (boxIds) {
  const result = boxIds.reduce((counts, boxId) => {
    const letterCounts = calculateLetterCounts(boxId)
    if (letterCounts.includes(2)) {
      counts.twos = counts.twos + 1
    }

    if (letterCounts.includes(3)) {
      counts.threes = counts.threes + 1
    }

    return counts
  }, {
    twos: 0,
    threes: 0
  })

  return result.twos * result.threes
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
