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
  const wrapper = d3.select('#wrapper')
  // Adding an svg element to our wrapper
  const svg = wrapper
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Adding a bounds element to our svg with the SVG group element
  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    )
}

drawLineChart()
