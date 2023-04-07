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

// Create the Dive container
const divSvgContainer = select('#svgContainer')
// Create First SVG and the sub elements
const div = divSvgContainer
  .append('div')
  .attr('class', 'divSvgContainer svgOneDiv')
const menuContainer = div.append('div').attr('class', 'menu-container')
const xMenu = menuContainer.append('div')
const yMenu = menuContainer.append('div')

const svg = div.append('svg')

// Second SVG and the sub elements
const div2 = divSvgContainer
  .append('div')
  .attr('class', 'divSvgContainer svgTwoDiv')
const menuContainer2 = div2.append('div').attr('class', 'menu-container')
const xMenu2 = menuContainer2.append('div')
const yMenu2 = menuContainer2.append('div')

const svg2 = div2.append('svg')

const main = async () => {
  // Get the data from the csv file
  const data = await csv(csvUrl, parseRow)

  // Finalize the width and height of the SVG Container
  const { width: svgParentDivWidth, height: svgParentDivHeigh } = document
    .querySelector('.divSvgContainer')
    .getBoundingClientRect()

  const width = Math.max(300, svgParentDivWidth)
  const height = Math.max(300, svgParentDivHeigh)

  const options = [
    { value: 'petal_length', text: 'Petal Length', type: 'quantitative' },
    { value: 'sepal_length', text: 'Sepal Length', type: 'quantitative' },
    { value: 'petal_width', text: 'Petal Width', type: 'quantitative' },
    { value: 'sepal_width', text: 'Sepal Width', type: 'quantitative' },
    { value: 'species', text: 'Species', type: 'categorical' },
  ]

  // Create a Map to store the data for the menu
  const myMap = new Map(options.map((option) => [option.value, option.type]))
  const getType = (value) => myMap.get(value)

  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_length)
    .yValue((d) => d.petal_length)
    .margin({ top: 20, right: 20, bottom: 50, left: 80 })
    .radius(2)
    .xAxisLabel('Petal Length')
    .yAxisLabel('Petal Length')

  const plot2 = scatterPlot_Animated()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_length)
    .yValue((d) => d.petal_length)
    .margin({ top: 20, right: 20, bottom: 50, left: 80 })
    .radius(2)
    .xAxisLabel('Petal Length')
    .yAxisLabel('Petal Length')

  // Call the menu function and pass the menuContainer as the selection
  xMenu.call(
    menu()
      .id('x-menu')
      .labelText('X:')
      .options(options)
      .on('change', (value) => {
        if (value === 'species') {
          plot.xType(value)
        }
        plot.xValue((d) => d[value])
        plot.xAxisLabel(options.find((d) => d.value === value).text)
        svg.call(plot)
      })
  )
  yMenu.call(
    menu()
      .id('y-menu')
      .labelText('Y:')
      .options(options)
      .on('change', (value) => {
        if (value === 'species') {
          plot.yType(value)
        }
        plot.yValue((d) => d[value])
        plot.yAxisLabel(options.find((d) => d.value === value).text)
        svg.call(plot)
      })
  )
  xMenu2.call(
    menu()
      .id('x-menu2')
      .labelText('X:')
      .options(options)
      .on('change', (value) => {
        plot2.xValue((d) => d[value]).xType(getType(value))
        plot2.xAxisLabel(options.find((d) => d.value === value).text)
        svg2.call(plot2)
      })
  )
  yMenu2.call(
    menu()
      .id('y-menu2')
      .labelText('Y:')
      .options(options)
      .on('change', (value) => {
        plot2.yValue((d) => d[value])
        plot2.yAxisLabel(options.find((d) => d.value === value).text)
        svg2.call(plot2)
      })
  )

  svg.call(plot)
  svg2.call(plot2)

  const updateChart = (plot, plot2) => {
    // Get the dimensions of the parent container
    const { width: svgParentDivWidth, height: svgParentDivHeigh } = document
      .querySelector('.divSvgContainer')
      .getBoundingClientRect()

    // Calculate the width and height of the chart
    const width = Math.max(300, svgParentDivWidth)
    const height = Math.max(300, svgParentDivHeigh)

    // // Update the chart with the new dimensions
    plot.width(width).height(height)
    plot2.width(width).height(height)

    // Call the chart with the updated dimensions
    svg.call(plot)
    svg2.call(plot2)
  }

  // Call the updateChart function when the window is resized
  window.addEventListener('resize', () => updateChart(plot, plot2))
}

main()
