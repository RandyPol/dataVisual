import * as d3 from 'd3'

export const barChart = () => {
  let width // the outer width of the chart, in pixels
  let height // the outer height of the chart, in pixels
  let data
  let x // given d in data, returns the (ordinal) x-value
  let y // given d in data, returns the (quantitative) y-value
  let margin // {top, right, bottom, left}

  let title // given d in data, returns the title text
  let xDomain // an array of (ordinal) x-values
  let xRange // [left, right]
  let yDomain // [ymin, ymax]
  let yRange // [bottom, top]
  let xPadding = 0.1 // amount of x-range to reserve to separate bars
  let yFormat // a format specifier string for the y-axis
  let yLabel // a label for the y-axis
  let color = 'steelblue' // bar fill color

  const my = (selection) => {
    // Compute values with accessors
    const X = d3.map(data, x)
    const Y = d3.map(data, y)

    // Compute default domains, and unique the x-domain.
    if (xDomain === undefined) xDomain = X
    if (yDomain === undefined) yDomain = [0, d3.max(Y)]
    xDomain = new d3.InternSet(xDomain)

    // Omit any data not present in the x-domain.
    const I = d3.range(X.length).filter((i) => xDomain.has(X[i]))

    // Construct scales, axes, and formats.
    const xScale = d3
      .scaleBand(xDomain, [margin.left, width - margin.right])
      .padding(xPadding)
    const yScale = d3.scaleLinear(yDomain, [height - margin.bottom, margin.top])
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0)
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat)

    // Compute titles.
    if (title === undefined) {
      const formatValue = yScale.tickFormat(100, yFormat)
      title = (i) => `${X[i]}\n${formatValue(Y[i])}`
    } else {
      const O = d3.map(data, (d) => d)
      const T = title
      title = (i) => T(O[i], i, data)
    }

    // x-axis
    selection
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)

    selection
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis) // add the y-axis to the chart
      .call((g) => g.select('.domain').remove()) // remove the y-axis line
      .call(
        (g) =>
          g
            .selectAll('.tick line')
            .clone()
            .attr('x2', width - margin.left - margin.right)
            .attr('stroke-opacity', 0.1) // add horizontal grid lines
      )
      .call(
        (g) =>
          g
            .append('text') // add the y-axis label
            .attr('x', -margin.left + 20) // move the label to the left
            .attr('y', 20) // move the label up
            .attr('fill', 'currentColor') // set the label color
            .attr('text-anchor', 'start') // align the label to the left
            .text(yLabel) // set the label text
      )

    const bar = selection
      .append('g')
      .attr('fill', color)
      .selectAll('rect')
      .data(I)
      .join('rect')
      .attr('x', (i) => xScale(X[i]))
      .attr('y', (i) => yScale(Y[i]))
      .attr('height', (i) => yScale(0) - yScale(Y[i]))
      .attr('width', xScale.bandwidth())

  
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
  my.title = function (_) {
    return arguments.length ? ((title = _), my) : title
  }
  my.x = function (_) {
    return arguments.length ? ((x = _), my) : x
  }
  my.y = function (_) {
    return arguments.length ? ((y = _), my) : y
  }
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin
  }
  my.xDomain = function (_) {
    return arguments.length ? ((xDomain = _), my) : xDomain
  }
  my.xRange = function (_) {
    return arguments.length ? ((xRange = _), my) : xRange
  }
  my.yType = function (_) {
    return arguments.length ? ((yType = _), my) : yType
  }
  my.yDomain = function (_) {
    return arguments.length ? ((yDomain = _), my) : yDomain
  }
  my.yRange = function (_) {
    return arguments.length ? ((yRange = _), my) : yRange
  }
  my.xPadding = function (_) {
    return arguments.length ? ((xPadding = _), my) : xPadding
  }
  my.yFormat = function (_) {
    return arguments.length ? ((yFormat = _), my) : yFormat
  }
  my.yLabel = function (_) {
    return arguments.length ? ((yLabel = _), my) : yLabel
  }
  my.color = function (_) {
    return arguments.length ? ((color = _), my) : color
  }

  return my
}
