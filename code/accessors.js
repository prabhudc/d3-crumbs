function accessors() {
  d3.select("body").select("svg").remove();
  d3.select("body").append("svg").attr("width","100%").attr("height","80%");

  d3.csv("files/movies.csv", (error, data) => processCSV(data));
}


function processCSV(data) {

  var xScale = d3.scaleLinear().domain([1, 8]).range([20, 470]);
  var yScale = d3.scaleLinear().domain([0, 40]).range([480, 20]);

  // console.log(Object.keys(data[0]));
  Object.keys(data[0]).forEach(function(key) {
    if (key != "day") {
      var movieArea = d3.line()
        .x(d => xScale(d.day))
        .y(d => yScale(d[key]))
        .curve(d3.curveCardinal);
    d3.select("svg")
      .append("path")
      .style("id", key + "Area")
      .attr("d", movieArea(data) + "Z")
      .attr("fill","gray")
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .style("opacity", .75);
  };

  });

var xAxis  = d3.axisBottom().scale(xScale).tickSize(540);
var yAxis = d3.axisRight().scale(yScale).tickSize(540);

d3.select("svg").append("g").attr("id","xAxisG").call(xAxis);
d3.select("svg").append("g").attr("id","yAxisG").call(yAxis);


}
