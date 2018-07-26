function boxPlot() {

  d3.csv("files/boxplots.csv", function(error, data) {

    createChart(data);
    // createBoxPlot(data);
  })


}

function createChart(data) {
  console.log(data);

  const xScale = d3.scaleLinear().domain([1, 8]).range([50, 550]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([550, 50]);
  const tickSize = 500;


  xAxis = d3.axisBottom().scale(xScale).tickSize(550).ticks(5);
  yAxis = d3.axisRight().scale(yScale).tickSize(550);
  //
  d3.select("body").append("svg").attr("width", "100%").attr("height", "80%");



  d3.select("svg")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", function(d) {
      return xScale(+d.day);
    })
    .attr("cy", (d) => yScale(+d.median))
    .style("fill", "steelblue");

  d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);
  d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);


d3.select("svg")
  .selectAll("g.box")
  .data(data)
  .enter()
  .append("g")
  .attr("class","box")
  .attr("transform",d => "translate(" + xScale(+d.day) + "," + yScale(d.median) + ")")
  .each(function(d,i){

    d3.select(this)
      .append("line")
      .attr("x1",0)
      .attr("x2",0)
      .attr("y1",(d,i) => {
        console.log("min : " + yScale(d.min) + ", max: " + yScale(d.max) + ", median: " +yScale( d.median))
        return yScale(d.min) - yScale(d.median)

      })
      .attr("y2",(d,i) => yScale(d.max) - yScale(d.median))
      .style("stroke","black")
      .style("stroke-width","3px")
    ;

    d3.select(this)
      .append("line")
      .attr("x1",-10)
      .attr("x2",10)
      .attr("y1",(d,i) => yScale(d.min) - yScale(d.median) )
      .attr("y2",(d,i) => yScale(d.min) - yScale(d.median) )
      .style("stroke","black")
      .style("stroke-width","3px")
    ;

    d3.select(this)
      .append("line")
      .attr("x1",-10)
      .attr("x2",10)
      .attr("y1",(d,i) => yScale(d.max) - yScale(d.median) )
      .attr("y2",(d,i) => yScale(d.max) - yScale(d.median))
      .style("stroke","black")
      .style("stroke-width","3px")
    ;

    d3.select(this)
      .append("rect")
      .attr("width",20)
      .attr("height",(d,i) => yScale(d.q1) - yScale(d.q3) )
      .attr("x",(d) => -10)
      .attr("y",(d) => yScale(d.q3) - yScale(d.median) )
      .style("fill","white")
      .style("stroke","black")
      .style("stroke-width","2px")
      // .style("opacity",0.75)
      ;


    d3.select(this)
      .append("line")
      .attr("x1",-10)
      .attr("x2",10)
      .attr("y1",0 )
      .attr("y2",0 )
      .style("stroke","gray")
      .style("stroke-width","3px")

    ;

  });


  // d3.select("svg")
  //   .selectAll("g.box")
  //   .data(data)
  //   .enter()
  //   .append("g")
  //   .attr("class","box")
  //   .append("rect")
  //   .attr("width",20)
  //   .attr("height",(d,i) => yScale(d.q1) - yScale(d.q3) )
  //   .attr("x",(d) => xScale(d.day))
  //   .attr("y",(d) => yScale(d.median))
    // .each(function(d,i){
    //   d3.select(this)
    //     .append("rect")
    //     .attr("width",20)
    //     .attr("height",(d,i) => yScale(d.q1) - yScale(d.q3) )
    //     .attr("x",(d) => xScale(d.day))
    //     .attr("y",(d) => yScale(d.median))
    // });
;
  }
