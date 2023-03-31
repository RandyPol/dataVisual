async function drawScatter() {
  // 1. Access data

  const dataset = await d3.json('../../my_weather_data.json')
  const xAccessor = (d) => d.dewPoint
  const yAccessor = (d) => d.humidity

  // 2. Create chart dimensions

  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9])
  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // 3. Draw canvas

  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const bounds = wrapper
    .append('g')
    .attr('class', 'bounds')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    )

  // 4. Create scales

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const drawDots = (dataset) => {
    // 5. Draw data

    const dots = bounds.selectAll('circle').data(dataset, (d) => d.time)

    const newDots = dots.enter().append('circle')

    const allDots = newDots
      .merge(dots)
      .attr('cx', (d) => xScale(xAccessor(d)))
      .attr('cy', (d) => yScale(yAccessor(d)))
      .attr('r', 4)

    const oldDots = dots.exit().remove()
  }
  drawDots(dataset)

  // Create delaunay triangulation for the voronoi diagram
  const delaunay = d3.Delaunay.from(
    dataset,
    (d) => xScale(xAccessor(d)),
    (d) => yScale(yAccessor(d))
  )
  // Create voronoi diagram
  const voronoi = delaunay.voronoi()
  voronoi.xmax = dimensions.boundedWidth
  voronoi.ymax = dimensions.boundedHeight
  bounds
    .selectAll('.voronoi')
    .data(dataset)
    .enter()
    .append('path')
    .attr('class', 'voronoi')
    .attr('d', (d, i) => voronoi.renderCell(i))

  // 6. Draw peripherals

  const xAxisGenerator = d3.axisBottom().scale(xScale)

  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`)

  const xAxisLabel = xAxis
    .append('text')
    .attr('class', 'x-axis-label')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .html('dew point (&deg;F)')

  const yAxisGenerator = d3.axisLeft().scale(yScale).ticks(4)

  const yAxis = bounds.append('g').call(yAxisGenerator)

  const yAxisLabel = yAxis
    .append('text')
    .attr('class', 'y-axis-label')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .text('relative humidity')
  // 7. Set up interactions

  const dots = bounds.selectAll('.voronoi')
  dots.on('mouseenter', onMouseEnter).on('mouseleave', onMouseLeave)

  const tooltip = d3.select('#tooltip')

  function onMouseEnter(event, datum) {
    // Change the color and size of the hovered dot by appending a new circle
    // and removing it when the mouse leaves. This is a hack to make the
    // hovered dot appear on top of the other dots since SVG doesn't have
    // a z-index property.
    const dayDot = bounds
      .append('circle')
      .attr('class', 'tooltipDot')
      .attr('cx', xScale(xAccessor(datum)))
      .attr('cy', yScale(yAccessor(datum)))
      .attr('r', 7)
      .style('fill', 'maroon')
      .style('pointer-events', 'none')

    // This is the format for the date
    const dateParser = d3.timeParse('%Y-%m-%d')
    const formatDate = d3.timeFormat('%B %A %-d, %Y')
    tooltip.select('#date').text(formatDate(dateParser(datum.date)))

    // Finding the index of the current dot
    const nodes = dots.nodes()
    const currentNode = d3.select(this).node()
    const index = nodes.indexOf(currentNode)

    // This is the format for the temperature
    const formatHumidity = d3.format('.2f')
    tooltip.select('#humidity').text(formatHumidity(yAccessor(datum)))
    const formatDewPoint = d3.format('.2f')
    tooltip.select('#dew-point').text(formatDewPoint(xAccessor(datum)))

    // Finding the current dot's x and y position
    const x = xScale(xAccessor(datum)) + dimensions.margin.left
    const y = yScale(yAccessor(datum)) + dimensions.margin.top
    // Moving the tooltip to the current dot's position
    tooltip.style(
      'transform',
      `translate(` + `calc( -50% + ${x}px),` + `calc(-100% + ${y}px)` + `)`
    )

    tooltip.style('opacity', 1)
  }
  function onMouseLeave() {
    tooltip.style('opacity', 0)
    d3.selectAll('.tooltipDot').remove()
  }
}
drawScatter()
