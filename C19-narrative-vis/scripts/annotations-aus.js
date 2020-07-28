const annotations = [
    {
      note: {
        label: "Stringency Index are increasing gradually",
        title: "Lockdown Measures Started to be Applied."
      },
      x: 280,
      y: 470,
      dy: -80,
      dx: -90
    },
    {
      note: {
        label: "Lockdown measures seems to correlate with decrease in daily new cases",
        title: "Decrease in Daily New Cases"
      },
      x: 385,
      y: 610,
      dy: -70,
      dx: 70
    },
    {
      //below in makeAnnotations has type set to d3.annotationLabel
      //you can add this type value below to override that default
      type: d3.annotationCalloutCircle,
      note: {
        label: "However, after stringency index lowered down, new cases seems to be picking up again",
        title: "New Cases Increase",
      },
      //settings for the subject, in this case the circle radius
      subject: {
        radius: 50
      },
      x: 760,
      y: 680,
      dy: -50,
      dx: -60
    }].map(function(d){ d.color = "#000000"; return d})

   // var annCountry = d3.select("#filter-3").property("value");

    const makeAnnotations = d3.annotation()
      .type(d3.annotationLabel)
      .annotations(annotations)

    d3.select("svg")
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations)