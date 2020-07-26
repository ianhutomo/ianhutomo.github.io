// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 1024 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

// Add an svg element for each group. The will be one beside each other and will go on the next row when no more room available
var svg = d3.select("#scene-1")
// var svg = d3.select("svg")
//  .selectAll("uniqueChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// The svg
// var svg = d3.select("svg"),
// width = +svg.attr("width"),
// height = +svg.attr("height");


// Map and projection
var projection = d3.geoMercator()
.center([0,20])                // GPS of location to zoom on
.scale(99)                       // This is like the zoom
.translate([ width/2, height/2 ])

d3.queue()
.defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
.defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_gpsLocSurfer.csv") // Position of circles
.await(ready);

function ready(error, dataGeo, data) {

// Create a color scale
var allContinent = d3.map(data, function(d){return(d.homecontinent)}).keys()
var color = d3.scaleOrdinal()
.domain(allContinent)
.range(d3.schemePaired);

// Add a scale for bubble size
var valueExtent = d3.extent(data, function(d) { return +d.n; })
var size = d3.scaleSqrt()
.domain(valueExtent)  // What's in the data
.range([ 1, 50])  // Size in pixel

// Draw the map
svg.append("g")
  .selectAll("path")
  .data(dataGeo.features)
  .enter()
  .append("path")
    .attr("fill", "#b8b8b8")
    .attr("d", d3.geoPath()
        .projection(projection)
    )
  .style("stroke", "none")
  .style("opacity", .3)
  
// Add circles:
svg
.selectAll("myCircles")
.data(data.sort(function(a,b) { return +b.n - +a.n }).filter(function(d,i){ return i<1000 }))
.enter()
.append("circle")
  .attr("cx", function(d){ return projection([+d.homelon, +d.homelat])[0] })
  .attr("cy", function(d){ return projection([+d.homelon, +d.homelat])[1] })
  .attr("r", function(d){ return size(+d.n) })
  .style("fill", function(d){ return color(d.homecontinent) })
  .attr("stroke", function(d){ if(d.n>2000){return "black"}else{return "none"}  })
  .attr("stroke-width", 1)
  .attr("fill-opacity", .4)
//  .on("mouseover", mouseover)
//  .on("mousemove", mousemove)
//  .on("mouseleave", mouseleave)



// Add title and explanation
svg
.append("text")
  .attr("text-anchor", "end")
  .style("fill", "black")
  .attr("x", width - 70)
  .attr("y", height - 50)
  .attr("width", 90)
  .html("COVID-19")
  .style("font-size", 14)


// --------------- //
// ADD LEGEND //
// --------------- //

// Add legend: circles
var valuesToShow = [100,4000,15000]
var xCircle = 40
var xLabel = 90
svg
.selectAll("legend")
.data(valuesToShow)
.enter()
.append("circle")
  .attr("cx", xCircle)
  .attr("cy", function(d){ return height - size(d) } )
  .attr("r", function(d){ return size(d) })
  .style("fill", "none")
  .attr("stroke", "black")

// Add legend: segments
svg
.selectAll("legend")
.data(valuesToShow)
.enter()
.append("line")
  .attr('x1', function(d){ return xCircle + size(d) } )
  .attr('x2', xLabel)
  .attr('y1', function(d){ return height - size(d) } )
  .attr('y2', function(d){ return height - size(d) } )
  .attr('stroke', 'black')
  .style('stroke-dasharray', ('2,2'))

// Add legend: labels
svg
.selectAll("legend")
.data(valuesToShow)
.enter()
.append("text")
  .attr('x', xLabel)
  .attr('y', function(d){ return height - size(d) } )
  .text( function(d){ return d } )
  .style("font-size", 10)
  .attr('alignment-baseline', 'middle')
}