import { select, range } from 'd3'

const width = window.innerWidth
const height = window.innerHeight

// const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
// svg.setAttribute('width', width)
// svg.setAttribute('height', height)
// document.body.appendChild(svg)
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const n = 100
// const marks = []

// for (let i = 0; i < n; i++) {
//   marks.push({
//     y: i * 20,
//     width: width,
//     height: 10,
//     mask: 'url(#circle-mask)',
//   })
// }

// D3 Data Join Pattern
// 1. Select the elements to bind data to
svg
  .selectAll('rect')
  .data(range(n))
  .join('rect')
  .attr('y', (d) => d * 20)
  .attr('width', width)
  .attr('height', 10)
  .attr('mask', 'url(#circle-mask)')

/**
 * Create a mask that will be used to create the lines
 */

// // Create a mask
// const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
// mask.setAttribute('id', 'circle-mask')
// svg.appendChild(mask)
const mask = svg.append('mask').attr('id', 'circle-mask')
// // Create a rectangle that will be fill with white and will be used to visible the circle
// const maskRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
// maskRect.setAttribute('width', width)
// maskRect.setAttribute('height', height)
// maskRect.setAttribute('fill', 'white')
// mask.appendChild(maskRect)
mask
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'white')
// // Create a circle that will be used to hide the lines
// const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
// circle.setAttribute('cx', width / 2)
// circle.setAttribute('cy', height / 2)
// circle.setAttribute('r', 200)
// circle.setAttribute('fill', 'black')
// mask.appendChild(circle)
mask
  .append('circle')
  .attr('cx', width / 2)
  .attr('cy', height / 2)
  .attr('r', 200)
  .attr('fill', 'black')
// /**
//  * Create a mask for the second for loop to create the lines
//  */

// // Create a mask
// const mask2 = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
// mask2.setAttribute('id', 'circle-mask2')
// svg.appendChild(mask2)

// //  Everything under a black pixel will be invisible
// const maskRect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
// maskRect2.setAttribute('width', width)
// maskRect2.setAttribute('height', height)
// maskRect2.setAttribute('fill', 'black')
// mask2.appendChild(maskRect2)

// //  Everything under a white pixel will be visible
// const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
// circle2.setAttribute('cx', width / 2)
// circle2.setAttribute('cy', height / 2)
// circle2.setAttribute('r', 200)
// circle2.setAttribute('fill', 'white')
// mask2.appendChild(circle2)

// for (let i = 0; i < n; i++) {
//   const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
//   rect.setAttribute('y', i * 20)
//   rect.setAttribute('width', width)
//   rect.setAttribute('height', 10)
//   rect.setAttribute('mask', 'url(#circle-mask2)')
//   svg.appendChild(rect)
// }
