async function barChart() {
  const dataSet = await d3.csv('bodypart-injury-clean.csv')
  console.log(dataSet)

  const width = 600
  const height = 600
  const margin = { top: 20, right: 30, bottom: 30, left: 40 }

  // Canvas
  const canvas = d3
    .select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const wrapper = canvas
    .append('g')
    .style('transform', `translate(${margin.left}px, ${margin.top}px)`)

  //   Create Scales for the Bar Chart
  //   xScale: Maps the data to the width of the canvas
  const xScale = d3
    .scaleBand()
    .domain(['Arm', 'Eye', 'Head', 'Hand', 'Leg', 'Other'])
    .range([0, width - margin.left])
    .padding(0.2)

  //  yScale: Maps the data to the height of the canvas
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataSet, (d) => +d.Total))
    .range([height - margin.top - margin.bottom, 0])

  // "g" is a group element that allows us to group SVG shapes together
  // Add a Bar on the Canvas: Rect Element (x, y, width, height)
  // x and y are the coordinates of the top left corner of the rectangle
  // width and height are the width and height of the rectangle
  const barRect = wrapper
    .append('g')
    .selectAll('rect')
    .data(dataSet)
    .join('rect')
    .attr('x', (d) => xScale(d.BodyRegion))
    .attr('y', (d) => yScale(+d.Total))
    .attr('width', xScale.bandwidth())
    .attr(
      'height',
      (d) => height - margin.top - margin.bottom - yScale(+d.Total)
    )
    .attr('fill', 'steelblue')

  // Add Axes to the Bar Chart
  // x-axis is a bottom axis
  const xAxis = d3.axisBottom().scale(xScale)
  wrapper
    .append('g')
    .call(xAxis)
    .style('transform', `translate(0,${height - margin.bottom - margin.top}px)`)
  //   y-axis is a left axis
  const yAxis = d3.axisLeft().scale(yScale)
  wrapper.append('g').call(yAxis)
}
barChart()
