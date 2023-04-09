import { select, json, extent, scaleLinear } from 'd3'

const url =
  'https://gist.githubusercontent.com/RandyPol/2135ded73edfa16c69fa7d5ae92f9f8c/raw/1c2d92dbe4121e7b8882f3742af68f7c70827201/logData.json'

async function draw() {
  // Data
  const dataset = await json(url)

  const sizeAccessor = (d) => d.size
  const nameAccessor = (d) => d.name

  // Dimensions
  let dimensions = {
    width: 200,
    height: 500,
    margin: 50,
  }

  // Draw Image
  const svg = select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Scales
  const universeScale = scaleLinear()
    .domain(extent(dataset, sizeAccessor))
    .range([dimensions.height - dimensions.margin, dimensions.margin])

  // Draw Circles
  const circleGroup = svg.append('g')

  circleGroup
    .selectAll('circle')
    .append('g')
    .data(dataset)
    .join('circle')
    .attr('r', 6)
    .attr('cx', dimensions.margin)
    .attr('cy', dimensions.margin)

  // Draw Text
  circleGroup
    .selectAll('text')
    .data(dataset)
    .join('text')
    .attr('x', dimensions.margin + 15)
    .attr('y', dimensions.margin)
    .text(nameAccessor)
}

draw()
