import { csv, select } from 'd3'

import { scatterPlot } from './scatterPlot'
import { scatterPlot_Animated } from './scatterPlot_Animated'
import { menu } from './menu'

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
const width = window.innerWidth / 2
const height = window.innerHeight / 2

// Create the Dive container
const divSvgContainer = select('#svgContainer')
// Create First SVG and the sub elements
const div = divSvgContainer.append('div').attr('class', 'divSvg-container')
const menuContainer = div.append('div').attr('class', 'menu-container')
const xMenu = menuContainer.append('div')
const yMenu = menuContainer.append('div')

const svg = div.append('svg').attr('width', width).attr('height', height)

// Second SVG and the sub elements
const div2 = divSvgContainer.append('div').attr('class', 'divSvgTwo-container')
const menuContainer2 = div2.append('div').attr('class', 'menu-container')
const xMenu2 = menuContainer2.append('div')
const yMenu2 = menuContainer2.append('div')

const svg2 = div2.append('svg').attr('width', width).attr('height', height)

const main = async () => {
  const columns = ['petal_length', 'sepal_length', 'petal_width', 'sepal_width']

  const data = await csv(csvUrl, parseRow)

  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_length)
    .yValue((d) => d.sepal_length)
    .margin({ top: 20, right: 20, bottom: 50, left: 80 })
    .radius(2)
    .xAxisLabel('Petal Length')
    .yAxisLabel('Sepal Length')

  const plot2 = scatterPlot_Animated()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_length)
    .yValue((d) => d.sepal_length)
    .margin({ top: 20, right: 20, bottom: 50, left: 80 })
    .radius(2)
    .xAxisLabel('Petal Length')
    .yAxisLabel('Sepal Length')

  // Call the menu function and pass the menuContainer as the selection
  xMenu.call(menu())
  yMenu.call(menu())
  xMenu2.call(menu())
  yMenu2.call(menu())

  svg.call(plot)
  svg2.call(plot2)

  // let i = 0
  // setInterval(() => {
  //   plot
  //     .xValue((d) => d[columns[i % columns.length]])
  //     .xAxisLabel(columns[i % columns.length])

  //   plot2
  //     .xValue((d) => d[columns[i % columns.length]])
  //     .xAxisLabel(columns[i % columns.length])

  //   svg.call(plot)
  //   svg2.call(plot2)
  //   i++
  // }, 3000)
}

main()
