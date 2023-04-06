export const menu = () => {
  const my = (selection) => {
    selection.text('Hello World')
  }

  //   my.yAxisLabel = function (_) {
  //     return arguments.length ? ((yAxisLabel = _), my) : yAxisLabel
  //   }

  return my
}
