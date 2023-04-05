import { csv, select, json, map } from 'd3'

import { barChart } from './barChart.js'

// Get the full URL of the CSV file
const abcFileCsv = new URL('./abc.csv', import.meta.url).href

const width = window.innerWidth
const height = window.innerHeight

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', [0, 0, width, height])
  .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')

const main = async () => {
  const data = await csv(abcFileCsv)

  svg.call(
    barChart()
      .width(width)
      .height(height)
      .data(data)
      .x((d) => d.letter)
      .y((d) => +d.frequency)
      .margin({ top: 20, right: 20, bottom: 50, left: 80 })
      .yFormat('%')
      .yLabel('Frequency')
  )
}

main()
