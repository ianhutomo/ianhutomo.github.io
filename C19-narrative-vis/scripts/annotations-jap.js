//annotation 1
g.append('line').attr("class","annotation1").style("stroke", "black")
    .attr("x1", 0).attr("y1", 0).attr("x2", 70).attr("y2", 70);
g.append("text").attr("class","annotation1").attr("x", -150).attr("y", 0).attr("dy","-4em").text("No Drastic Changes in")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation1").attr("x", -150).attr("y", 0).attr("dy","-3em").text("Lockdown Measures")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation1").attr("x", -150).attr("y", 0).attr("dy","-2em").text("Japan Stringency Index appear to be")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation1").attr("x", -150).attr("y", 0).attr("dy","-1em").text("relatively low and steady over time")
    .style("font-size", "12px").style("font-weight", "normal");
g.selectAll(".annotation1").attr("transform", "translate(180,350)");

//annotation 2
g.append('line').attr("class","annotation2").style("stroke", "black")
    .attr("x1", 30).attr("y1", 0).attr("x2", -50).attr("y2", 70);
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-4em").text("High New Cases")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-3em").text("Number")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-2em").text("New cases reached its peak after")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation2").attr("x", 0).attr("y", 0).attr("dy","-1em").text("no significant changes in lockdown")
    .style("font-size", "12px").style("font-weight", "normal");
g.selectAll(".annotation2").attr("transform", "translate(450,200)");

//annotation 3
g.append('line').attr("class","annotation3").style("stroke", "black")
    .attr("x1", 0).attr("y1", 0).attr("x2", 70).attr("y2", 40);
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-5em").text("New Cases")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-4em").text("Started to increase")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-3em").text("After stringency index lowered ")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-2em").text("further on June, new cases")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation3").attr("x", -50).attr("y", 0).attr("dy","-1em").text("started to increase")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("circle").attr("class","annotation3").attr("cx", 115).attr("cy", 60).attr("r", 50)
    .style("stroke", "black").style("fill", "transparent");
g.selectAll(".annotation3").attr("transform", "translate(600,600)");

//annotation 4
g.append('line').attr("class","annotation4").style("stroke", "black")
    .attr("x1", 30).attr("y1", 0).attr("x2", -80).attr("y2", 110);
g.append("text").attr("class","annotation4").attr("x", 0).attr("y", 0).attr("dy","-5em").text("New Cases Decreases")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation4").attr("x", 0).attr("y", 0).attr("dy","-4em").text("Significantly")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation4").attr("x", 0).attr("y", 0).attr("dy","-3em").text("Despite no drastic changes in")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation4").attr("x", 0).attr("y", 0).attr("dy","-2em").text("stringency index, new cases are")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation4").attr("x", 0).attr("y", 0).attr("dy","-1em").text("dropping in end of April")
    .style("font-size", "12px").style("font-weight", "normal");
g.selectAll(".annotation4").attr("transform", "translate(550,350)");