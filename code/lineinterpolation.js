function lineInterpolation(){
d3.select("svg").html("");
  d3.csv("files/tweetdata.csv",function(error,data){
    processCSV(data);
  });
}


function processCSV(data){
  console.log(data);

xScale = d3.scaleLinear().domain([1,10.5]).range([20,480]);
yScale = d3.scaleLinear().domain([0,35]).range([480,20]);

// create svg component
d3.select("body")
  .append("svg")
  .attr("width","100%")
  .attr("height","100%")
;

// scatterplot for tweet count
d3.select("svg")
  .selectAll("circle.tweets")
  .data(data)
  .enter()
  .append("circle")
  .attr("class","tweets")
  .attr("r",5)
  .attr("cx",(d) => xScale(d.day))
  .attr("cy", (d) => yScale(d.tweets))
  .style("fill", "green")
  ;
// scatterplot for retweet count
d3.select("svg")
  .selectAll("circle.retweets")
  .data(data)
  .enter()
  .append("circle")
  .attr("class","retweets")
  .attr("r",5)
  .attr("cx",(d) => xScale(d.day))
  .attr("cy", (d) => yScale(d.retweets))
  .style("fill", "maroon")
  ;

d3.select("svg")
  .selectAll("circle.favorites")
  .data(data)
  .enter()
  .append("circle")
  .attr("class","favorites")
  .attr("r",5)
  .attr("cx",(d) => xScale(d.day))
  .attr("cy", (d) => yScale(d.favorites))
  .style("fill", "orange")
  ;

xAxis = d3.axisBottom().scale(xScale).tickSize(500);
yAxis = d3.axisRight().scale(yScale).tickSize(500);

d3.select("svg").append("g").attr("id","xAxisG").call(xAxis);
d3.select("svg").append("g").attr("id","yAxisG").call(yAxis);


var tweetLine =
  d3.line()
    .x(d => xScale(d.day))
    .y(d => yScale(d.tweets))
    .curve(d3.curveBasis)
;
var retweetLine =
  d3.line()
    .x(d => xScale(d.day))
    .y(d => yScale(d.retweets))
    .curve(d3.curveCardinal)
;
var favoritesLine =
  d3.line()
    .x(d => xScale(d.day))
    .y(d => yScale(d.favorites))
    .curve(d3.curveStep)
;

d3.select("svg")
  .append("path")
  .attr("d", tweetLine(data))
  .style("fill","none")
  .attr("stroke","green")
  .attr("stroke-width", "2px")
  ;
d3.select("svg")
  .append("path")
  .attr("d", retweetLine(data))
  .style("fill","none")
  .attr("stroke","maroon")
  .attr("stroke-width", "2px")
  ;
d3.select("svg")
  .append("path")
  .attr("d", favoritesLine(data))
  .style("fill","none")
  .attr("stroke","orange")
  .attr("stroke-width", "2px")
  ;


}
