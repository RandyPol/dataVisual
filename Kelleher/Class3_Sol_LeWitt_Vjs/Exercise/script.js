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

// Create a rect that will be used to hide the lines
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

/**
 * Create a mask that will be used to create the lines
 */

// Create a mask
const mask2 = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
mask2.setAttribute('id', 'rect-mask2')
svg.appendChild(mask2)

// Create a rectangle that will be fill with black and will be used to hide the rectangle
const maskRect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
maskRect2.setAttribute('width', width)
maskRect2.setAttribute('height', height)
maskRect2.setAttribute('fill', 'black')
mask2.appendChild(maskRect2)

// Create a rect that will be used to show the lines
const rectShapeHide2 = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'rect'
)
rectShapeHide2.setAttribute('x', width * 0.25 + 10)
rectShapeHide2.setAttribute('y', height * 0.25 + 10)
rectShapeHide2.setAttribute('width', width / 2 - 10)
rectShapeHide2.setAttribute('height', height / 2 - 20)
rectShapeHide2.setAttribute('fill', 'white')
mask2.appendChild(rectShapeHide2)

const n = 100

for (let i = 0; i < n; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', i * 20)
  rect.setAttribute('width', 10)
  rect.setAttribute('height', height)
  rect.setAttribute('mask', 'url(#rect-mask)')
  svg.appendChild(rect)
}

for (let i = 0; i < n; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('class', 'line')
  rect.setAttribute('y', i * 20)
  rect.setAttribute('width', width)
  rect.setAttribute('height', 10)
  rect.setAttribute('mask', 'url(#rect-mask2)')
  svg.appendChild(rect)
}

console.log(svg.children.length)
