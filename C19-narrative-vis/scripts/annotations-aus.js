//annotation 1
g.append('line').attr("class","annotation1").style("stroke", "black")
    .attr("x1", 0).attr("y1", 0).attr("x2", 70).attr("y2", 40);
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-4em").text("Lockdown Measures")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-3em").text("Started to be Applied")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-2em").text("Stringency Index are")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-1em").text("increased gradually")
    .style("font-size", "12px").style("font-weight", "normal");
g.selectAll(".annotation1").attr("transform", "translate(180,350)");

//annotation 2
g.append('line').attr("class","annotation2").style("stroke", "black")
    .attr("x1", 30).attr("y1", 0).attr("x2", -70).attr("y2", 110);
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-5em").text("Decrease in Daily")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-4em").text("New Cases")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-3em").text("Lockdown measures seems")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-2em").text("to correlate with decrease")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-1em").text("in daily new cases")
    .style("font-size", "12px").style("font-weight", "normal");
g.selectAll(".annotation2").attr("transform", "translate(400,450)");

//annotation 3
g.append('line').attr("class","annotation3").style("stroke", "black")
    .attr("x1", 0).attr("y1", 0).attr("x2", 70).attr("y2", 40);
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-5em").text("New Cases")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-4em").text("Increase")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-3em").text("However, in the end of June")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-2em").text("new cases seems to be")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-1em").text("picking up again")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("circle").attr("class","annotation3").attr("cx", 115).attr("cy", 60).attr("r", 50)
    .style("stroke", "black").style("fill", "transparent");
g.selectAll(".annotation3").attr("transform", "translate(600,600)");

