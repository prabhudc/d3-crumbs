function createSoccerViz() {
  d3.select("body").html("");
  window.console.clear();

  d3.select("body")
    .append("div")
    .attr("id", "viz")
    .append("svg")
    .attr("width", "500")
    .attr("height", "500")
    .style("border", "1px lightgray solid");
  d3.select("body")
    .append("div")
    .attr("id", "controls");


  d3.csv("files/worldcup.csv", (error, data) => {
    overAllTeamViz(data)
  });

  function overAllTeamViz(data) {
    d3.select("svg")
      .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d, i) =>
        "translate(" + (i * 50) + ",0)");

    d3.selectAll("g.overallG")
      .append("circle")
      .attr("r", 20)
      .on("mouseover", highlightRegion)
      .on("mouseout", function() {
        d3.selectAll("g.overallG")
        .select("circle").classed("inactive", false).classed("active", false)
      })
      .style("fill","steelblue")
      ;
    d3.selectAll("g.overallG")
      .append("text")
      .attr("y", 30)
      .text(d => d.team)
      .style("font-size", "10px");



    const keys = Object.keys(data[0]).filter(
      function(d) {
        if (d !== "team" && d !== "region") {
          return d;
        }
      }
    );

    d3.select("#controls")
      .selectAll("button")
      .data(keys)
      .enter()
      .append("button")
      .on("click", buttonClick)
      .html(d => d);


      d3.selectAll("g.overallG")
        .select("circle")
        .on("mouseover", highlightRegion)
        .on("mouseout", function() {
          d3.selectAll("g.overallG")
          .select("circle").classed("inactive", false).classed("active", false)
        })
        .style("fill","steelblue")
        ;
        d3.selectAll("circle")
          .node()
        ;


    function buttonClick(dataPoint) {

      maxDataPointValue = d3.max(data, function(d, i) {
        return d[dataPoint];
      });

    var radiusScale = d3.scaleLinear()
     .domain([0,maxDataPointValue])
     .range([0,20]);

     d3.selectAll("g.overallG")
      .select("circle")
      .attr("r", function(d,i){
        return radiusScale(d[dataPoint])
      })
      .transition()
      .delay((d, i) => i * 100)
      .duration(500);



    }


    function highlightRegion(d){
      // console.log("over" +  data[index].team);
      d3.selectAll("g.overallG")
        .select("ciricle")
        .attr("class", p => p.region === d.region ? "active" : "inactive")
        ;
    }



  }

}
