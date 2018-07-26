function toolTip() {

  dataArray = [20, 70, 80, 40, 98];

  //Crate svg element
  d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  // d3.select("body")
  //   .append("rect")
  //   .attr("class","tooltip")
  //   .attr("height",10)
  //   .attr("width",10)
  //   .style("left",10)
  //   .style("top",10)
  //   .attr("stroke","black")
  //   .attr("stroke-width","2px")
  //   ;

  var yRange = d3.scaleLinear().domain([0, 100]).range([0, 500]);

  d3.select("svg")
    .selectAll("rect")
    .data(dataArray)
    .enter()
    .append("rect")
    .attr("id", "bar")
    .attr("width", 30)
    .attr("height", d => yRange(d))
    .attr("x", (d, i) => i * 32)
    .attr("y", d => 500 - yRange(d))
    .style("fill", "steelblue")
  // .style("opacity",0)
  ;

  d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position","absolute")
    .attr("height", 40)
    .attr("width", 40)
    .style("opacity", 0)
    .style("left", 10)
    .style("top", 10)
    .style("background-color","#dcd8d8")
    .style("text-align","center");

  d3.selectAll("#bar")
    .on("mouseover", function(d, i) {
      d3.select(this)
        .transition()
        .duration(300)
        .style("opacity", 1);

      console.log(d3.event.pageX);

      d3.selectAll("div")
        .style("opacity", 1)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html("Value : " + d)
        ;
    })
    .on("mouseout", function(d, i) {
      d3.select(this)
        .transition()
        .duration(500)
        .style("opacity", 1);
        d3.selectAll("div")
          // .html("Value : " + d)
          .style("opacity", 0);
    });



  // var bars = d3.selectAll("bar.rect");
  //  bars.data(dataArray)
  //   .enter()
  //   .append("rect")
  //   .attr("name","tooltip")
  //   .attr("height",10)
  //   .attr("width",10)
  //   .attr("stroke","black")
  //   .attr("stroke-width","2px")
  //   .html(d => "Value : " + d)
  //   .style("opacity",0)
  //   .on("mouseover",function(d,i){
  //     tooltip.style("opacity",1);
  //   })
  //   ;


}
