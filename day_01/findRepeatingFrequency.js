module.exports = findRepeatingFrequency

/**
 * Takes a frequency change list and adds the values
 * until it finds a frequency change result which repeats itself.
 *
 * @param  {number[]} frequencyList List of frequency changes
 * @return {number}                 Repeating frequency value
 */
function findRepeatingFrequency (frequencyList) {
  let result = 0
  const calculatedFrequencySet = new Set([result])
  let it = 0
  while (true) {
    for (let frequencyChange of frequencyList) {
      result = result + frequencyChange
      if (calculatedFrequencySet.has(result)) return result
      calculatedFrequencySet.add(result)
    }
  }
}
