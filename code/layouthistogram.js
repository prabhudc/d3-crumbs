function layoutHistogram(){
  d3.select("body").select("svg").remove();
  d3.select("body").append("svg").attr("width","100%").attr("height","100%");
  d3.json("files/tweets.json",(error,data) => {
    buildChart(data.tweets);
  })
}

function buildChart(data){
  console.log(data);

  var xScale = d3.scaleLinear().domain([0,5]).range([0,500]);
  var yScale = d3.scaleLinear().domain([0,10]).range([400,0]);

  var xAxis = d3.axisBottom().scale(xScale).ticks(5);

  // debugger;
  var histoChart = d3.histogram()
    .domain([0,5])
    .thresholds([0,1,2,3,4,5])
    .value(d => d.favorites.length);

  histoData = histoChart(data);

  console.log(histoData);

d3.select("svg")
  .selectAll("rect")
  .data(histoData)
  .enter()
  .append("rect")
  .attr("x", d => xScale(d.x0))
  .attr("y", d =>   yScale(d.length))
  .attr("width",d => xScale(d.x1 - d.x0 - .1) )
  .attr("height", d =>   400 - yScale(d.length))
  .style("fill","steelblue")
  ;


}//end of buildChart
