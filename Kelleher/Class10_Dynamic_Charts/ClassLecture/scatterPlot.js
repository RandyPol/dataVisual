import { scaleLinear, extent, axisLeft, axisBottom } from 'd3'

export const scatterPlot = () => {
  // Set default values for configuration properties
  let width
  let height
  let data
  let xValue
  let yValue
  let margin
  let radius
  let xAxisLabel
  let yAxisLabel

  const my = (selection) => {
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
      .append('g')
      .selectAll('circle')
      .data(marks)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', radius)

    // Add y-axis
    selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(yScale))

    // Add x-axis
    selection
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(xScale))

    // Add x-axis label
    selection
      .selectAll('.x-axis-label')
      .data([null])
      .join('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('fill', 'black')
      .text(xAxisLabel)

    // Add y-axis label
    selection
      .selectAll('.y-axis-label')
      .data([null])
      .join('text')
      .attr('class', 'y-axis-label')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2)
      .attr('fill', 'black')
      .attr('transform', 'rotate(-90)')
      .text(yAxisLabel)
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
    return arguments.length ? ((xValue = _), my) : xValue
  }
  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue
  }
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin
  }
  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius
  }

  my.xAxisLabel = function (_) {
    return arguments.length ? ((xAxisLabel = _), my) : xAxisLabel
  }
  my.yAxisLabel = function (_) {
    return arguments.length ? ((yAxisLabel = _), my) : yAxisLabel
  }

  return my
}
