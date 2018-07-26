function transitions(){

  d3.select("body")
   .append("svg")
   .attr("width","100%")
   .attr("height","100%")
;

dataArray = [ 20, 30, 50,90,10];

d3.select("svg")
  .selectAll("rect")
  .data(dataArray)
  .enter()
  .append("rect")
  .attr("width", 20)
  .attr("height", d => d*2)
  .attr("x", (d,i) => i*22)
  .attr("y", (d,i) => 400 - d*2 )

  // .ease(d3.easeCubic)
;


d3.selectAll("rect")
  .transition()
  .duration(3000)
  .ease(d3.easeBounce)
  .attr("height", d => d*4)
  .attr("y", (d,i) => 400 - d*4 )
  .style("fill","steelblue")
;
}
