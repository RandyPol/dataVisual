import {
  select,
  json,
  scaleLinear,
  extent,
  axisBottom,
  axisLeft,
  format,
  timeFormat,
  Delaunay,
} from 'd3'

const JSON_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/e167bdc78f43cf44de6b3295f68f39f85960be0d/weatherData.json'

const draw = async () => {
  try {
    // Data
    const data = await json(JSON_URL)

    const xAccessor = (d) => d.currently.humidity
    const yAccessor = (d) => d.currently.apparentTemperature

    // Dimensions
    const dimensions = {
      width: 800,
      height: 800,
      margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    }
    // Inner dimensions
    dimensions.boundedWidth =
      dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight =
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const svg = select('#chart')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

    // Inner container
    const ctr = svg
      .append('g')
      .attr(
        'transform',
        `translate(${dimensions.margin.left}, ${dimensions.margin.top})`
      )
      .attr('fill', 'red')

    // Tooltip selection
    const tooltip = select('#tooltip')

    // Scales
    /**
     * rangeRound => only applies to the output range. Whereas the nice() function is applied to the domain. They both will round numeric values.
     */
    const xScale = scaleLinear()
      .domain(extent(data, xAccessor))
      .rangeRound([0, dimensions.boundedWidth])
      .clamp(true)

    const yScale = scaleLinear()
      .domain(extent(data, yAccessor))
      .rangeRound([dimensions.boundedHeight, 0])
      .nice() // round the domain values
      .clamp(true)

    // Draw circles
    ctr
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(xAccessor(d)))
      .attr('cy', (d) => yScale(yAccessor(d)))
      .attr('r', 5)
      .attr('data-temp', yAccessor)

    // Axes

    // X axis
    // .ticks() => number of ticks to show, but it's not guaranteed to be exact number as D3 use its own algorithm to determine the ticks to show so the number pass is a suggestion
    // .tickValues() => exact number of ticks to show and the values to show
    const xAxis = axisBottom(xScale)
      .ticks(5)
      .tickFormat((d) => `${d * 100}%`)

    const xAxisGroup = ctr
      .append('g')
      .call(xAxis)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    xAxisGroup
      .append('text')
      .attr('x', dimensions.boundedWidth / 2)
      .attr('y', dimensions.margin.bottom - 10)
      .attr('fill', 'black')
      .text('Humidity')
      .style('text-anchor', 'middle')
      .classed('x-axis-label', true)

    // Y axis
    const yAxis = axisLeft(yScale)

    const yAxisGroup = ctr.append('g').call(yAxis).classed('axis', true)
    yAxisGroup
      .append('text')
      .attr('x', -dimensions.boundedHeight / 2)
      .attr('y', -dimensions.margin.left + 15)
      .attr('fill', 'black')
      .html('Temperature (&deg;F)')
      .style('transform', 'rotate(270deg)')
      .style('text-anchor', 'middle')

    const delaunay = Delaunay.from(
      data,
      (d) => xScale(xAccessor(d)),
      (d) => yScale(yAccessor(d))
    )

    const voronoi = delaunay.voronoi()
    voronoi.xmax = dimensions.boundedWidth
    voronoi.ymax = dimensions.boundedHeight
    ctr
      .append('g')
      .selectAll('path')
      .data(data)
      .join('path')
      // .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('d', (d, i) => voronoi.renderCell(i))
      .on('mouseenter', function (event, d) {
        ctr
          .append('circle')
          .classed('dot-hovered', true)
          .attr('fill', '#120078')
          .attr('r', 8)
          .attr('cx', xScale(xAccessor(d)))
          .attr('cy', yScale(yAccessor(d)))
          .style('pointer-events', 'none')

        tooltip
          .style('display', 'block')
          .style('top', yScale(yAccessor(d)) - 40 + 'px')
          .style('left', xScale(xAccessor(d)) + 'px')

        const formatter = format('.2f')
        const dateFormatter = timeFormat('%B %-d, %Y')

        tooltip.select('.metric-humidity span').text(formatter(xAccessor(d)))

        tooltip.select('.metric-temp span').text(formatter(yAccessor(d)))

        tooltip
          .select('.metric-date')
          .text(dateFormatter(d.currently.time * 1000))
      })
      .on('mouseleave', function (event, d) {
        select('.dot-hovered').remove()

        tooltip.style('display', 'none')
      })
  } catch (error) {
    console.error(error)
  }
}

draw()
