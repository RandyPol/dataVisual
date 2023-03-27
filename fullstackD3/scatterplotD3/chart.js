// Steps in Drawing a Chart are the same for all charts
// I'm going to show theses Steps by creating a Scotterplot

// Step 1: Accessing the data

async function drawScatterplot() {
  // Step 1.1: Utitlize d3.json to load the data file
  const dataSet = await d3.json('../my_weather_data.json')

  // Step 1.2: Create the accessors function for the data we want to use
  // We use console.log(dataSet[0]) to see the data structure
  const xAccessor = (d) => d.dewPoint
  const yAccessor = (d) => d.humidity
}

drawScatterplot()
