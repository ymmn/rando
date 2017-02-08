import getRandomNumbers, { getPsuedoRandomNumbers } from './getRandomNumbers'
import createBmp from './createBmp'


console.log('requesting random numbers')

const BMP_HEIGHT = 128
const BMP_WIDTH = 128

// getPsuedoRandomNumbers({
getRandomNumbers({
  count: BMP_HEIGHT * BMP_WIDTH * 4,
  min: 0,
  max: 255,
}).then(randomNumbers => {
  console.log('got back ', randomNumbers.length, 'numbers')
  console.log('creating BMP file')
  const options = {
    height: BMP_HEIGHT,
    width: BMP_WIDTH,
    rgbaValues: randomNumbers
  }
  return createBmp('./random.bmp', options)
}).then(() => {
  console.log('wrote random.bmp successfully')
}).catch(console.error)
