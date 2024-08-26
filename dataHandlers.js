var parseDate = d3.timeParse("%m/%d/%Y");
// TSV: tab-separated value file
d3.tsv("data.tsv")
    .row(function(d){ return {month: parseDate(d.month), price: Number(d.price.trim().slice(1))}; }) // Runs a transformation on each datapoint
    .get(function(error,data){
        if(error) {
            console.error("Error loading data:", error);
          } else {
            console.log(data);
          }
    })

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

d3.json("treeData.json").get(function(error, data){
  console.log(data);
});
