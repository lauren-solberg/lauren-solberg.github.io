var parseDate = d3.timeParse("%m/%d/%Y");

// CSV:
d3.csv("data/prices.csv")
  .row(function(d){ return { month: parseDate(d.month), price: Number(d.price.trim().slice(1))};})
  .get(function(error, data){ 
    // console.log(data); 
    var nestedData = d3.nest()
                       .key(function(d) { return d.month.getFullYear(); })
                       .key(function(d) { return d.month.getMonth(); })
                       .entries(data);
    console.log(nestedData);
  });

// TSV: tab-separated value file
// d3.tsv("data.tsv")
//     .row(function(d){ return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))}; }) // Runs a transformation on each datapoint
//     .get(function(error,data){
//         if(error) {
//             console.error("Error loading data:", error);
//           } else {
//             console.log(data);
//           }
//     })

// DSV: 
// DSV doesn't go row by row because it sometimes contains entire chapters of text which span many pages and many rows.
// psv = d3.dsvFormat("|");
// d3.text("prices.txt")
//     .get(function(error,data){
//         if(error) {
//             console.error("Error loading data:", error);
//           } else {
//             var rows = psv.parse(data);
//             var newRows = [];
//             for (var p=0; p<rows.length; p++) {
//                 newRows.push({month: parseDate(rows[p].month), price: Number(rows[p].price.trim().slice(1))});
//             }
//             console.log(newRows);
//           }
//     })

// JSON
// d3.json("treeData.json").get(function(error, data){
//   console.log(data);
// });

// XML
// d3.xml("data.xml").get(function(error, data){
//   // JS method:
//   // var letterTag = data.documentElement.getElementsByTagName("letter"); // JavaScript method
//   // console.log(letterTag); // JavaScript method

//   // d3 method:
//   var letterNodes = d3.select(data).selectAll("letter")._groups[0];
//   // Logs a "node list"
//   console.log(letterNodes);

//   // console.log(data.documentElement);
// });

// TXT
// d3 interprets txt files as one big long string.
// d3.text("test.txt").get(function(error, data){

//   var myTabPositions = [];
//   var myLinePositions = [];

//   var tabVal = '\\b\t\\b'; // Looks for word + tab + word
//   var tabMod = 'g'; // returns all global instances
//   var tabRegExp = new RegExp(tabVal, tabMod);

//   var lineVal = '\\b\n\\b'; // Looks for word + new line + word
//   var lineMod = 'g';
//   var lineRegExp = new RegExp(lineVal, lineMod);

//   data.replace(tabRegExp, function(a,b){
//     myTabPositions.push(b); return a;
//   });

//   data.replace(lineRegExp, function(a,b){
//     myLinePositions.push(b); return a;
//   });

//   console.log(myTabPositions);
//   console.log(myLinePositions);

// });

// // HTML:
// d3.html("http://enable-cors.org").get(function(error, data){
//   var fragment = data.querySelector("div");
//   console.log(fragment);
// });