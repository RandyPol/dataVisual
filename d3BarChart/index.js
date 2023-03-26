// Get data for the Bar Chart
fetch(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
)
  .then((response) => response.json())
  .then((data) => {
    // Call a function to create the chart with the data
    createBarChart(data.data)
  })

function createBarChart(data) {
  // Define dimensions, padding, and scales
  const width = 1000
  const height = 500
  const padding = 60

  const xScale = d3
    .scaleTime()
    .domain([new Date(data[0][0]), new Date(data[data.length - 1][0])])
    .range([padding, width - padding])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([height - padding, padding])

  // Create SVG element
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  // Create x-axis Bottom
  const xAxis = d3.axisBottom(xScale)
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0,' + (height - padding) + ')')
    .call(xAxis)

  // Create y-axis Left side
  const yAxis = d3.axisLeft(yScale)
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(yAxis)

  // Create title
  svg.append('text').attr('id', 'title').text('United States GDP')

  // Create axes labels
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height - padding / 4)
    .attr('text-anchor', 'middle')
    .attr('font-size', '16px')
    .text('Year')

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', 80)
    .attr('text-anchor', 'middle')
    .attr('font-size', '16px')
    .text('Gross Domestic Product')

  // Create bars
  const bars = svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(new Date(d[0])))
    .attr('y', (d) => yScale(d[1]))
    .attr('width', (width - 2 * padding) / data.length)
    .attr('height', (d) => height - padding - yScale(d[1]))
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])

  // Create tooltip
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)
    .style('position', 'absolute')

  // Add mouseover and mouseout events for tooltip
  bars
    .on('mouseover', (event, d) => {
      tooltip.transition().duration(200).style('opacity', 0.9)
      tooltip
        .html(`Date: ${d[0]}<br>GDP: ${d[1]}`)
        .attr('data-date', d[0])
        .style('left', event.pageX + 20 + 'px')
        .style('top', event.pageY - 30 + 'px')
    })
    .on('mouseout', (event, d) => {
      tooltip.transition().duration(500).style('opacity', 0)
    })
}
