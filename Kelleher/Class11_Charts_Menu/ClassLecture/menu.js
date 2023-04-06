export const menu = () => {
  let id
  let labelText
  let options = []

  const my = (selection) => {
    selection
      .selectAll('label')
      .data([null])
      .join('label')
      .attr('for', id)
      .text(labelText)

    selection
      .selectAll('select')
      .data([null])
      .join('select')
      .attr('id', id)
      .selectAll('option')
      .data(options)
      .join('option')
      .attr('value', (d) => d)
      .text((d) => d)
  }

  // Getter/setter functions
  my.id = function (_) {
    return arguments.length ? ((id = _), my) : id
  }
  my.labelText = function (_) {
    return arguments.length ? ((labelText = _), my) : labelText
  }
  my.options = function (_) {
    return arguments.length ? ((options = _), my) : options
  }

  return my
}

// Create a label and a select menu
// <label for="x-select">X</label>
// <select id="x-select">
//  <option value="petal_length">Petal Length</option>
// <option value="sepal_length">Sepal Length</option>
// <option value="petal_width">Petal Width</option>
// <option value="sepal_width">Sepal Width</option>
// </select>
//
