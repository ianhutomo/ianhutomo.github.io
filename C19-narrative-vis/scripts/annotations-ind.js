//annotation 1
g.append('line').attr("class","annotation1").style("stroke", "black")
    .attr("x1", 0).attr("y1", 0).attr("x2", 125).attr("y2", 110);
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-4em").text("Increase in New")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-3em").text("Cases Daily")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-2em").text("However, daily cases keep increasing")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation1").attr("x", -100).attr("y", 0).attr("dy","-1em").text("at exponential rate")
    .style("font-size", "12px").style("font-weight", "normal");
g.selectAll(".annotation1").attr("transform", "translate(350,500)");

//annotation 3
g.append('line').attr("class","annotation3").style("stroke", "black")
    .attr("x1", -5).attr("y1", -65).attr("x2", -70).attr("y2", -145);
g.append("text").attr("class","annotation3").attr("x", 0).attr("y", 0).attr("dy","-5em").text("Going Full")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation3").attr("x", 0).attr("y", 0).attr("dy","-4em").text("Lockdown")
    .style("font-size", "14px").style("font-weight", "bold");
g.append("text").attr("class","annotation3").attr("x", 0).attr("y", 0).attr("dy","-3em").text("India has responded")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation3").attr("x", 0).attr("y", 0).attr("dy","-2em").text("with drastic lockdown")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("text").attr("class","annotation3").attr("x", 0).attr("y", 0).attr("dy","-1em").text("measures")
    .style("font-size", "12px").style("font-weight", "normal");
g.append("circle").attr("class","annotation3").attr("cx", -90).attr("cy", -200).attr("r", 60)
    .style("stroke", "black").style("fill", "transparent");
g.selectAll(".annotation3").attr("transform", "translate(350,250)");

