const width = window.innerWidth
const height = window.innerHeight

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svg.setAttribute('width', width)
svg.setAttribute('height', height)
document.body.appendChild(svg)


const n = 100
for (let i = 0; i < n; i++) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('y', i * 20)
  rect.setAttribute('width', width)
  rect.setAttribute('height', 10)
  svg.appendChild(rect)
}
// const n = 100
// for (let i = 0; i < n; i++) {
//   const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
//   rect.setAttribute('x', i * 20)
//   rect.setAttribute('width', '10')
//   rect.setAttribute('height', height)
//   svg.appendChild(rect)
// }
console.log(svg.children.length)
