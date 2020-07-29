const annotations = [
    {
      note: {
        label: "Japan stringency index appear to be relatively low and steady over time",
        title: "No Drastic Changes in Lockdown Measures"
      },
      x: 200,
      y: 425,
      dy: -100,
      dx: -70
    },
    {
      note: {
        label: "After a period of time, daily new cases appears to be decreasing",
        title: "Decrease in New Cases Daily"
      },
      x: 510,
      y: 550,
      dy: -70,
      dx: 200
    },
    {
      //below in makeAnnotations has type set to d3.annotationLabel
      //you can add this type value below to override that default
      type: d3.annotationCalloutRect,
      note: {
        label: "Amid no drastic changes in lockdown measure",
        title: "New Cases Increased Signifcantly",
      },
      //settings for the subject, in this case the circle radius
      subject: {
        width: -170,
        height: 370
      },
      x: 500,
      y: 15,
      dy: 100,
      dx: 100
    }].map(function(d){ d.color = "#000000"; return d})

   // var annCountry = d3.select("#filter-3").property("value");

    const makeAnnotations = d3.annotation()
      .type(d3.annotationLabel)
      .annotations(annotations)

    d3.select("svg")
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations)