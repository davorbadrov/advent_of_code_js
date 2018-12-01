module.exports = calculateFrequency

/**
 * Takes a frequency change list and calculates the resulting frequency.
 *
 * @param  {number[]} frequencyList List of frequency changes
 * @return {number}                 Resulting frequency
 */
function calculateFrequency (frequencyList) {
  return frequencyList.reduce((result, frequencyChange) => result + frequencyChange, 0)
}
