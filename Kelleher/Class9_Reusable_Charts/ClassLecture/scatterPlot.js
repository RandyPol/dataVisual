export const scatterPlot = (config) => {
  // Set default values for configuration properties
  let width = config.width || 720
  let height = config.height || 80
  let data = config.data || []
  let xValue = config.xValue || ((d) => d.petal_length)
  let yValue = config.yValue || ((d) => d.sepal_length)
  let margin = config.margin || { top: 20, right: 20, bottom: 40, left: 50 }
  let radius = config.radius || 5

  const my = () => {}

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
    return arguments.length ? ((radius = _), my) : radius
  }

  // xScale is a function that takes a value and returns a pixel value
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    // To make the x-axis to start from 0 we need to use the following domain instead
    // .domain([0, extent(data, yValue)[1]])
    .range([margin.left, width - margin.right])
  console.log(xScale.domain())
  console.log(xScale.range())

  // yScale is a function that takes a value and returns a pixel value
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
  svg
    .selectAll('circle')
    .data(marks)
    .join('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', radius)

  // Render the axes to the DOM
  // yAxis
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(axisLeft(yScale))

  /**

     .call explains what the axis is doing:
     const yAxis = axisLeft(yScale)
     const yAxisGroup = svg.append('g').attr('transform', `translate(${margin.left}, 0)`)
    //  We can then call the axis function on the group
    yAxisGroup.call(yAxis) or yAxis(yAxisGroup)

    When we use .call we are passing the group as the first argument to the function in this case the axis function yAxis and the group is the context of the function. This is the same as doing yAxis(yAxisGroup) or yAxisGroup.call(yAxis). The difference is that when we use .call we can chain the function calls and we can pass more arguments to the function. 
      */

  // xAxis
  svg
    .append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(axisBottom(xScale))
  return my
}
