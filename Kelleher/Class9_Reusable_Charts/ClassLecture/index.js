import { csv, select } from 'd3'

import { scatterPlot } from './scatterPlot'

const csvUrl =
  'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

// We are parsing the data to convert the strings to numbers using the + operator
const parseRow = (row) => {
  row.sepal_length = +row.sepal_length
  row.sepal_width = +row.sepal_width
  row.petal_length = +row.petal_length
  row.petal_width = +row.petal_width
  return row
}
const width = window.innerWidth
const height = window.innerHeight
const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const main = async () => {
  const data = await csv(csvUrl, parseRow)
  svg.call(
    scatterPlot()
      .width(width)
      .height(height)
      .data(data)
      .xValue((d) => d.petal_length)
      .yValue((d) => d.sepal_length)
      .margin({ top: 20, right: 20, bottom: 50, left: 80 })
      .radius(5)
      .xAxisLabel('Petal Length')
      .yAxisLabel('Sepal Length')
  )
}

main()
