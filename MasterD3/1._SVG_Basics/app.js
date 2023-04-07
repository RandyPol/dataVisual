import { select, selectAll } from 'd3'

const data = [10, 20, 30, 40, 50]

const el = select('ul')
  .selectAll('li')
  .data(data)
  .join(
    (enter) => enter.append('li').style('color', 'purple'),
    (update) => update.style('color', 'green'),
    (exit) => exit.remove()
  )
  .text((d) => d)

console.log(el)
