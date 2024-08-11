var dataArray = [
    {x: 5, y: 5},
    {x: 10, y: 15},
    {x: 20, y: 7},
    {x: 30, y: 18},
    {x: 40, y: 10}
];

var svg = d3.select("body")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

// This is a generator for lines:
var line = d3.line()
                .x(function(d,i){ return d.x*6;})
                .y(function(d,i){ return d.y*4;})
                .curve(d3.curveStep);

// This is where we actually apply the line:
svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("d",line(dataArray));