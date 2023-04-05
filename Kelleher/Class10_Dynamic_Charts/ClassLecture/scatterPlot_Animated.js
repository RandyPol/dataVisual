import { scaleLinear, extent, axisLeft, axisBottom, transition } from 'd3'

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
    // Get the circle group and bind the data to it (the data is null) and then join it to the DOM (create a new group) and add the class 'circle-group' to it (this is the group that will contain the circles). This approach is used to make sure is that the group is only created once and then the circles are added to it. Idempotent.
    const circleGroup = selection
      .selectAll('.circle-group')
      .data([null])
      .join('g')
      .attr('class', 'circle-group')

    // Transition the circles to their new positions. Create a transition object and set the duration and ease. The transition object is passed to the attr function to set the transition for the attribute. This is a way to animate the circles to their new positions. This method of creating the object and passing it to the attr function is called a 'chained transition'. Is prefer this method over the 'chained transition' method because it is more readable and can be reused.
    const t = transition().duration(2000)

    // Add the circles to the circle group and bind the data to it (the data is the marks array) and then join it to the DOM (create a new circle for each data point) and add the class 'circle' to it. This approach is used to make sure is that the circles are only created once and then the circles are added to it. Idempotent.
    const circles = circleGroup
      .selectAll('circle')
      .data(marks)
      .join('circle')
      .transition(t)
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
