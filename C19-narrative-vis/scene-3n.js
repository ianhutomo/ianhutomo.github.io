var svg = d3.select("svg"),
margin = {top: 20, right: 20, bottom: 30, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width], .05).padding(0.1),
y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create a variable that will hold the loaded data
var csv;

// load the data
var formatTime = d3.timeParse("%B/%d/%Y");

/*
d3.csv("owid-covid-data.csv", function(d) {
d.new_cases = +d.new_cases;
d.date = formatTime(d.date);
return d;
}, function(error, datafile) {
if (error) throw error;
*/

d3.csv("owid-covid-data.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = formatTime(d.date);
    d.new_cases = +d.new_cases;
  });

// put the original data in tsv
csv = data;

// filter the data based on the inital value
var data = csv.filter(function(d) { 
var sq = d3.select("#filter").property("location");
return d.group === sq;
});

// set the domains of the axes
x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.new_cases; })]);

// add the svg elements
svg.append("g")
.attr("class", "axis")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom().scale(x)
		.tickFormat(d3.timeFormat("%B/%d/%Y")))
.selectAll("text")	
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)");

/*
g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y).ticks(10, "%"))
.append("text")
  .attr("transform", "rotate(90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Date");
*/

  // Add the Y Axis
  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

// create the bars
g.selectAll(".bar")
.data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.date); })
  .attr("y", function(d) { return y(d.new_cases); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y(d.new_cases); });

// add a change event handler 
d3.select("#filter").on("change", function() {
  applyFilter(this.value);
});


// call this whenever the filter changes
function applyFilter(value) {
// filter the data
var data = csv.filter(function(d) {return d.location == value;})

// update the bars
d3.selectAll(".bar")
  .data(data)
  .transition().duration(1000)
  .attr("x", function(d) { return x(d.date); })
  .attr("y", function(d) { return y(d.new_cases); })
  .attr("height", function(d) { return height - y(d.new_cases); });

}

// line chart

/*

var line = d3.line()
    .x(function(d, i) { return xScale(d['date']) + xScale.bandwidth() / 2; })
    .y(function(d) { return yScale(d['stringency_index']); })
//    .curve(d3.curveMonotoneX);

bar.append("path")
.attr("class", "line") // Assign a class for styling
.attr("d", line(dataset)); // 11. Calls the line generator

*/
});