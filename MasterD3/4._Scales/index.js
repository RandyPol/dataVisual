/**
 * Scales
 */

/** 
 * 
 * The ‘scaleLinear()’ Scale
 * 
 * 
 The scaleLinear() function is a scale for continuous datasets. The input domain for the linear scale should be continuous. 
As for the output range, it can be considered continuous, too.
*
*
*/

/** 
 * 
 * The ‘scaleLinear()’ Scale
 * 
 * 
 The scaleLinear() function is a scale for continuous datasets. The input domain for the linear scale should be continuous. 
As for the output range, it can be considered continuous, too.
*
*
*/

const scale = d3.scaleLinear().domain([10, 90]).range([0, 720])

scale(0) // Returns: 0
scale(90) // Returns: 720
scale(47.35) // Returns: 336.15
scale(5) // Returns: -45
scale(100) // Returns: 810
