module.exports = guardMostFrequestAsleepCalculation

function guardMostFrequestAsleepCalculation (guardSleepingLogStrings) {
  // sort input
  const sortedSleepingLogStrings = sortSleepingLogs(guardSleepingLogStrings)
  
  // parse input into structure { id: number, sleepSchedule: object[] }
  const guardSleepLogs = parseLogStrings(sortedSleepingLogStrings)

  // select the guard with highest amount of sleep guard
  const mostFrequestSleepingGuard = findGuardMostFrequestAsleepOnAMinute(guardSleepLogs)

  // multiply the guard id with the minute mentioned in previous step
  return mostFrequestSleepingGuard.guardId * mostFrequestSleepingGuard.mostFrequentSleep.minute
}


/**
 * Function takes an array of sleeping log strings and sorts them
 *
 * Log example: [1518-11-09 23:58] Guard #853 begins shift
 *
 * @param {string[]} log logs with timestamps
 * @returns {string[]} sorted logs according to their timestamps
 */
function sortSleepingLogs (guardSleepingLog) {
  return guardSleepingLog
    .slice() // avoid in place sort
    .sort((log1, log2) => {
      const timestamp1 = parseDateFromLog(log1)
      const timestamp2 = parseDateFromLog(log2)
      return timestamp1.getTime() - timestamp2.getTime()
    })
}

/**
 * Function will take the timestamp from the log, and
 * parse it into a JS date.
 *
 * Log example: [1518-11-09 23:58] Guard #853 begins shift
 * Returns:     1518-11-09T23:58:00.000Z
 *
 * @param {string} log string containing a timestamp inside brackets
 * @returns {Date} date based on the timestamp
 */
function parseDateFromLog (log) {
  const timestampStart = log.indexOf('[')
  const timestampStop = log.indexOf(']')
  const timestampString = log.slice(timestampStart + 1, timestampStop)
  const isoDateString = timestampString.replace(' ', 'T') + ':00.000Z'
  const date = new Date(isoDateString)
  return date
}

/**
 * Function parses all the sleep logs into structures.
 *
 * Structure:
 * {
 *   rawLog: string,   // original string
 *   guardId: number,  // guard's ID, number after #
 *   sleepSchedule: [  // array of sleeping schedules, contains only minutes
 *     {
 *       start: number, // the minute guard started sleeping
 *       end: number    // the minute guard stoped sleeping
 *     }
 *   ]
 * }
 * 
 * @param {string[]} sleepLogStrings sorted list of sorted strings
 * @returns {object[]} parsed sleep log structures
 */
function parseLogStrings (sortedSleepLogStrings) {
  // a map will enable us quicker access
  let parsedSleepLogMap = {}
  let currentGuard = null

  for (let x = 0; x < sortedSleepLogStrings.length; x++) {
    const log = sortedSleepLogStrings[x]
    const isGuardChange = log.includes('Guard #')
    const isFallAsleep = log.includes('falls asleep')
    const isWakesUp = log.includes('wakes up')
    
    if (isGuardChange) {
      currentGuard = extractGuardIdFromLog(log)
      if (!parsedSleepLogMap[currentGuard]) {
        parsedSleepLogMap[currentGuard] = {
          rawLog: log,
          guardId: currentGuard,
          sleepSchedule: []
        }
      }
    } else if (isFallAsleep) {
      const sleepStart = extractMinutesFromLog(log)
      parsedSleepLogMap[currentGuard].sleepSchedule.push({
        start: sleepStart,
        startLog: log
      })
    } else if (isWakesUp) {
      const lastSleepSchedule = last(parsedSleepLogMap[currentGuard].sleepSchedule)
      const sleepEnd = extractMinutesFromLog(log)
      lastSleepSchedule.end = sleepEnd
      lastSleepSchedule.endLog = log
    }
  }

  const parsedSleepLogs = Object.values(parsedSleepLogMap)
  return parsedSleepLogs
}

function extractGuardIdFromLog (log) {
  const matchGuardIdRegex = /#(\d+)/
  const [_, guardId] = matchGuardIdRegex.exec(log)
  return parseInt(guardId, 10)
}

function extractMinutesFromLog (log) {
  const matchMinutesRegex = /:(\d{2})]/
  const [_, minutes] = matchMinutesRegex.exec(log)
  return parseInt(minutes)
}

function last (array) {
  if (array.length === 0) return null
  return array[array.length - 1]
}

function findGuardMostFrequestAsleepOnAMinute (guardLogs) {
  const guardLogsWithMinutes = guardLogs.map(addMinuteSleepFrequencyToLog)
  const sortedGuardLogsByFrequency = guardLogsWithMinutes
    .slice()
    .sort((guardLog1, guardLog2) => {

      return guardLog1.mostFrequentSleep.count - guardLog2.mostFrequentSleep.count
    })

  const mostFrequentGuardToSleepOnSameMinute = last(sortedGuardLogsByFrequency)

  return mostFrequentGuardToSleepOnSameMinute
}

function addMinuteSleepFrequencyToLog (guardLog) {
  const {minute, count} = findMinuteAndCount(guardLog)
  return {
    ...guardLog,
    mostFrequentSleep: {
      minute: minute || 0,
      count: count || 0
    }
  }
}

function findMinuteAndCount (guardLog) {
  const sleepRanges = guardLog.sleepSchedule
    .map(({start, end}) => getRange(start, end))
  const sleepMinuteCount = sleepRanges.reduce((sleepMap, minuteRange) => {
    for (const minute of minuteRange) {
      sleepMap[minute] = sleepMap[minute] ? sleepMap[minute] + 1 : 1
    }

    return sleepMap
  }, {})


  const sortedMinutesBySleep = Object.keys(sleepMinuteCount)
    .sort((minute1, minute2) => {
      return sleepMinuteCount[minute1] - sleepMinuteCount[minute2]
      // sleepMinuteCount[minute]
    })

  const minuteWithMostSleep = last(sortedMinutesBySleep)

  return {
    minute: minuteWithMostSleep,
    count: sleepMinuteCount[minuteWithMostSleep]
  }
}

function getRange (start, end) {
  let range = []
  for (x = start; x < end; x++) {
    range.push(x)
  }
  return range
}
