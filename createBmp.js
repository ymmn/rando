import bmp from 'bmp-js'
import fs from 'fs'


export default function createBmp(randomNumbers, filename) {
  if (randomNumbers.length !== (128 * 128 * 4)) {
    throw new Error('Unexpected array length')
  }

  const dataBuffer = new Buffer(randomNumbers)
  const bmpData = {
    width: 128,
    height: 128,
    data: dataBuffer,
  }
  const encoded = bmp.encode(bmpData)

  return new Promise((resolve) => {
    fs.open(filename, 'w', (err, fd) => {
      if (err) throw err
      fs.write(fd, encoded.data, 0, encoded.data.length)
      resolve()
    })
  })
}
