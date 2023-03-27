const dataSet = [2, 4, 6, 8, 10]

d3.select('#viz')
  .selectAll('P')
  .data(dataSet)
  .join('p')
  .text((d) => d)
