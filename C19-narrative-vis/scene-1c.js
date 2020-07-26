// The svg
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

// Data and color scale
var mapdata = d3.map();

var colorScale = d3.scaleThreshold()
  .domain([10,20,30,40,50,60,70,80,90])
  .range(d3.schemeReds[9]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "./owid-covid-data.csv", function(d) {
    mapdata.set(d.iso_code, +d.stringency_index);
    return d;
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
