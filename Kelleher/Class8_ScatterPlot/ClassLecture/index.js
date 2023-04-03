import { csv, select, selectAll } from 'd3'

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

//Create chart dimensions with an SVG element
const width = window.innerWidth
const height = window.innerHeight

const svg = select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const main = async () => {
  // csv takes a second argument which is a function that is called for each row
  const data = await csv(csvUrl, parseRow)

  svg.selectAll('circle').data(data).join('circle').attr('r', 5)
}

main()
