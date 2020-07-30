//annotation 1

g.append('line').attr("class","annotation1").style("stroke", "black").attr("x1", 0).attr("y1", 0).attr("x2", -90).attr("y2", -80)
g.append("text").attr("class","legend").attr("x", 135).attr("y",50).text("Stringency Index").style("font-size", "12px").attr("alignment-baseline","middle");
; 
g.selectAll(".annotation1").attr("transform", "translate(280,470)");

