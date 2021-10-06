module.exports = {

  increase_Head (cordinates, percentage = 17) {
    const decimal = (percentage / 100)

    const finalCordinates = []

    const newCordinates = cordinates.map(face => {
      var width = face._box._width
      var height = face._box._height
      var y = face._box._y
      var x = face._box._x

      var wx = width * decimal
      var hy = height * decimal

      x -= wx

      y -= hy

      width += wx * 2

      height += hy * 2

      const area = width * height

      var instant = face._box

      const box = { ...instant, ...{ _y: y, _x: x, _width: width, _height: height, _area: area } }

      return { ...face, ...{ _box: box } }
    })

    newCordinates.map(face => {
      if (face._score > 0.5) {
        finalCordinates.push(face)
      }
    })

    return finalCordinates
  },

  prediction_image (cordinates) {
    var lowestX = 100000000
    var lowestY = 100000000
    var height = 0
    var width = 0
    var boxHeight = 0
    var boxWidth = 0

    cordinates.map(face => {
      var x = face._box._x
      var y = face._box._y

      if (x < lowestX) {
        lowestX = x
      }

      if (y < lowestY) {
        lowestY = y
      }
    })

    cordinates.map(face => {
      var x = face._box._x
      var y = face._box._y

      var _height = face._box._height
      var _width = face._box._width

      if (y > height) {
        height = y
        boxHeight = height - lowestY + _height
      }

      if (x > width) {
        width = x
        boxWidth = width - lowestX + _width
      }
    })

    const predictionObj = [{

      _box: {
        _height: boxHeight,
        _width: boxWidth,
        _x: lowestX,
        _y: lowestY
      }
    }]

    return predictionObj
  },

  subjectPrediction (cordinates, percentage = 0.20) {
    const arrFaceArea = []
    const subjecttiveFaces = []

    cordinates.map(face => {
      var area = face._box._area

      arrFaceArea.push(area)
    })

    const allFaceAverageArea = (arrFaceArea.reduce((a, b) => a + b, 0)) / cordinates.length

    const cutPoint = allFaceAverageArea - (allFaceAverageArea * percentage)

    cordinates.map(face => {
      if (face._box._area >= cutPoint) {
        subjecttiveFaces.push(face)
      }
    })

    return subjecttiveFaces
  }
}
