import { select, json } from 'd3'

const heatData =
  'https://gist.githubusercontent.com/RandyPol/2135ded73edfa16c69fa7d5ae92f9f8c/raw/18934cbbe9d586654f3e565c4cb4c3ac5ac0cf66/heatMapData.json'

async function draw(el) {
  // Data
  const dataset = await json(heatData)

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  }
  const box = 30

  // Draw Image
  const svg = select(el)
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  // Rectangles
  svg
    .append('g')
    .attr('stroke', 'black')
    .attr('stroke', '#ddd')
    .attr('transform', 'translate(2,2)')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, i) => box * (i % 20)) // 0, 30, 60
    .attr('y', (d, i) => box * ((i / 20) | 0))
}

draw('#heatmap1')
