// Making a Barchart

async function drawBarChart() {
  // Step 1: Importing the data
  const dataSet = await d3.json('../my_weather_data.json')
  const metricAccessor = (d) => d.humidity

  //   The yScale accessor now that we are using a histogram generator
  const yAccessor = (d) => d.length

  // Step 2: Creating our dimensions
  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  //  Creating the bounds
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // Step 3: Drawing the canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    )

  // Step 4: Creating the scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()

  // Creating the bins using the histogram generator
  const binsGenerator = d3
    .histogram()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12)

  // Creating the bins from the dataset
  const bins = binsGenerator(dataSet)
  console.log(bins)

  // Creating the yScale
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice()

  // Step 5: Drawing the data
  const binsGroup = bounds.append('g').attr('class', 'binsGroup')
  const eachBinDataPointGroup = binsGroup
    .selectAll('g')
    .data(bins)
    .enter()
    .append('g')

  const barPadding = 1

  //   Drawing the bars
  const barRects = eachBinDataPointGroup
    .append('rect')
    .attr('x', (d) => xScale(d.x0) + barPadding / 2)
    .attr('y', (d) => yScale(yAccessor(d)))
    .attr('width', (d) => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr('fill', 'cornflowerblue')

  // Step 6: Drawing the peripherals
  const barText = eachBinDataPointGroup
    .filter(yAccessor)
    .append('text')
    .attr('x', (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
    .attr('y', (d) => yScale(yAccessor(d)) - 5)
    .text(yAccessor)
    .style('text-anchor', 'middle')

}

drawBarChart()
