var dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
var dataYears = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];

// Convert str years to dates:
var parseDate = d3.timeParse("%Y");
// Get min and max of x-axis:
console.log(d3.extent(dataYears, function(d){ return parseDate(d); }));

var height = 200;
var width = 500;

var margin = {
        left:50,
        right:50,
        top:40,
        bottom:0
};

// y-axis scale:
var y = d3.scaleLinear()
                .domain([0, d3.max(dataArray)]) // domain = input
                .range([height, 0]); // range = output. Opposite (biggest first) because the chart reads from top left to bottom right

// x-axis scale:
var x = d3.scaleTime()
                .domain([d3.extent(dataYears, function(d){ return parseDate(d); })])
                .range([0, width]);

console.log(y(0)); // Checking what the y-value will be when the input (x-value) is 0.
console.log(y(90));
console.log(y(180));

// Linear-axis generator:
// Uses the scale to add elements to the page
var yAxis = d3.axisLeft(y) // Numbers to the "Left" of the axis.
                .ticks(4) // SUGGESTION for how many ticks to display on the axis.
                .tickPadding(10) // Adds white space between the ticks and the numbers.
                .tickSize(10); // length of the ticks

// Generator for an area chart:
var area = d3.area()
                .x(function(d,i){ return i*20;})
                .y0(height) // Distance from the top of the screen (where y=0)
                .y1(function(d){ return y(d);}); // Location of the upper line

// Declare an SVG:
var svg = d3.select("body")
                .append("svg")
                .attr("height","100%")
                .attr("width", "100%");
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

// Actually creating the area chart instance. Calls the enerator with area() and apply the SVG instance with svg.append:
chartGroup.append("path")
        .attr("d", area(dataArray))
// Append the axis group here to make the axis actually show up:
chartGroup.append("g")
        .attr("class","axis y")
        .call(yAxis);    