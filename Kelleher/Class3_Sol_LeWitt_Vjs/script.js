const width = window.innerWidth
const height = window.innerHeight

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svg.setAttribute('width', width)
svg.setAttribute('height', height)
document.body.appendChild(svg)

/**
 * Create a mask that will be used to create the lines
 */

// Create a mask
const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
mask.setAttribute('id', 'circle-mask')
svg.appendChild(mask)

// Create a rectangle that will be used to create the mask
const maskRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
maskRect.setAttribute('width', width)
maskRect.setAttribute('height', height)
maskRect.setAttribute('fill', 'white')
mask.appendChild(maskRect)

// Create a circle that will be used to create the mask
const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
circle.setAttribute('cx', width / 2)
circle.setAttribute('cy', height / 2)
circle.setAttribute('r', 200)
circle.setAttribute('fill', 'black')
mask.appendChild(circle)

const n = 100
for (let i = 0; i < n; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('y', i * 20)
  rect.setAttribute('width', width)
  rect.setAttribute('height', 10)
  rect.setAttribute('mask', 'url(#circle-mask)')
  svg.appendChild(rect)
}

// for (let i = 0; i < n; i++) {
//   const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
//   rect.setAttribute('x', i * 20)
//   rect.setAttribute('width', '10')
//   rect.setAttribute('height', height)
//   svg.appendChild(rect)
// }
console.log(svg.children.length)
