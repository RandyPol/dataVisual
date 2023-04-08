import { select, json } from 'd3'

const JSON_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/e167bdc78f43cf44de6b3295f68f39f85960be0d/weatherData.json'

const draw = async () => {
  try {
    // Data
    const data = await json(JSON_URL)

    // Dimensions
    const dimensions = {
      width: 800,
      height: 800,
    }
  } catch (error) {
    console.error(error)
  }
}

draw()
