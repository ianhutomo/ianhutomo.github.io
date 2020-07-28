const annotations = [
    {
      note: {
        label: "However, daily cases keep increasing at exponential rate",
        title: "Increase in New Cases Daily"
      },
      x: 400,
      y: 700,
      dy: -100,
      dx: -70
    },
    {
      //below in makeAnnotations has type set to d3.annotationLabel
      //you can add this type value below to override that default
      type: d3.annotationCalloutCircle,
      note: {
        label: "India has responded with drastic lockdown measures",
        title: "Almost Full Lockdown",
      },
      //settings for the subject, in this case the circle radius
      subject: {
        radius: 60
      },
      x: 300,
      y: 70,
      dy: 100,
      dx: 60
    }].map(function(d){ d.color = "#000000"; return d})

   // var annCountry = d3.select("#filter-3").property("value");

    const makeAnnotations = d3.annotation()
      .type(d3.annotationLabel)
      .annotations(annotations)

    d3.select("svg")
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotations)