//var formatDateIntoYear = d3.timeFormat("%b-%d");
var formatDate = d3.timeFormat("%b-%d");

var startDate = new Date("2020-02-01"),
    endDate = new Date("2020-06-30");

var margins = {top:0, right:50, bottom:0, left:50},
    widths = 800 -margins.left - margins.right,
    heights = 90 - margins.top - margins.bottom;

var svg1 = d3.select("#slider")
    .append("svg")
    .attr("width", widths + margins.left + margins.right)
    .attr("height", heights);
    
var xslider = d3.scaleTime()
    .domain([startDate, endDate])
    .range([0, widths])
    .clamp(true);

var slider = svg1.append("g")
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

function hue(h) {
  handle.attr("cx", xslider(h));
  label
    .attr("x", xslider(h))
    .text(formatDate(h));
    
  svg1.selectAll("path")
  .attr("fill", function (d) {
    d.total = mapdata.get(d.id) || 0;
    return colorScale(d.total);
  });
  //svg1.style("background-color", d3.hsl(h/1000000000, 0.8, 0.8));
}