const dataset = [
  [34, 78],
  [109, 280],
  [310, 120],
  [79, 411],
  [420, 220],
  [233, 145],
  [333, 96],
  [222, 333],
  [78, 320],
  [21, 123],
]

const w = 500
const h = 500

// Padding between the SVG boundary and the plot
const padding = 30

// Create an x and y scale

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[0])])
  .range([padding, w - padding])

// Add your code below this line

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset.map((d) => d[1]))])
  .range([h - padding, padding])

// Add your code above this line

const output = yScale(411) // Returns 30
d3.select('body').append('h2').text(output)
