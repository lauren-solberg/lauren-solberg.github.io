var data = []; 

// 4 top-level arrays:
data[0] = [];
data[1] = [];
data[2] = [];
data[3] = [];

// 7 total sub-arrays: 
data[0][0] = [1,2,3];
data[0][1] = [4,5,6];
data[1][0] = [7,8];
data[1][1] = [9,10,11,12];
data[1][2] = [13,14,15];
data[2][0] = [16];
data[3][0] = [17,18];

console.log(data);

var width = 1000;
var height = 240;
var barWidth = 100;
var barGap = 20;

var margin = {left:50,right:50,top:0,bottom:0};

var svg = d3.select("body").append("svg").attr("width",width).attr("height",height);
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

var firstGroups = chartGroup.selectAll("g")
	.data(data)
	.enter().append("g")
		.attr("class",function(d,i){ return "firstLevelGroup"+i; })
		.attr("transform",function(d,i){ return "translate("+(i*(barWidth+barGap))+",0)" ; })

console.log(firstGroups);

// in the var secondGroups snippets, the top section runs 4 times (because there are 4 top-level sections in 'data' [0-3])
// the bottom section runs 7 times. Because there are 7 total sub-arrays.
// To make sense of this, always log d to the console (as part of the functions before return) so you can see what you're dealing with.
// Add console.log(d); before return
var secondGroups = firstGroups.selectAll("g") // top section
	.data(function(d){ return d;}) // top section
	.enter().append("g") //top section
		.attr("class",function(d,i,j){ return "secondLevelGroup"+i; }) // bottom section
		.attr("transform",function(d,i,j){ return "translate(0,"+(height-((i+1)*50))+")"; }); // bottom section

console.log(secondGroups);

// This section of code appends one rectangle for every item in secondGroups
secondGroups.append("rect")
	.attr("x",function(d,i){ return 0;})
	.attr("y","0")
	.attr("width",100)
	.attr("height",50)
	.attr("class","secondLevelRect");


secondGroups.selectAll("circle") // top section
	.data(function(d){ console.log(d); return d; }) // top section
	.enter().append("circle") // top section
	.filter(function(d){ return d>10; }) // top section
		.attr("cx",function(d,i){ return ((i*21)+10); }) // bottom section
		.attr("cy","25") // bottom section
		.attr("r","10") // bottom section


secondGroups.selectAll("text")
	.data(function(d){ return d; })
	.enter().append("text")
	.attr("x",function(d,i){ return ((i*21)+10); })
	.attr("y","25")
	.attr("class","txt")
	.attr("text-anchor","middle")
	.attr("dominant-baseline","middle")
	.text(function(d,i,nodes){return d;});
