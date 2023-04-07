import {
  scaleLinear,
  scalePoint,
  extent,
  axisLeft,
  axisBottom,
  transition,
} from 'd3'

export const scatterPlot_Animated = () => {
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
  let xType
  let yType

  const my = (selection) => {
    // Set Width and Height
    selection.attr('width', width).attr('height', height)

    // Set the scales for the chart
    const xScale = (
      xType === 'categorical'
        ? scalePoint().domain(data.map(xValue)).padding(0.2)
        : scaleLinear().domain(extent(data, xValue))
    ).range([margin.left, width - margin.right])

    const yScale = (
      yType === 'categorical'
        ? scalePoint().domain(data.map(yValue)).padding(0.2)
        : scaleLinear().domain(extent(data, yValue))
    ).range([height - margin.bottom, margin.top])

    // The marks are the coordinates of the data points in the chart dimensions and range
    const marks = data.map((d) => {
      return {
        x: xScale(xValue(d)),
        y: yScale(yValue(d)),
      }
    })

    /**
     * Render the chart to the DOM using the data and configuration properties
     */

    const circleGroup = selection
      .selectAll('.circle-group')
      .data([null])
      .join('g')
      .attr('class', 'circle-group')

    const t = transition().duration(1000)

    // Create a function to for code to be resuable for the enter and update selections of the points (circles)
    const positionCircles = (selection) =>
      selection.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

    // Making another funtion for the radius of the circles to clarify the code
    const growRadius = (enter) => enter.transition(t).attr('r', radius)

    const circles = circleGroup
      .selectAll('circle')
      .data(marks)
      .join(
        (enter) =>
          enter
            .append('circle')
            .call(positionCircles)
            .attr('r', 0)
            .call(growRadius),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .delay((d, i) => i * 10)
              .call(positionCircles)
          ),
        (exit) => exit.remove()
      )
    // Reference for chained transitions using observable pattern

    // Add y-axis
    selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .transition(t)
      .call(axisLeft(yScale))

    // Add x-axis
    selection
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .transition(t)
      .call(axisBottom(xScale))

    // Add x-axis label that are idempotent (only created once) and add animation to it
    selection
      .selectAll('.x-axis-label')
      .data([null])
      .join('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height)
      .attr('fill', 'black')
      .text(xAxisLabel)
      .transition(t)
      .attr('y', height - 10)

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
  my.xType = function (_) {
    return arguments.length ? ((xType = _), my) : xType
  }

  my.yType = function (_) {
    return arguments.length ? ((yType = _), my) : yType
  }

  return my
}
