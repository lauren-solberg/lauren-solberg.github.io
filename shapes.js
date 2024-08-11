var dataArray = [5,11,18];

var svg = d3.select("body").append("svg")
    .attr("height","100%")
    .attr("width", "100%");

svg.selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
        .attr("height", function(d){return d*15})
        .attr("width", "50")
        .attr("x", function(d,i){return i*100;})
        .attr("y", function(d,i){return 300 - (d*15)})
        .attr("fill", "orange");

var newX = 300;
svg.selectAll("circle.first")
    .data(dataArray)
    .enter()
    .append("circle")
        .attr("class", "first")
        .attr("cx", function(d,i){newX += (d*3) + (i*20); return newX;})
        .attr("cy","100")
        .attr("r",function(d){ return d*3; })
        .attr("fill", "black");


var newX = 600;
svg.selectAll("ellipse")
            .data(dataArray)
            .enter()
            .append("ellipse")
                .attr("class", "second")
                .attr("cx", function(d,i){newX += (d*3) + (i*20); return newX;})
                .attr("cy","100")
                .attr("rx",function(d){ return d*3; })
                .attr("ry","30")
                .attr("fill", "green");

var newX = 900;
svg.selectAll("line")
    .data(dataArray)
    .enter().append("line")
        // .style("stroke", "green") // .style() applies a STYLE property. STYLE always takes precedence over plain HTML.
        .attr("stroke-width", "2") // .attr() applies an HTML tag to each item. Otherwise, .stroke() and .attr() can do pretty much the same things when it comes to layout.
        .attr("x1", newX)
        .attr("y1", function(d,i){ return 80+(i*20); }) // we made the y values index-dependent so that they show up one below the other instead of all in the same exact spot. 20px gap between each line
        .attr("x2", function(d){ return newX+(d*15); }) // "width" of the line. Determined by datapoint*15
        .attr("y2", function(d,i){ return 80+(i*20); });

svg.append("text")
    .attr("x", newX)
    .attr("y", "150")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", "2")
    .attr("text-anchor", "start")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "30")
    .text("start");

svg.append("text")
    .attr("x", newX)
    .attr("y", "180")
    .attr("fill", "blue")
    .attr("stroke", "none")
    .attr("font-size", "30")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text("middle");

svg.append("text")
    .attr("x", newX)
    .attr("y", "210")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("font-size", "30")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .text("end");

svg.append("line")
    .attr("x1", newX)
    .attr("x2", newX)
    .attr("y1", "150")
    .attr("y2", "210")


// Text with multiple ines:
// the tspan attr
var textArray = ['start', 'middle', 'end']
svg.append("text")
    .selectAll("tspan")
    .data(textArray)
    .enter().append("tspan")
        .attr("x", "100")
        .attr("y", function(d,i){ return 150 + (i*30)})
        .attr("fill", "blue")
        .attr("stroke", "blue")
        .attr("stroke-width", "2")
        .attr("font-size", "30")
        .text(function(d){ return d; });
