export default {
  getDimensions (fromWidth, fromHeight, toWeidth, toHeight) {
    if (!fromWidth || !fromHeight || !toWeidth || !toHeight) {
      throw 'RatioUtil: Missing required fields'
    }

    const ratio = fromWidth / fromHeight
    const currentRatio = toWeidth / toHeight
    const isLandscape = (ratio < currentRatio)

    let width, height, offsetX, offsetY, xCenter, yCenter

    if (isLandscape) {
      width = toWeidth
      height = toWeidth / ratio
      offsetX = 0
      offsetY = (toHeight - height) * 0.5
      xCenter = (width / 2)
      yCenter = height / 2
    } else {
      width = toHeight * ratio
      height = toHeight
      offsetX = (toWeidth - width) * 0.5
      offsetY = 0
      xCenter = width / 2
      yCenter = (height / 2)
    }

    return { width, height, offsetX, offsetY, xCenter, yCenter }
  }
}
