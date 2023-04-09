import { select, json } from 'd3'

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
}

draw()
