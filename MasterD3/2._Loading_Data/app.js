import { select, json, csv } from 'd3'

const JSON_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/13595feb4cfc0b45dc42be1c31ebfad52bfa5cca/data.json'
const CSV_URL =
  'https://gist.githubusercontent.com/RandyPol/177c1498022e0afaba65e50b9f3965b3/raw/6bb195da7f24cd6935983c3dfafdd66f39f1a1dc/data-13.csv'

const main = async () => {
  try {
    const [data, data2] = await Promise.all([json(JSON_URL), csv(CSV_URL)])
    console.log(data)
    console.log(data2['columns'])
  } catch (error) {
    console.error(error)
  }
}

main()
