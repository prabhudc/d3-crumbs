function scatter(){
  console.log("Hola");

  var scatterData = [
    {friends: 5, salary: 22000},
    {friends: 3, salary: 18000},
    {friends: 10, salary: 88000},
    {friends: 0, salary: 18000},
    {friends: 27, salary: 56000},
    {friends: 8, salary: 74000},
  ]


var xExtent = d3.extent(scatterData,(d,i) => d.salary);
var yExtent = d3.extent(scatterData,(d,i) => d.friends);

xScale = d3.scaleLinear().domain(xExtent).range([50,550]);
yScale = d3.scaleLinear().domain(yExtent).range([50,550]);

console.log(xScale);

d3.select("body")
  .append("svg")
  .attr("width","100%")
  .attr("height","80%")
;
  d3.select("svg").selectAll("circle")
  .data(scatterData)
  .enter()
  .append("circle")
  .attr("r",5)
  .attr("cx",(d,i) => xScale(d.salary))
  .attr("cy",(d,i) => yScale(d.friends))
  .style("fill","steelblue")
;

var xAxis = d3.axisBottom().scale(xScale).tickSize(550).ticks(8);
var yAxis = d3.axisRight().scale(yScale).tickSize(550).ticks(16);

d3.select("svg").append("g").attr("id","yAxisG").call(yAxis);
d3.select("svg").append("g").attr("id","xAxisG").call(xAxis);

// d3.selectAll("#xAxisG").attr("transform","translate(0,570)")


}
