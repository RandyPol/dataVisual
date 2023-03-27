async function drawLineChart() {
  const dataSet = await d3.json('./my_weather_data.json')
  // This is a function that takes a string and returns a date object

  const dateParser = d3.timeParse('%Y-%m-%d')

  //   These are the accessors for the data we want to use
  const yAccessor = (d) => d.temperatureMax
  const xAccessor = (d) => dateParser(d.date)

  console.log(dataSet[0])
  console.log(xAccessor(dataSet[0]))

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  }
  // Computing the size of our bounds and add that to our dimensions object
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // Creating Our Canvas|Wrapper
  const wrapper = d3
    .select('#wrapper')
    .append('svg') // Adding an svg element to our wrapper
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Adding a bounds element to our svg with the SVG group element
  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    )
  // Creating our scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, yAccessor))
    .range([dimensions.boundedHeight, 0])

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataSet, xAccessor))
    .range([0, dimensions.boundedWidth])

  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)))

  // Vizualize a threshold by adding a rectangle covering a;; temperature below freezing
  const freezingTemperaturePlacement = yScale(32)
  const freezingTemperatures = bounds
    .append('rect')
    .attr('x', 0)
    .attr('width', dimensions.boundedWidth)
    .attr('y', freezingTemperaturePlacement)
    .attr('height', dimensions.boundedHeight - freezingTemperaturePlacement)
    .attr('fill', '#e0f3f3')

  const line = bounds
    .append('path')
    .attr('d', lineGenerator(dataSet))
    .attr('fill', 'none')
    .attr('stroke', '#af9358')
    .attr('stroke-width', 2)

  // Adding axis to our chart
  // yAxis
  const yAxisGenerator = d3.axisLeft().scale(yScale)
  const yAxis = bounds.append('g').call(yAxisGenerator)

  // xAxis
  const xAxisGenerator = d3.axisBottom().scale(xScale)
  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`)
}

drawLineChart()
