// set the dimensions and margins of the graph
var margin2 = {top: 30, right: 0, bottom: 30, left: 50},
    width2 = 210 - margin2.left - margin2.right,
    height2 = 210 - margin2.top - margin2.bottom;

var keyCountry = 
    ['United States',
    'Brazil',
    'Chile',
    'Honduras',
    'United Kingdom',
    'Italy',
    'Sweden',
    'China',
    'Japan',
    'South Korea',
    'Singapore',
    'India',
    'Qatar',
    'Australia',
    'New Zealand'];

var TopCasesPerMil = 
    ['Qatar',
    'San Marino',
    'Vatican',
    'Andorra',
    'Bahrain',
    'Chile'];

//Read the data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function(data) {
d3.csv("./owid-covid-data.csv", function(data) {
  // group the data: I want to draw one line per group

  dataf = data.filter(function(d,i) { 
    //var sq = d3.select("#filter-2").property("value");
    return keyCountry.indexOf(d.location) >= 0;
    });
  
  var parseTime = d3.timeParse("%m/%e/%Y");
  function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return parseTime(a.date) - parseTime(b.date);
  }

  dataf = dataf.sort(sortByDateAscending);
  //data.date = parseTime(data.date).sort(d3.ascending());

  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    //.key(function(d) { return d.name;})
    .key(function(d) {return d.location;})
    .entries(dataf);

  // What is the list of groups?
  allKeys = sumstat.map(function(d){return d.key})

  // Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
  var svg2 = d3.select("#scene-2")
  // var svg = d3.select("svg")
    .selectAll("uniqueChart")
    .data(sumstat)
    .enter()
    .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin2.left + "," + margin2.top + ")");

  // Add X axis --> it is a date format
  var x = d3.scaleBand()
    //.domain(d3.extent(data, function(d) { return d.date; }))
    .domain(dataf.map(function(d) { return d.date; }))
    .range([ 0, width2 ]);
  svg2
    .append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x).ticks(3))
    .selectAll("text")
        .style("visibility","hidden")
    .selectAll("line")
    .style("visibility","hidden");

  //Add Y axis
  var y = d3.scaleLinear()
    //.domain([0, d3.max(data, function(d) { return +d.n; })])
    .domain([0,100])
    .range([ height2, 0 ]);
  svg2.append("g")
    .call(d3.axisLeft(y).ticks(5));

  // color palette
  //var color = d3.scaleOrdinal()
  //  .domain(allKeys)
  //  .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  svg2
    .append("path")
      .attr("fill", "none")
      //.attr("stroke", function(d){ return color(d.key) })
      //.attr("stroke-width", 1.9)
      .attr("class", "line")
      .attr("d", function(d){
        return d3.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(+d.stringency_index); })
          (d.values)
      })

  // Add titles
  svg2
    .append("text")
    .attr("text-anchor", "start")
    .attr("y", -5)
    .attr("x", 0)
    .text(function(d){ return(d.key)})
    //.style("fill", function(d){ return color(d.key) })

})