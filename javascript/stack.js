var parseDate = d3.timeParse("%Y");

d3.xml('data/data2.xml').get(function(error, xml){

    var height = 200;
    var width = 500;
    var margin = {left: 50, right: 50, top:40, bottom:0};

    xml = [].map.call(xml.querySelectorAll("dat"), function(d){
        return{
            date: parseDate(d.getAttribute("id")),
            top: +d.querySelector("top").textContent,
            middle: +d.querySelector("middle").textContent,
            bottom: + d.querySelector("bottom").textContent

        };
    })
    
    // console.log(xml);

    var x = d3.scaleTime()
                .domain(d3.extent(xml, function(d){ return d.date;})) //d3.extent will give us the min and max of that data that's held within xml.
                .range([0,width]);

    var y = d3.scaleLinear()
                .domain([0, d3.max(xml, function(d){ return d.top+d.middle+d.bottom;})]) // 0 here because we want our chart to begin at zero.
                .range([height, 0]);
    
    var categories = ["top", "middle", "bottom"];

    var stack = d3.stack().keys(categories);

    var area = d3.area()
                    .x(function(d){return x(d.data.date);})
                    .y0(function(d){return y(d[0]);})
                    .y1(function(d){return y(d[1]);});

    var svg = d3.select("body").append("svg").attr("width","100%").attr("height","100%");
    var chartGroup = svg.append("g").attr("transform", "translate("+margin.left+","+margin.top+")");
    var stacked = stack(xml)

    // Actually render the x-axis:
    chartGroup.append("g").attr("class","x axis")
                          .attr("transform","translate(0,"+height+")")
                          .call(d3.axisBottom(x))

    // Actually render the y-axis:
    chartGroup.append("g").attr("class", "y axis")
                          .attr("transform","translate(0,0)")
                          .call(d3.axisLeft(y).ticks(5))
    
    // Actually render the areas:
    // version 1: render them as just lines:
//     chartGroup.selectAll("path.area") // Select all paths with the class "area" (to not get confused with the axes)
//               .data(stacked) // stacked = an array of length 3
//               .enter().append("path")
//               .attr("class","area")
//               .attr("d",function(d){ return area(d);})
//     console.log(stacked);
// });
    // Actually render the areas:
    // version 2: different code to do the exact same thing.
    // Why it's important === We can access the data (d) even though we've inserted groups in between. Apparently this is important later.
    // We can access the data that's been bound to groups, through path.
    // IN OTHER WORDS, a data point bound to a parent element can still be accessed by a child element.
        chartGroup.selectAll("g.area")
                  .data(stacked)
                  .enter().append("g")
                            .attr("class","area")
                  .append("path")
                            .attr("class","area")
                            .attr("d",function(d){ return area(d);})
});