d3.select('body').append('h1').text('Mastering D3')

// Select a Group of Elements with D3
/**
 * D3 also has the selectAll() method to select a group of elements.
 */
const anchors = d3.selectAll('a')

d3.selectAll('li').text('list item')

// Work with Data in D3
const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9]

d3.select('body')
  .selectAll('h2')
  .data(dataset)
  .enter()
  .append('h2')
  .text((dataPoint) => dataPoint + ' USD')
  .style('font-family', 'verdana')
