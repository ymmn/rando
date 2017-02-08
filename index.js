import getRandomNumbers, { getPsuedoRandomNumbers } from './getRandomNumbers'
import createBmp from './createBmp'


console.log('requesting random numbers')

// getPsuedoRandomNumbers({
getRandomNumbers({
  count: 128 * 128 * 4,
  min: 0,
  max: 255,
}).then(randomNumbers => {
  console.log('got back ', randomNumbers.length, 'numbers')
  console.log('creating BMP file')
  return createBmp(randomNumbers, './random.bmp')
}).then(() => {
  console.log('wrote random.bmp successfully')
}).catch(console.error)
