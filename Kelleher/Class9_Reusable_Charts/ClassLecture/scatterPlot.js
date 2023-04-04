export const scatterPlot = (config) => {
  // Set default values for configuration properties
  let width = config.width || 720
  let height = config.height || 80

  const my = () => {}

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width
  }
  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height
  }

  return my
}
