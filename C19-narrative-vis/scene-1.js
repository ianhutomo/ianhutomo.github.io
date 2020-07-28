//var formatDateIntoYear = d3.timeFormat("%b-%d");
var formatDate = d3.timeFormat("%b-%d");
var parseTime = d3.timeParse("%m/%e/%Y");

var startDate = new Date("2020-02-01"),
    endDate = new Date("2020-06-30"),
    sliderDate = new Date("2020-02-01");

var margins = {top:0, right:50, bottom:0, left:50},
    widths = 800 -margins.left - margins.right,
    heights = 90 - margins.top - margins.bottom;

// Data and color scale
var mapdata = d3.map();

//load data
d3.csv("owid-covid-data.csv", function(d) {
    d.new_cases = +d.new_cases;
    d.date = parseTime(d.date);
    d.date = formatDate(d.date);
    d.stringency_index = +d.stringency_index;
    d.total_cases = +d.total_cases;
return d;
}, function(error, datafile) {
if (error) throw error;

var svgs = d3.select("#slider")
    .append("svg")
    .attr("width", widths + margins.left + margins.right)
    .attr("height", heights);

var xslider = d3.scaleTime()
    .domain([startDate, endDate])
    .rangeRound([0, widths])
    .clamp(true);

var slider = svgs.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margins.left + "," + heights / 2 + ")");

slider.append("line")
    .attr("class", "track")
    .attr("x1", xslider.range()[0])
    .attr("x2", xslider.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { hue(xslider.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
  .selectAll("text")
    .data(xslider.ticks(10))
    .enter()
    .append("text")
    .attr("x", xslider)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatDate(d); });

var label = slider.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .text(formatDate(startDate))
    .attr("transform", "translate(0," + (-25) + ")")

var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 5);

// end of slider

// The Map svg
var svg1 = d3.select("#scene-1"),
margin1 = {top: 20, right: 30, bottom: 70, left: 40},
width1 = +svg1.attr("width") - margin1.left - margin1.right,
height1 = +svg1.attr("height") - margin1.top - margin1.bottom;

// Map and projection
var geo_path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(150)
  .center([0,20])
  .translate([width1 / 2, height1 / 2]);

var colorScale = d3.scaleThreshold()
  .domain([20,30.40,50,60,70,80,90])
  .range(d3.schemeYlOrRd[8]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "./owid-covid-data.csv", function(d) {
    mapdata.set(d.iso_code, +d.stringency_index);
    //return d;
  })
  .await(ready);

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      //.style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      //.style("stroke", "transparent")
  }

  // Draw the map
  svg1.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = mapdata.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "black")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    
    }

  var linear = d3.scaleLinear()
    .domain([0,100])
    .range(["rgb(255,255,204)", "rgb(128,0,38)"]);
  
  svg1.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(470,490)");

  svg1.append("text")
  .attr("class", "legendLinear")
  .attr("x", 590).attr("y",475)
  .text("Stringency Index Scale")
  .style("font-size", "14px")
  .attr("alignment-baseline","middle");
  
  var legendLinear = d3.legendColor()
    .shapeWidth(35)
    .cells(10)
    .orient('horizontal')
    .scale(linear);
  
  svg1.select(".legendLinear")
    .call(legendLinear);

    // update slider function
  function hue(h) {
    handle.attr("cx", xslider(h));
    label
      .attr("x", xslider(h))
      .text(formatDate(h));

    var newDate = formatDate(h);
    // filter data set and redraw plot
    var newData = datafile.filter(function(d) {
      return d.date === newDate;
    })

    svg1.selectAll("path")
    .data(newData)
    .attr("fill", function (d) {

      d.index_bin = d.stringency_index || 0;
      return colorScale(d.index_bin);
    });

  }

});