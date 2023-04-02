import { select, range, symbol, symbols } from 'd3'

const width = window.innerWidth
const height = window.innerHeight

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const n = 100

svg
  .append('g')
  .selectAll('rect')
  .data(range(n))
  .join('rect')
  .attr('y', (d) => d * 20)
  .attr('width', width)
  .attr('height', 10)
  .attr('mask', 'url(#mask-1)')

svg
  .append('g')
  .selectAll('rect')
  .data(range(n))
  .join('rect')
  .attr('x', (d) => d * 20)
  .attr('width', 10)
  .attr('height', height)
  .attr('mask', 'url(#mask-2)')

/**
 * Create a mask that will be used to create the lines
 */

const mask = svg.append('mask').attr('id', 'mask-1')

mask
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'black')

// We are going to append a path to the mask that will create the lines that we want
// We are going to use the symbol generator to create the lines
// The fill white create the lines that we want to display on the screen and the rest of the mask will be black
mask
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)
  .append('path')
  .attr('d', symbol(symbols[2], 100000)())
  .attr('fill', 'white')

// /**
//  * Create a mask for the second for loop to create the lines
//  */

const mask2 = svg.append('mask').attr('id', 'mask-2')

mask2
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'white')

mask2
  .append('g')
  .attr('transform', `translate(${width / 2}, ${height / 2})`)
  .append('path')
  .attr('d', symbol(symbols[2], 100000)())
  .attr('fill', 'black')
