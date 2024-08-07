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

        svg.selectAll("circle")
    .data(dataArray)
    .enter()
    .append("circle")
        .attr("cx", function(d,i){newX += (d*6) + (i*20); return newX;})
        .attr("cy","100")
        .attr("r",function(d){ return d*3; })
        .attr("fill", "black");