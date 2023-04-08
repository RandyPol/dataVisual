import { scaleLinear, extent } from 'd3'

const slices = [100, 200, 300, 400, 500]
// const scale = scaleLinear().domain([100, 500]).range([10, 350])

// Using min and max
// const scale = d3.scaleLinear()
//     .domain([d3.min(slices), d3.max(slices)])
//     .range([10, 350])

// Using extent (min and max)
const scale = scaleLinear()
    .domain(extent(slices))
    .range([10, 350])

console.log(scale(500))
console.log(scale(100))
console.log(scale(300))
console.log(scale(600))
