const cityData = [
  { name: 'City A', population: 1000000 },
  { name: 'City B', population: 2000000 },
  { name: 'City C', population: 1500000 },
]

const chart = d3.select('#chart')
const barSelection = chart.selectAll('div')
const boundData = barSelection.data(cityData)
const enterSelection = boundData.enter()

enterSelection
  .append('div')
  .attr('class', 'bar')
  .style('width', (d) => `${d.population / 10000}px`)
  .text((d) => d.name)
