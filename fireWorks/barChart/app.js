async function barChart() {
  const dataSet = await d3.csv('bodypart-injury-clean.csv')
  console.log(dataSet)

  const width = 600
  const height = 600

  // Canvas
  const canvas = d3
    .select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  //   Create Scales for the Bar Chart
  //   xScale: Maps the data to the width of the canvas
  const xScale = d3
    .scaleBand()
    .domain(['Arm', 'Leg', 'Head', 'Eye', 'Hand', 'Other'])
    .range([0, width])

  //  yScale: Maps the data to the height of the canvas
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, (d) => +d.Total))
    .range([height, 0])

  console.log(xScale('Arm'))
  console.log(yScale(1700))
}
barChart()
