import bmp from 'bmp-js'
import fs from 'fs'


/**
 * Requires 3 options:
 * - height
 * - width
 * - rgbaValues - an array of integers between 0 - 255 where each entry represents a byte
 */
export default function createBmp(filename, options) {
  const { height, width, rgbaValues } = options
  if (rgbaValues.length !== (height * width * 4)) {
    throw new Error('Unexpected array length')
  }

  const dataBuffer = new Buffer(rgbaValues)
  const bmpData = {
    width,
    height,
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
