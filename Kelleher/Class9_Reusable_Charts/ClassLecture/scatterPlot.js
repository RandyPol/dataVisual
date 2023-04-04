import { scaleLinear, extent, axisLeft, axisBottom } from 'd3'

export const scatterPlot = (config) => {
  // Set default values for configuration properties
  let width = config.width || 720
  let height = config.height || 80
  let data = config.data || []
  let xValue = config.xValue || ((d) => d.petal_length)
  let yValue = config.yValue || ((d) => d.sepal_length)
  let margin = config.margin || { top: 20, right: 20, bottom: 40, left: 50 }
  let radius = config.radius || 5

  const my = () => {
    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right])

    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top])

    // The marks are the coordinates of the data points in the chart dimensions and range
    const marks = data.map((d) => {
      return {
        x: xScale(xValue(d)),
        y: yScale(yValue(d)),
      }
    })

    // Render the marks to the DOM
    selection
      .selectAll('circle')
      .data(marks)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', radius)

    // Add y-axis
    selection
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(yScale))
    // Add x-axis
    selection
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(xScale))
  }

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width
  }
  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height
  }
  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data
  }
  my.xValue = function (_) {
    return arguments.length ? ((xValue = +_), my) : xValue
  }
  my.yValue = function (_) {
    return arguments.length ? ((yValue = +_), my) : yValue
  }
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin
  }
  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius
  }

  return my
}
