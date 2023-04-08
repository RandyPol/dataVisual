import { select, json, scaleLinear, extent } from 'd3'

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
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
    
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

    // Scales
    const xScale = scaleLinear()
      .domain(extent(data, xAccessor))
      .range([0, dimensions.width])

    // const yScale = scaleLinear()
    //   .domain(extent(data, yAccessor))
    //   .range([dimensions.height, 0])

    console.log(dimensions.width)
    // Draw circles
    ctr
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', xAccessor)
      .attr('cy', yAccessor)
      .attr('r', 5)
  } catch (error) {
    console.error(error)
  }
}

draw()
