var parseDate = d3.timeParse("%Y");

d3.xml('data/data2.xml').get(function(error, data){
    xml = [].map.call(xmlQuerySelectorAll("dat"), function(d){
        return{
            date: parseDate(d.getAttribute("id")),
            top: +d.querySelector("top").textContent,
            middle: +d.querySelector("middle").textContent,
            bottom: + d.querySelector("bottom").textContent

        };
    })
    console.log(xml);
});