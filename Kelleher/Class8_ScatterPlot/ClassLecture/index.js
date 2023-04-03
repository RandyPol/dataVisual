import {
  csv,
  select,
  selectAll,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
} from 'd3'

const csvUrl =
  'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

// We are parsing the data to convert the strings to numbers using the + operator
const parseRow = (row) => {
  row.sepal_length = +row.sepal_length
  row.sepal_width = +row.sepal_width
  row.petal_length = +row.petal_length
  row.petal_width = +row.petal_width
  return row
}

//Create chart dimensions with an SVG element
const width = window.innerWidth
const height = window.innerHeight

// Margin convention
const margin = { top: 20, right: 20, bottom: 20, left: 50 }

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const main = async () => {
  // csv takes a second argument which is a function that is called for each row
  const data = await csv(csvUrl, parseRow)

  // We need to seperate the concerns of the data and the DOM rendering
  // Scale the data to fit the chart dimensions and data range
  // These are the x and y accessors that we will use to get the data values
  const xValue = (d) => d.petal_length
  const yValue = (d) => d.sepal_length
  // xScale is a function that takes a value and returns a pixel value
  const xScale = scaleLinear()
    // .domain(extent(data, xValue))
    // To make the x-axis to start from 0 we need to use the following domain instead
    .domain([0, extent(data, yValue)[1]])
    .range([margin.left, width - margin.right])
  console.log(xScale.domain())
  console.log(xScale.range())

  // yScale is a function that takes a value and returns a pixel value
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([height - margin.bottom, margin.top])
  console.log(yScale.domain())
  console.log(yScale.range())

  // The marks are the coordinates of the data points in the chart dimensions and range
  const marks = data.map((d) => {
    return {
      x: xScale(xValue(d)),
      y: yScale(yValue(d)),
    }
  })

  // Render the marks to the DOM
  svg
    .selectAll('circle')
    .data(marks)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 5)

  // Render the axes to the DOM
  // yAxis
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(axisLeft(yScale))

  // xAxis
  svg
    .append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(axisBottom(xScale))
}

main()
