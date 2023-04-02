import { select, range } from 'd3'

const width = window.innerWidth
const height = window.innerHeight

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

/**
 * Seperation of concerns: Data manipulation
 */
const data = range(20).map((d) => ({
  x: d * 50 + 10,
  y: 250 + Math.sin(d * 0.6) * 100,
}))

/**
 * Seperation of concerns: DOM manipulation and rendering
 */
svg
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('cx', (d) => d.x)
  .attr('cy', (d) => d.y)
