/*
var dataset = [
    ['Sapporo', 703, 1902],
    ['Shimizu', 1473, 3341],
    ['Matsumoto', 863, 1935],
    ['C Osaka', 1494, 3008],
    ['Kyoto',965,1743],
    ['Okayama',568,1271],
    ['Machida', 189, 626],
    ['Yokohama FC', 464, 1064],
    ['Tokushima', 731, 1443],
    ['Ehime', 306, 630],
    ['Chiba',899, 2556],
    ['Yamaguchi', 231, 880],
    ['Mito', 262, 589],
    ['Yamagata', 429, 1497],
    ['Nagasaki', 322, 749],
    ['Kumamoto', 315, 720],
    ['Gunma', 228, 522],
    ['Tokyo V',436, 1391],
    ['Sanuki', 287, 613],
    ['Gifu', 419,932],
    ['Kanazawa',296,612],
    ['Kitakyushu', 343,855]
  ];
*/

const dataset = d3.csv('./owid-covid-data-us.csv');

var margin3 = {top: 20, right: 20, bottom: 30, left: 40},
    width3 = 960,
    height3 = 360;

var xScale = d3.scaleBand()
            .rangeRound([0, width3])
            .padding(0.1)
            .domain(dataset.map(function(d) {
                return d.date;
            }));
    yScale = d3.scaleLinear()
            .rangeRound([height3, 0])
            .domain([0, d3.max(dataset, (function (d) {
                return d.new_cases;
            }))]);

var svg3 = d3.select("#scene-3")
        .append("svg")
        .attr("width", width3 + margin3.left + margin3.right)
        .attr("height", height3 + margin3.top + margin3.bottom);

var gr = svg3.append("g")
        .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

// axis-x
gr.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height3 + ")")
    .call(d3.axisBottom(xScale));

// axis-y
gr.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(yScale));

var bar = gr.selectAll("rect")
.data(dataset)
.enter().append("g");

// bar chart
bar.append("rect")
.attr("x", function(d) { return xScale(d.date); })
.attr("y", function(d) { return yScale(d.new_cases);})
.attr("width", xScale.bandwidth())
.attr("height", function(d) { return height3 - yScale(d.stringency_index); })
/*.attr("class", function(d) {
    var s = "bar ";
    if (d[2] < 400) {
    return s + "bar1";
    } else if (d[2] < 800) {
    return s + "bar2";
    } else {
    return s + "bar3";
    }*/
//});

// labels on the bar chart
bar.append("text")
.attr("dy", "1.3em")
.attr("x", function(d) { return xScale(d.date) + xScale.bandwidth() / 2; })
.attr("y", function(d) { return yScale(d.new_cases); })
.attr("text-anchor", "middle")
.attr("font-family", "sans-serif")
.attr("font-size", "11px")
.attr("fill", "black")
.text(function(d) {
    return d.stringency_index;
});

// line chart
var line = d3.line()
    .x(function(d, i) { return xScale(d.date) + xScale.bandwidth() / 2; })
    .y(function(d) { return yScale(d.stringency_index); })
//    .curve(d3.curveMonotoneX);

bar.append("path")
.attr("class", "line") // Assign a class for styling
.attr("d", line(dataset)); // 11. Calls the line generator

 // bar.append("circle") // Uses the enter().append() method
 //     .attr("class", "dot") // Assign a class for styling
 //     .attr("cx", function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
 //     .attr("cy", function(d) { return yScale(d[1]); })
 //     .attr("r", 5);
