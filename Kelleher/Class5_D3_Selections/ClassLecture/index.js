import { select, range } from 'd3'

const width = window.innerWidth
const height = window.innerHeight

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// /**
//  * Seperation of concerns: Data manipulation
//  */
// const data = range(20).map((d) => ({
//   x: d * 50 + 10,
//   y: 250 + Math.sin(d * 0.6) * 100,
// }))

// /**
//  * Seperation of concerns: DOM manipulation and rendering
//  */
// svg
//   .selectAll('circle')
//   .data(data)
//   .enter()
//   .append('circle')
//   .attr('r', 5)
//   .attr('cx', (d) => d.x)
//   .attr('cy', (d) => d.y)

let t = 0
setInterval(() => {
  const data = range(15).map((d) => ({
    x: d * 60 + 50,
    y: 250 + Math.sin(d * 0.5 + t) * 220,
  }))

  // Create a new selection of circles
  const circle = svg.selectAll('circle').data(data)
  //Circle enter selection
  const circleEnter = circle.enter().append('circle').attr('r', 20)
  // Use merge to combine the enter and update selections into one selection
  // Circle represents the update selection
  circle
    .merge(circleEnter)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)

  circle.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

  t += 0.8
}, 1000)
