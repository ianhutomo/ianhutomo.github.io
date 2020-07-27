const annotationsIndia = [
    {
      note: {
        label: "Basic settings with subject position(x,y) and a note offset(dx, dy)",
        title: "d3.annotationLabel"
      },
      x: 50,
      y: 150,
      dy: 137,
      dx: 162
    },
    {
      //below in makeAnnotations has type set to d3.annotationLabel
      //you can add this type value below to override that default
      type: d3.annotationCalloutCircle,
      note: {
        label: "A different annotation type",
        title: "d3.annotationCalloutCircle",
        wrap: 190
      },
      //settings for the subject, in this case the circle radius
      subject: {
        radius: 50
      },
      x: 620,
      y: 150,
      dy: 137,
      dx: 102
    }].map(function(d){ d.color = "#E8336D"; return d})

var annCountry = d3.select("#filter-3").property("value");

    const makeAnnotationsIndia = d3.annotation()
      .type(d3.annotationLabel)
      .annotations(annotationsIndia)

    d3.select("svg")
      .append("g")
      .attr("class", "annotation-group")
      .call(makeAnnotationsIndia)