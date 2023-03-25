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
  .attr('height', (d, i) => d * 3)
  .attr('x', (d, i) => i * 30)
  .attr('y', (d) => h - d * 3)
  .attr('fill', 'navy')
  .attr('class', 'bar')

svg
  .selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .attr('x', (d, i) => i * 30)
  .attr('y', (d) => h - d * 3 - 3)
  .text((d) => d)
  .attr('style', `font-size: 25; FILL: red;`)
