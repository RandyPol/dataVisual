import {
  csv,
  select,
  autoType,
  stack,
  scaleLinear,
  max,
  scaleBand,
  scaleOrdinal,
  schemeSpectral,
} from 'd3'

async function draw() {
  // Data
  const dataset = await csv(
    'https://gist.githubusercontent.com/RandyPol/79d3de93f8d429c9e28918aa31c425db/raw/81afee6e4de3148d068cb46412e36de8df1f23f9/statePopulation.csv',
    (d) => {
      autoType(d)
      return d
    }
  )
  // Dimensions
  let dimensions = {
    width: 1000,
    height: 600,
    margins: 20,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Draw Image
  const svg = select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const ctr = svg
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const stackGenerator = stack().keys(dataset.columns.slice(1))

  const stackData = stackGenerator(dataset).map((ageGroup) => {
    ageGroup.forEach((state) => (state.key = ageGroup.key))
    return ageGroup
  })

  // yScale
  const yScale = scaleLinear()
    .domain([0, max(stackData, (ag) => max(ag, (s) => s[1]))])
    .rangeRound([dimensions.ctrHeight, dimensions.margins])

  // xScale
  const xScale = scaleBand()
    .domain(dataset.map((state) => state.name))
    .range([dimensions.margins, dimensions.ctrWidth])

  const colorScale = scaleOrdinal()
    .domain(stackData.map((d) => d.key))
    .range(schemeSpectral[stackData.length])
    .unknown('#ccc')

  // Draw Bars
  const ageGroups = ctr
    .append('g')
    .classed('age-groups', true)
    .selectAll('g')
    .data(stackData)
    .join('g')
    .attr('fill', (d) => colorScale(d.key))

  ageGroups
    .selectAll('rect')
    .data((d) => d)
    .join('rect')
    .attr('x', (d) => xScale(d.data.name))
    .attr('y', (d) => yScale(d[1]))
    .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
    .attr('width', xScale.bandwidth())
}

draw()
