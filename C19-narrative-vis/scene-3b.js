
var svg = d3.select("svg"),
margin = {top: 20, right: 30, bottom: 70, left: 40},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
y = d3.scaleLinear().rangeRound([height,0]),
z = d3.scaleLinear().rangeRound([height,0]);

var g = svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// create a variable that will hold the loaded data
var csv;

// load the data
var parseTime = d3.timeParse("%m/%e/%Y");

d3.csv("owid-covid-data.csv", function(d) {
        d.new_cases = +d.new_cases;
        d.date = parseTime(d.date);
        d.stringency_index = +d.stringency_index;
        d.total_cases = +d.total_cases;
return d;
}, function(error, datafile) {
if (error) throw error;

// put the original data in csv
csv = datafile;

// filter the data based on the inital value
var data = csv.filter(function(d) { 
var sq = d3.select("#filter").property("value");
return d.location === sq;
});

// set the domains of the axes
x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.new_cases; })]);
z.domain([0,100]);
//z.domain([0, d3.max(data, function(d) { return d.stringency_index;})]);

// X axis
g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b-%d")))
  .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");;

//Y axis
g.append("g")
  .attr("class", "axis axis--y")
  .attr("id", "y-axis")
  .call(d3.axisLeft(y)/*.ticks(10, "%")*/)
//.append("text")
//  .attr("transform", "rotate(-90)")
//  .attr("y", 6)
//  .attr("dy", "0.71em")
// .attr("text-anchor", "end")
//  .text("new_cases");

//Y axis Right 
g.append("g")
  .attr("class", "axis axis--z")
  .attr("transform", "translate("+ width+",0)")
  .attr("id", "z-axis")
  .call(d3.axisRight(z)/*.ticks(10, "%")*/)

// create the bars
g.selectAll(".bar")
.data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.date); })
  .attr("y", function(d) { return y(d.new_cases); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height - y(d.new_cases); });


// line chart
var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return z(d.stringency_index); })
//    .curve(d3.curveMonotoneX);

g.append("path")
    .data(data)
    .attr("class", "line") // Assign a class for styling
    .attr("id", "si_line")
    .attr("d", line(data)); // 11. Calls the line generator

// add a change event handler 
d3.select("#filter").on("change", function() {
  applyFilter(this.value);
});

// call this whenever the filter changes
function applyFilter(value) {
// filter the data
var data = csv.filter(function(d) {return d.location === value;})
console.log(data);
x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.new_cases; })]);

g.select("#y-axis")
  //.attr("class", "axis axis--y")
  .transition().duration(1000)
  .call(d3.axisLeft(y))

// update the bars
d3.selectAll(".bar")
  .data(data)
  .transition().duration(1000)
  .attr("x", function(d) { return x(d.date); })
  .attr("y", function(d) { return y(d.new_cases); })
  .attr("height", function(d) { return height - y(d.new_cases); });

// line chart
line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.stringency_index); })
//    .curve(d3.curveMonotoneX);

g.select("#si_line")
    .attr("class", "line") // Assign a class for styling
    .attr("d", line(data)) // Calls the line generator
    .transition().duration(1000);
}

});