import { select, json, scaleLinear, extent } from 'd3'

const JSON_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/e167bdc78f43cf44de6b3295f68f39f85960be0d/weatherData.json'

const histogramChart = async () => {
  try {
    // Data
    const data = await json(JSON_URL)
    console.log(data)
    const xAccessor = (d) => d.currently.humidity
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

    // Draw Circles

    canvas
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('width', 5)
      .attr("height", 100)
      .attr('x', (d) => xScale(xAccessor(d)))
      .attr('y', 0)
  
  } catch (error) {
    console.log(error)
  }
}

histogramChart()
