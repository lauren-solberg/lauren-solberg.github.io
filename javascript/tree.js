var height = 200;
var width = 500;
var margin = {left:50, right:50, top:40, bottom:0};

// Empty layout for the "tree" viz type
var tree = d3.tree().size([width, height]);

// Variable for the svg:
var svg = d3.select('body').append('svg').attr('width','100%').attr('height','100%');
// Variable for the chartGroup within the SVG:
var chartGroup = svg.append('g').attr('transform','translate('+margin.left+','+margin.top+')');

// Bring in the data:
d3.json('data/treeData.json').get(function(error,data){
    console.log(data[0]);
    // Let d3 know that this is the root of your data.
    // The console will return a value called 'depth' which tells you how many levels in something is.
    // Children are depth=1, grandchildren are depth=2.
    var root = d3.hierarchy(data[0]);
    console.log(root);
    tree(root);
    // Add circles and lines to make the actual tree diagram, based on the data.
    // Circles:
    chartGroup.selectAll("circle")
        .data(root.descendants())
        .enter().append("circle")
                    .attr("cx",function(d){ return d.x; })
                    .attr("cy",function(d){return d.y; })
                    .attr("r","5");
    // Lines:
    // First, choose whether it's straight or curvy:
    var straight_line = function(d){ return "M" + d.x + "," + d.y + "L" + d.parent.x + "," + d.parent.y }
    var curvy_line = "forget it, this is way too hard"
    // Then, make the line:
    chartGroup.selectAll("path")
        .data(root.descendants().slice(1)) // Because we always need one less path than the dots that we have.
        .enter().append("path")
                    .attr("class","link")
                    .attr("d",straight_line);
});

