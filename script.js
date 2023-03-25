const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9]

const w = 500
const h = 100

const svg = d3.select('body').append('svg').attr('width', w).attr('height', h)

/**
 * Create a Bar for Each Data Point in the Set
 */

svg
  .selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('width', 25)
  .attr('height', 100)
  .attr('x', (d, i) => i * 30)
  .attr('y', 0)
