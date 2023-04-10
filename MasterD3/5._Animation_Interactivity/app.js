import { select, json, scaleLinear, extent, bin, max, axisBottom } from 'd3'

const JSON_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/e167bdc78f43cf44de6b3295f68f39f85960be0d/weatherData.json'

const histogramChart = async () => {
  try {
    // Data
    const data = await json(JSON_URL)

    const xAccessor = (d) => d.currently.humidity
    const yAccessor = (d) => d.length
    // Dimensions
    let dimensions = {
      width: 800,
      height: 400,
      margins: 50,
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margins * 2
    dimensions.boundedHeight = dimensions.height - dimensions.margins * 2

    // Draw canvas
    const svg = select('#chart')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

    const canvas = svg
      .append('g')
      .attr(
        'transform',
        `translate(${dimensions.margins}, ${dimensions.margins})`
      )

    // Scales
    const xScale = scaleLinear()
      .domain(extent(data, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()

    const binGroups = bin()
      .domain(xScale.domain())
      .value(xAccessor)
      .thresholds(10)
    const newData = binGroups(data)
    const padding = 1

    const yScale = scaleLinear()
      .domain([0, max(newData, yAccessor)])
      .range([dimensions.boundedHeight, 0])

    // Draw Rects
    canvas
      .selectAll('rect')
      .data(newData)
      .join('rect')
      .attr('width', (d) => max([0, xScale(d.x1) - xScale(d.x0) - padding]))
      .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr('x', (d) => xScale(d.x0))
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('fill', '#01c5c4')

    //   Draw Peripherals
    canvas
      .append('g')
      .classed('bar-labels', true)
      .selectAll('text')
      .data(newData)
      .join('text')
      .attr('x', (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr('y', (d) => yScale(yAccessor(d)) - 10)
      .text((d) => yAccessor(d))

    const xAxisGenerator = axisBottom(xScale)

    const xAxis = canvas
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)
  } catch (error) {
    console.log(error)
  }
}

select('#metric').on('change', function (e) {
  e.preventDefault()

  //   histogram(this.value)
  console.log(this.value)
})
