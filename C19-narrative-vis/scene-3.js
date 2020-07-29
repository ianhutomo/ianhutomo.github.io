
var svg3 = d3.select("#scene-3"),
margin3 = {top: 20, right: 25, bottom: 70, left: 40},
width3 = +svg3.attr("width") - margin3.left - margin3.right,
height3 = +svg3.attr("height") - margin3.top - margin3.bottom;

var x = d3.scaleBand().rangeRound([0, width3]).padding(0.3),
//var x = d3.scaleTime().rangeRound([0, width3]),
//y = d3.scaleLog().base(10).range([height3,0]),
y = d3.scaleLinear().rangeRound([height3,0]);
y1 = d3.scaleLinear().rangeRound([height3,0]);

var g = svg3.append("g")
.attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

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
var sq = d3.select("#filter-3").property("value");
return d.location === sq;
});

var barcount = Object.keys(data).length;

// set the domains of the axes
x.domain(data.map(function(d) { return d.date; }));
//x.domain([new Date(2020,2,1),new Date(2020,6,30)]);
y.domain([0, d3.max(data, function(d) { return d.new_cases; })]);
y1.domain([0,100]);
//z.domain([0, d3.max(data, function(d) { return d.stringency_index;})]);

// X axis
g.append("g")
  .attr("id", "x-axis")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height3 + ")")
  //.call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b-%d")))
  .call(d3.axisBottom(x).ticks(d3.timeDay.every(5)).tickFormat(d3.timeFormat("%b %d")))
  .selectAll("text")
        //.style("visibility","hidden")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .style("font-size", "6px")
        .attr("transform", "rotate(-65)");;

//g.select("x-axis").selectAll(".tick:nth-child(7)").style("visibility","visible");

//Y axis
g.append("g")
  .attr("class", "axis axis--y")
  .attr("id", "y-axis")
  .call(d3.axisLeft(y))
//.append("text")
//  .attr("transform", "rotate(-90)")
//  .attr("y", 6)
//  .attr("dy", "0.71em")
// .attr("text-anchor", "end")
//  .text("new_cases");

//Y axis Right 
g.append("g")
  .attr("class", "axis axis--y1")
  .attr("transform", "translate("+ width3+",0)")
  .attr("id", "y1-axis")
  .call(d3.axisRight(y1))


g.append("text")
    .attr("transform", "translate(" + (width3/2) + " ," +(height3 + margin3.top + 35) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "13px")
    .text("Date");

g.append("text")
    .attr("transform", "translate(10,15)")
    //.attr("transform", "rotate(-90)")
    //.attr("y",0-margin3.left-5 )
    //.attr("x",0 - (height3 / 2))
    //.attr("dy", "1em").style("text-anchor", "middle")
    .style("font-size", "13px")
    .text("<- New Covid 19 Cases");

g.append("text")
    .attr("transform", "translate(650,15)")
    .style("font-size", "13px")
    .text("Stringency Index ->");

// create the bars
g.selectAll(".bar")
.data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d) { return x(d.date); })
  .attr("y", function(d) { return y(d.new_cases); })
  //.attr("width",4)
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height3 - y(d.new_cases); });


// line chart
var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.stringency_index); })
//    .curve(d3.curveMonotoneX);

g.append("path")
    .attr("class", "line") // Assign a class for styling
    .attr("id", "si_line")
    .attr("d", line(data)); //Calls the line generator

//g.append("text").attr("x", 200).attr("y",200).text("Stringency Index").attr("transform", "rotate(90)").style("font-size", "12px").style("text-anchor", "middle");
//legends
g.append("rect").attr("class","legend").attr("x", 100).attr("y",50).attr("width",30).attr("height",2).style("fill","rgb(207, 44, 44)");
g.append("rect").attr("class","legend").attr("x", 120).attr("y",65).attr("width",10).attr("height",10).style("fill","steelblue");
g.append("text").attr("class","legend").attr("x", 135).attr("y",50).text("Stringency Index").style("font-size", "12px").attr("alignment-baseline","middle");
g.append("text").attr("class","legend").attr("x", 135).attr("y",70).text("New Covid-19 Cases").style("font-size", "12px").attr("alignment-baseline","middle");
//g.append("rect").attr("class","legend").attr("x", 90).attr("y",40).attr("width",150).attr("height",50).style("background-color","transparent").style("border","1px solid black");
g.selectAll(".legend").attr("transform", "translate(-50,0)")

////////////////////
// add a change event handler
////////////////////

d3.select("#filter-3").on("change", function() {
  applyFilter(this.value);
});

// call this whenever the filter changes
function applyFilter(value) {
// filter the data
var data = csv.filter(function(d) {return d.location === value;})

console.log(data);

//x.domain(data.map(function(d) {return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.new_cases; })]);

g.select("#y-axis")
  //.attr("class", "axis axis--y")
  .transition().duration(1000)
  .call(d3.axisLeft(y))

//remove bars
if (Object.keys(data).length < barcount) {
//d3.selectAll(".bar").exit().remove();
}
//barcount = Object.keys(data).length;
//console.log(barcount);

// update the bars
g.selectAll(".bar")
  .data(data)
  //.enter().append("rect")
  //.attr("class", "bar")
  .transition().duration(1000)
  .attr("x", function(d) { return x(d.date); })
  .attr("y", function(d) { return y(d.new_cases); })
  .attr("width", x.bandwidth())
  .attr("height", function(d) { return height3 - y(d.new_cases); });

// line chart
line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.stringency_index); })

g.select("#si_line")
    .attr("class", "line") // Assign a class for styling
    .transition().duration(1000)
    .attr("d", line(data)); // Calls the line generator
}

});