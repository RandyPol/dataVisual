// Add your code below this line

const scale = d3.scaleLinear()
const output = scale(50) // Call scale with an argument here

// Add your code above this line

d3.select('body').append('h2').text(output)
