async function barChart() {
  const dataSet = await d3.csv('bodypart-injury-clean.csv')
  console.log(dataSet)

  const width = 600
  const height = 600

  // Canvas
  const canvas = d3
    .select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
}

barChart()
