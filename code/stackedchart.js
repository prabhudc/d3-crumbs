function stackedChart(){
  d3.select("body").select("svg").remove();
  d3.select("body").append("svg").attr("width","100%").attr("height","100%");
  d3.csv("files/movies.csv",(error,data) => processChart(data));
}


function processChart(data){
  var fillScale = d3.scaleOrdinal()
  .domain(["titanic","avata","akira","frozen","deliverance","avengers"])
  .range(["#fcd88a","#cf7c1c","#93c464","#75734F","#5eafc6","#41a368"]);

  var xScale = d3.scaleLinear().domain([1,8]).range([20,470]);
  var yScale = d3.scaleLinear().domain([0, 55]).range([480, 20]);

Object.keys(data[0]).forEach(key => {
  if(key != "day"){
    var movieArea = d3.area()
    .x(d => xScale(d.day))
    .y0(d => yScale( getCurrHeight(d,key) - d[key] ))
    .y1(d => yScale(getCurrHeight(d,key)))
    .curve(d3.curveBasis)
    ;

  d3.select("svg")
    .append("path")
    .attr("d",movieArea(data))
    .attr("fill",fillScale(key))
    .attr("stroke","black")
    .attr("stroke-width","1px")
    ;
  }
})

xAxis = d3.axisBottom().scale(xScale);
d3.select("svg").append("g").call(xAxis);
};




function getCurrHeight(d,lineKey){
  // return d[lineKey];

  var newHeight = 0;
//   if(lineKey === "day")
//     return false;
Object.keys(d).forEach( key => {
if( key !== "day"){
  if( key !== lineKey){
    newHeight += parseInt(d[key]);
  }
  else {
     // newHeight += parseInt(d[key]);
     return newHeight;
  }
}
return true

})
console.log("d : " + d.day + " lineKey : " + d[lineKey] + " newHeight : " + newHeight);
// console.log(" lineKey : " + d[lineKey]);
// console.log(" newHeight : " + newHeight);
return newHeight;
}
