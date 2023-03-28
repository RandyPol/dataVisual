// Making a Barchart

async function drawBarChart() {
  // Step 1: Importing the data
  const dataSet = await d3.json('../my_weather_data.json')
  const metricAccessor = (d) => d.humidity
  console.log(dataSet[0])
  console.log(metricAccessor(dataSet[0]))

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
}

drawBarChart()
