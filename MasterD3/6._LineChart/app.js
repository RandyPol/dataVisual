import {
  select,
  csv,
  scaleLinear,
  extent,
  timeParse,
  scaleUtc,
  line,
  axisLeft,
  axisBottom,
  pointer,
  bisector,
  timeFormat,
} from 'd3'

async function draw() {
  // Data
  const dataset = await csv(
    'https://gist.githubusercontent.com/RandyPol/2b3a261ddeb3c737eb0cb14e2517968a/raw/10192473b7fb4e7e205ef7e25f2cd6719d2f89ed/appleStock.csv'
  )

  const parseData = timeParse('%Y-%m-%d')
  const xAccessor = (d) => parseData(d.date)
  const yAccessor = (d) => parseInt(d.close)

  // Dimensions
  let dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Draw Image
  const svg = select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const ctr = svg
    .append('g') // <g>
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const yScale = scaleLinear()
    .domain(extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice()

  const xScale = scaleUtc()
    .domain(extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])

  const lineGenerator = line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))

  // Draw Line
  ctr
    .append('path')
    .datum(dataset)
    .attr('d', lineGenerator)
    .attr('fill', 'none')
    .attr('stroke', '#30475e')
    .attr('stroke-width', 2)

  // Axes
  const yAxis = axisLeft(yScale)
  yAxis.tickFormat((d) => `$${d}`)

  const xAxis = axisBottom(xScale)

  ctr.append('g').call(yAxis)
  ctr
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(0, ${dimensions.ctrHeight})`)
    .append('text')
    .attr('x', dimensions.ctrWidth / 2)
    .attr('y', dimensions.margins)
    .attr('fill', 'black')
    .text('Time')

  // Tooltip
  const tooltip = select('#tooltip')

  const tooltipDot = ctr
    .append('circle')
    .attr('r', 5)
    .attr('fill', '#fc8781')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .style('opacity', 0)
    .style('pointer-events', 'none')

  // Invisible rect to capture mouse movements
  ctr
    .append('rect')
    .style('opacity', 0)
    .attr('width', dimensions.ctrWidth)
    .attr('height', dimensions.ctrHeight)
    .on('touchmouse mousemove', function (event) {
      const mousePos = pointer(event, this)
      // Using the mouse position to find the date in the xScale domain using the invert function
      const date = xScale.invert(mousePos[0])
      // Using a bisector to find the index of the date in the dataset
      // Custom Bisector - left, center, right
      const weatherBisect = bisector(xAccessor).left
      const index = weatherBisect(dataset, date)
      const weather = dataset[index - 1]

      // Update Image
      tooltipDot
        .style('opacity', 1)
        .attr('cx', xScale(xAccessor(weather)))
        .attr('cy', yScale(yAccessor(weather)))
        .raise()

      // Update Tooltip
      tooltip
        .style('display', 'block')
        .style('top', `${yScale(yAccessor(weather)) - 20}px`)
        .style('left', `${xScale(xAccessor(weather))}px`)

      tooltip.select('.price').text(`$${yAccessor(weather)}`)

      const dateFormatter = timeFormat('%B %-d, %Y')

      tooltip.select('.date').text(dateFormatter(xAccessor(weather)))
    })
    .on('mouseleave', function (event) {
      tooltipDot.style('opacity', 0)
      tooltip.style('display', 'none')
    })
}

draw()
