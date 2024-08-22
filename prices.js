var parseDate = d3.timeParse("%m/%d/%Y");

d3.csv("prices.csv")
    .row(function(d){ return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))}; }) // Runs a transformation on each datapoint
    .get(function(error,data){
        console.log(data);

        // Chart dimensions:
        var height = 300; // Height of the chart we are making
        var width = 500;  // Width of the chart we are making

        // Extremes of our data:
        var max = d3.max(data, function(d){ return d.price; }); // Maximum data point within the upcoming line chart
        var minDate = d3.min(data,function(d){ return d.month; }); // Earliest date for the x-axis.
        var maxDate = d3.max(data, function(d){ return d.month; }); // Latest date for the x-axis.

        // Scales:
        var y = d3.scaleLinear()
                    .domain([0, max]) // Input. For price data, the y-axis should start at zero.
                    .range([height,0]); // Output
        var x = d3.scaleTime()
                    .domain([minDate,maxDate])
                    .range([0,width]);
        
        // Axes:
        var yAxis = d3.axisLeft(y);
        var xAxis = d3.axisBottom(x);

        // Start adding elements to the page:
        var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%"); // Empty box/artboard where the chart will go
        var margin = {left:50,right:50,top:40,bottom:0}; // Margins to make it look nice within the box

        // The chart itself, which fits inside the svg box. Right now it's still just its own empty box:
        var chartGroup = svg.append("g")
                            .attr("transform","translate("+margin.left+","+margin.top+")"); // This line confuses me so much. But I know we are shifting the chart itself over to where the margins end.

        // Now, we finally add the line itself:
        var line = d3.line()
                    .x(function(d){ return x(d.month); })
                    .y(function(d){ return y(d.price); });

        // Append it all together and add the aces:
        chartGroup.append("path").attr("d", line(data));
})