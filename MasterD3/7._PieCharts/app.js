import { select, csv, pie, arc } from 'd3'
async function draw() {
  // Data
  const dataset = await csv(
    'https://gist.githubusercontent.com/RandyPol/a6f7cf4b2471f0ca189cfe0cb0681168/raw/e48af0e07289f7a7cb2e250f94d32e825dccf91e/population.csv'
  )

  // Dimensions
  let dimensions = {
    width: 600,
    height: 600,
    margins: 10,
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  const radius = dimensions.ctrWidth / 2

  // Draw Image
  const svg = select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const ctr = svg
    .append('g') // <g>
    .attr(
      'transform',
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  // Scales
  const populationPie = pie().value((d) => d.value)
  const slices = populationPie(dataset)

  const arcFunc = arc().outerRadius(radius).innerRadius(0)

  // Draw Shapes
  const arcsGroup = ctr
    .append('g')
    .attr(
      'transform',
      `translate(${dimensions.ctrHeight / 2}, ${dimensions.ctrWidth / 2})`
    )

  arcsGroup.selectAll('path').data(slices).join('path').attr('d', arcFunc)
}

draw()
