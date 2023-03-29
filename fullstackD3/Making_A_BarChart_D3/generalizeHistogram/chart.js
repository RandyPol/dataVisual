// Making a Barchart

async function drawBarChart() {
  // Step 1: Importing the data
  const dataSet = await d3.json('../../my_weather_data.json')

  // Step 2: Creating our dimensions
  const width = 400
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

  const drawHistogram = (metric) => {
    // Update the metricAccessor with the metric passed in
    const metricAccessor = (d) => d[metric]
    const yAccessor = (d) => d.length

    // Step 3: Drawing the canvas
    const wrapper = d3
      .select('#wrapper')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

    wrapper
      .attr('role', 'figure')
      .attr('tabindex', '0')
      .append('title')
      .text('Histogram looking at the distribution of humidity in 2016')

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
      .attr('class', 'dataPointGroup')

    const barPadding = 1

    //   Drawing the bars
    const barRects = eachBinDataPointGroup
      .append('rect')
      .attr('x', (d) => xScale(d.x0) + barPadding / 2)
      .attr('y', (d) => yScale(yAccessor(d)))
      .attr('width', (d) =>
        d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding])
      )
      .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr('fill', 'cornflowerblue')

    // Step 6: Drawing the peripherals

    // Drawing the axes
    const barText = eachBinDataPointGroup
      .filter(yAccessor)
      .append('text')
      .attr('x', (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr('y', (d) => yScale(yAccessor(d)) - 5)
      .text(yAccessor)
      .style('text-anchor', 'middle')
      .attr('fill', 'darkgrey')
      .style('font-size', '12px')
      .style('font-family', 'sans-serif')

    // Lets add a line to the bar chart that represents the mean
    const mean = d3.mean(dataSet, metricAccessor)
    const meanLine = bounds
      .append('line')
      .attr('class', 'klkLine')
      .attr('x1', xScale(mean))
      .attr('y1', -15)
      .attr('x2', xScale(mean))
      .attr('y2', dimensions.boundedHeight)
      .attr('stroke', 'maroon')
      .attr('stroke-dasharray', '2px 4px')

    const meanLabel = bounds
      .append('text')
      .attr('x', xScale(mean))
      .attr('y', -20)
      .text('mean')
      .attr('fill', 'maroon')
      .style('font-size', '12px')
      .style('text-anchor', 'middle')

    //  Drawing the axis
    const xAxisGenerator = d3.axisBottom().scale(xScale)
    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    // Drawing the axis label
    const xAxisLabel = xAxis
      .append('text')
      .attr('x', dimensions.boundedWidth / 2)
      .attr('y', dimensions.margin.bottom - 10)
      .attr('fill', 'black')
      .style('font-size', '1.4em')
      .text(`${metric}`)
      .style('text-transform', 'capitalize')
  }

  const metrics = [
    'windSpeed',
    'moonPhase',
    'dewPoint',
    'humidity',
    'uvIndex',
    'windBearing',
    'temperatureMin',
    'temperatureMax',
  ]
  metrics.forEach(drawHistogram)
}

drawBarChart()
