import axios from 'axios'

const BASE_URL = 'https://www.random.org/integers/'
const MAX_RESULTS_PER_CALL = 10000


/**
 * Requires 3 options:
 * - min
 * - max
 * - count
 */
export default function getRandomNumbers(options) {
  let count = options.count
  let resultsPromise = new Promise((resolve) => resolve([]))

  // might potentially have to do multiple API calls
  if (count > MAX_RESULTS_PER_CALL) {
    resultsPromise = getRandomNumbers({
      ...options,
      count: options.count - MAX_RESULTS_PER_CALL
    })
    count = MAX_RESULTS_PER_CALL
  }

  return resultsPromise.then(results => {
    return axios.get(BASE_URL, {
      params: {
        col: 1,
        base: 10,
        format: 'plain',
        rnd: 'new',
        num: count,
        min: options.min,
        max: options.max,
      },
    }).then(response => {
      return response.data
    }).then(resultString => {
      const resultNums = resultString
        .split('\n')
        .slice(0, -1)
        .map(s => parseInt(s, 10))

      return results.concat(resultNums)
    })
  })
}

/**
 * for testing purposes
 */
export function getPsuedoRandomNumbers(options) {
  const randomNumbers = []
  for (var i = 0; i < options.count; i++) {
    const range = options.max - options.min
    randomNumbers.push(options.min + Math.round(Math.random() * range))
  }
  return new Promise((resolve) => resolve(randomNumbers))
}
