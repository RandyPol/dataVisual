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
mask.setAttribute('id', 'rect-mask')
svg.appendChild(mask)

// Create a rectangle that will be fill with white and will be used to visible the circle
const maskRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
maskRect.setAttribute('width', width)
maskRect.setAttribute('height', height)
maskRect.setAttribute('fill', 'white')
mask.appendChild(maskRect)

// Create a circle that will be used to hide the lines
const rectShapeHide = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'rect'
)
rectShapeHide.setAttribute('x', width * 0.25)
rectShapeHide.setAttribute('y', height * 0.25)
rectShapeHide.setAttribute('width', width / 2)
rectShapeHide.setAttribute('height', height / 2)
rectShapeHide.setAttribute('fill', 'black')
mask.appendChild(rectShapeHide)

const n = 100

for (let i = 0; i < n; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', i * 20)
  rect.setAttribute('width', 10)
  rect.setAttribute('height', height)
  rect.setAttribute('mask', 'url(#rect-mask)')
  svg.appendChild(rect)
}

console.log(svg.children.length)
