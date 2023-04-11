import {
  select,
  json,
  scaleLinear,
  extent,
  bin,
  max,
  axisBottom,
  transition,
  mean,
} from 'd3'

const JSON_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/e167bdc78f43cf44de6b3295f68f39f85960be0d/weatherData.json'

const drawChart = async () => {
  try {
    // Data
    const data = await json(JSON_URL)

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

    const labelsGroup = canvas.append('g').classed('bar-labels', true)
    const xAxisGroup = canvas
      .append('g')
      .classed('x-axis', true)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    const meanLine = canvas.append('line').classed('mean-line', true)

    function histogram(metric) {
      // Accessors
      const xAccessor = (d) => d.currently[metric]
      const yAccessor = (d) => d.length

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
        .nice()

      // Waiting for the transition to finish
      const exitTransition = transition().duration(500)
      const updateTransition = exitTransition.transition().duration(500)

      // Draw Rects
      const barsGroup = canvas
        .selectAll('rect')
        .data(newData)
        .join(
          (enter) =>
            enter
              .append('rect')
              .attr('width', (d) =>
                max([0, xScale(d.x1) - xScale(d.x0) - padding])
              )
              .attr('height', 0)
              .attr('x', (d) => xScale(d.x0))
              .attr('y', dimensions.boundedHeight)
              .attr('fill', '#b8de6f'),
          (update) => update,
          (exit) =>
            exit
              .transition(exitTransition)
              .attr('y', dimensions.boundedHeight)
              .attr('height', 0)
              .attr('fill', '#f39233')
              .remove()
        )
        .transition(updateTransition)
        .attr('width', (d) => max([0, xScale(d.x1) - xScale(d.x0) - padding]))
        .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
        .attr('x', (d) => xScale(d.x0))
        .attr('y', (d) => yScale(yAccessor(d)))
        .attr('fill', '#01c5c4')

      //   Draw Peripherals
      labelsGroup
        .selectAll('text')
        .data(newData)
        .join(
          (enter) =>
            enter
              .append('text')
              .attr('width', (d) =>
                max([0, xScale(d.x1) - xScale(d.x0) - padding])
              )
              .attr('height', 0)
              .attr('x', (d) => xScale(d.x0))
              .attr('y', dimensions.boundedHeight)
              .attr('fill', '#b8de6f'),
          (update) => update,
          (exit) =>
            exit
              .transition(exitTransition)
              .attr('y', dimensions.boundedHeight)
              .attr('height', 0)
              .attr('fill', '#f39233')
              .remove()
        )
        .transition(updateTransition)
        .attr('x', (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
        .attr('y', (d) => yScale(yAccessor(d)) - 10)
        .attr('fill', '#01c5c4')
        .text((d) => yAccessor(d))

      // Draw Mean Line
      const meanValue = mean(data, xAccessor)
      meanLine
        .raise()
        .transition(updateTransition)
        .attr('x1', xScale(meanValue))
        .attr('y1', 0)
        .attr('x2', xScale(meanValue))
        .attr('y2', dimensions.boundedHeight)

      // Draw Axis
      const xAxisGenerator = axisBottom(xScale)

      xAxisGroup.transition().call(xAxisGenerator)
    }

    select('#metric').on('change', function (e) {
      e.preventDefault()

      histogram(this.value)
    })
    histogram('humidity')
  } catch (error) {
    console.log(error)
  }
}

drawChart()
