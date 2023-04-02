import { range } from 'd3'

const range = (n) => {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i)
  }
  return arr
}

const myArray = [
  19, 18, 17, 16, 9, 8, 7, 6, 5, 15, 14, 13, 12, 11, 10, 4, 3, 2, 1, 0,
]

// myArray.forEach((d) => {
//   console.log(d)
// })

// console.log(
//   myArray.sort((a, b) => {
//     console.log(a, b)
//     return a - b
//   })
// )

const entries = [
  { key: 'a', value: 1 },
  { key: 'b', value: 2 },
]

const result = entries.reduce((acc, entry) => {
  acc[entry.key] = entry.value
  return acc
}, {})

console.log(result)
