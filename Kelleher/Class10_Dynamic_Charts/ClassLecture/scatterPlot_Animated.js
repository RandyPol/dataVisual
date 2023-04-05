import { scaleLinear, extent, axisLeft, axisBottom, transition } from 'd3'

export const scatterPlot_Animated = () => {
  // Set default values for configuration properties
  let width
  let height
  let data
  let xValue
  let yValue
  let margin
  let radius
  let xAxisLabel
  let yAxisLabel

  const my = (selection) => {
    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([margin.left, width - margin.right])

    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([height - margin.bottom, margin.top])

    // The marks are the coordinates of the data points in the chart dimensions and range
    const marks = data.map((d) => {
      return {
        x: xScale(xValue(d)),
        y: yScale(yValue(d)),
      }
    })

    /**
     * Render the chart to the DOM using the data and configuration properties
     */
    // Get the circle group and bind the data to it (the data is null) and then join it to the DOM (create a new group) and add the class 'circle-group' to it (this is the group that will contain the circles). This approach is used to make sure is that the group is only created once and then the circles are added to it. Idempotent.
    const circleGroup = selection
      .selectAll('.circle-group')
      .data([null])
      .join('g')
      .attr('class', 'circle-group')

    // Transition the circles to their new positions. Create a transition object and set the duration and ease. The transition object is passed to the attr function to set the transition for the attribute. This is a way to animate the circles to their new positions. This method of creating the object and passing it to the attr function is called a 'chained transition'. Is prefer this method over the 'chained transition' method because it is more readable and can be reused.
    const t = transition().duration(1000)

    // Add the circles to the circle group and bind the data to it (the data is the marks array) and then join it to the DOM (create a new circle for each data point) and add the class 'circle' to it. This approach is used to make sure is that the circles are only created once and then the circles are added to it. Idempotent.

    // Create a function to for code to be resuable for the enter and update selections of the points (circles)
    const positionCircles = (selection) =>
      selection.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

    const circles = circleGroup
      .selectAll('circle')
      .data(marks)
      .join(
        (
          enter //Here we usually want to create a new circle for each data point by using the append function. The append function is called on the enter selection. The enter selection is the selection of elements that are not in the DOM yet. The enter selection is created by the join function.
        ) =>
          enter
            .append('circle')
            .call(positionCircles)
            .attr('r', 0)
            .call((enter) => enter.transition(t).attr('r', radius)),
        (
          update //Here we usually want to update the existing circles with the new data. The update selection is the selection of elements that are already in the DOM. The update selection is created by the join function. We generally want to modify the existing elements in the DOM and not create new ones. For example, move the circles to their new positions.
        ) =>
          update.call((update) =>
            update
              .transition(t)
              .delay((d, i) => i * 10)
              .call(positionCircles)
          ),
        (
          exit //Here we usually want to remove the circles that are no longer in the data. The exit selection is the selection of elements that are in the DOM but not in the data. The exit selection is created by the join function. We generally want to remove the elements that are no longer in the data.
        ) => exit.remove()
      )
    // Reference for chained transitions using observable pattern
    /**
      enter => enter.append("text")
          .attr("fill", "green")
          .attr("x", (d, i) => i * 16)
          .attr("y", -30)
          .text(d => d)
        .call(enter => enter.transition(t)
          .attr("y", 0)),
      update => update
          .attr("fill", "black")
          .attr("y", 0)
        .call(update => update.transition(t)
          .attr("x", (d, i) => i * 16)),
      exit => exit
          .attr("fill", "brown")
        .call(exit => exit.transition(t)
          .attr("y", 30)
          .remove())
       */

    // Add y-axis
    selection
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .transition(t)
      .call(axisLeft(yScale))

    // Add x-axis
    selection
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .transition(t)
      .call(axisBottom(xScale))

    // Add x-axis label that are idempotent (only created once) and add animation to it
    selection
      .selectAll('.x-axis-label')
      .data([null])
      .join('text')
      .attr('class', 'x-axis-label')
      .attr('x', width / 2)
      .attr('y', height)
      .attr('fill', 'black')
      .text(xAxisLabel)
      .transition(t)
      .attr('y', height - 10)

    // Add y-axis label
    selection
      .selectAll('.y-axis-label')
      .data([null])
      .join('text')
      .attr('class', 'y-axis-label')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2)
      .attr('fill', 'black')
      .attr('transform', 'rotate(-90)')
      .text(yAxisLabel)
  }

  my.width = function (_) {
    return arguments.length ? ((width = +_), my) : width
  }
  my.height = function (_) {
    return arguments.length ? ((height = +_), my) : height
  }
  my.data = function (_) {
    return arguments.length ? ((data = _), my) : data
  }
  my.xValue = function (_) {
    return arguments.length ? ((xValue = _), my) : xValue
  }
  my.yValue = function (_) {
    return arguments.length ? ((yValue = _), my) : yValue
  }
  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin
  }
  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius
  }

  my.xAxisLabel = function (_) {
    return arguments.length ? ((xAxisLabel = _), my) : xAxisLabel
  }
  my.yAxisLabel = function (_) {
    return arguments.length ? ((yAxisLabel = _), my) : yAxisLabel
  }

  return my
}
