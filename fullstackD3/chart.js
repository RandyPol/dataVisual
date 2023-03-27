async function drawLineChart() {
  const dataSet = await d3.json('./my_weather_data.json')
  console.log(dataSet)
}
drawLineChart()
