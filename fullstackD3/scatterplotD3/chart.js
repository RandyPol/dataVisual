// Steps in Drawing a Chart are the same for all charts
// I'm going to show theses Steps by creating a Scotterplot

async function drawScatterplot() {
  /**
   * Step 1: Accessing the data
   */

  // Step 1.1: Utitlize d3.json to load the data file
  const dataSet = await d3.json('../my_weather_data.json')

  // Step 1.2: Create the accessors function for the data we want to use
  // We use console.log(dataSet[0]) to see the data structure
  const xAccessor = (d) => d.dewPoint
  const yAccessor = (d) => d.humidity

  /** ---------------------------------------------------- */

  /**
   * Step 2: Creating the chart dimensions
   */

  // Step 2.1: Create the Width and Height of the chart
  const width = d3.min([window.innerWidth * 0.9, window.innerHeight * 0.9])
  // Step 2.2: Create the width and height of the wrapper (SVG element that will contain the chart)
  // and the margins (the space between the chart and the wrapper)
  const dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  // Step 2.3: Compute the size of the bounds
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  /** ---------------------------------------------------- */

  /**
   * Step 3: Drawing the canvas
   */

  // Step 3.1: Create the wrapper (SVG element that will contain the chart)
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Step 3.2: Create the bounds (SVG group element that will contain the chart)
  // Shift the bounds to the right and down by the margins
  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    )

  /** ---------------------------------------------------- */

  /**
   * Step 4: Creating the scales
   * We need to tell our scale:
   * 1. What inputs it will need to handle (domain)
   * 2. What outputs we want it to produce (range)
   */

  // Step 4.1: Create the xScale
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()
}
drawScatterplot()
