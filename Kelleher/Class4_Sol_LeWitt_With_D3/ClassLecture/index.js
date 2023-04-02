import { select, range, symbol, symbols } from 'd3'

const width = window.innerWidth
const height = window.innerHeight

// Create a function to refactor the code
const renderMask = (selection, id, inverted) => {
  const mask = selection.append('mask').attr('id', id)

  mask
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', inverted ? 'white' : 'black')
  // We are going to append a path to the mask that will create the lines that we want
  // We are going to use the symbol generator to create the lines
  // The fill white create the lines that we want to display on the screen and the rest of the mask will be black
  // const g = mask
  //   .append('g')
  //   .attr('transform', `translate(${width / 2}, ${height / 2})`)

  mask
    .selectAll('g')
    .data(range(symbols.length))
    .join((enter) =>
      enter
        .append('g')
        .attr('transform', (d) => `translate(${d * 125 + 100}, ${height / 2})`)
        .append('path')
        .attr('d', (d) => symbol(symbols[d], 10000)())
        .attr('fill', inverted ? 'black' : 'white')
    )

  return mask
}

// Create the svg
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Invoke the function to create the mask
/**
 * Create a mask for the first for loop to create the lines
 */

// renderMask('mask-1', true)
// The renderMask function was updated to call a function on a D3 selection
// using the convention of passing the selection as the first argument
svg.call(renderMask, 'mask-1', true)

// /**
//  * Create a mask for the second for loop to create the lines
//  */

// renderMask('mask-2', false)
svg.call(renderMask, 'mask-2', false)

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
