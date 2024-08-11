var dataArray = [
    {x: 5, y: 5},
    {x: 10, y: 15},
    {x: 20, y: 7},
    {x: 30, y: 18},
    {x: 40, y: 10}
];

// Types of line curves:
var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];

var svg = d3.select("body")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

// Loop:
for (var p=0; p<6; p++){

                // This is a generator for lines:
                var line = d3.line()
                                .x(function(d,i){ return d.x*6;})
                                .y(function(d,i){ return d.y*4;})
                                .curve(interpolateTypes[p]);

                var shiftX = p*250;
                var shiftY = 0;

                var chartGroup = svg.append("g")
                                    .attr("class","group" + p)
                                    .attr("transform", "translate("+shiftX+",0)");

                // This is where we actually apply the line:
                chartGroup.append("path")
                    .attr("fill", "none")
                    .attr("stroke", "orange")
                    .attr("d",line(dataArray));

                chartGroup.selectAll("circle.grp"+p)
                    .data(dataArray)
                    .enter().append("circle")
                                .attr("class", function(d,i){ return "grp"+i; })
                                .attr("cx",function(d){ return d.x*6;})
                                .attr("cy",function(d){ return d.y*4;})
                                .attr("r", "2");
}