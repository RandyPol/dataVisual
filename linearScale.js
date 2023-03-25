// Add your code below this line

// const scale = d3.scaleLinear()

// scale.domain([250, 500]).range([10, 150])

// const output = scale(50)

// d3.select('body').append('h2').text(output)

/**
 * Use the d3.max and d3.min Functions to Find Minimum and Maximum
 * Values in a Dataset
 */
const positionData = [
  [1, 7, -4],
  [6, 3, 8],
  [2, 9, 3],
]

const output = d3.max(positionData.map(arrayData => arrayData[2]))

// Add your code above this line

d3.select('body').append('h2').text(output)
