// Making a Barchart

async function drawBarChart() {
  // Step 1: Importing the data
  const dataSet = await d3.json('../my_weather_data.json')
  const metricAccessor = (d) => d.humidity
  console.log(dataSet[0])
  console.log(metricAccessor(dataSet[0]))
}

drawBarChart()
