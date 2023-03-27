async function drawLineChart() {
  const dataSet = await d3.json('./my_weather_data.json')
  // This is a function that takes a string and returns a date object

  const dateParser = d3.timeParse('%Y-%m-%d')

  //   These are the accessors for the data we want to use
  const yAccessor = (d) => d.temperatureMax
  const xAccessor = (d) => dateParser(d.date)

  console.log(dataSet[0])
  console.log(xAccessor(dataSet[0]))
}

drawLineChart()
