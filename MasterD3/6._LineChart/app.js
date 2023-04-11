import { select, csv, scaleLinear, extent, scaleTime, timeParse } from 'd3'

async function draw() {
  // Data
  const dataset = await csv(
    'https://gist.githubusercontent.com/RandyPol/2b3a261ddeb3c737eb0cb14e2517968a/raw/10192473b7fb4e7e205ef7e25f2cd6719d2f89ed/appleStock.csv'
  )

  const parseData = timeParse('%Y-%m-%d')
  const xAccessor = (d) => parseData(d.date)
  const yAccessor = (d) => parseInt(d.close)

  // Dimensions
  let dimensions = {
    width: 1000,
    height: 500,
    margins: 50,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Draw Image
  const svg = select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const ctr = svg
    .append('g') // <g>
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const yScale = scaleLinear()
    .domain(extent(dataset, yAccessor))
    .range([dimensions.ctrHeight, 0])
    .nice()

  const xScale = scaleTime()
    .domain(extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])

  console.log(xScale(xAccessor(dataset[0])), dataset[0])
}

draw()
