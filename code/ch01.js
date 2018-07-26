function ch01_ex01(){
  d3.select("body").html("");
  // d3.select("#work-block").html("<div id=\"borderdiv\"></div>");
//   someData = [1,2,3];
//   // var dataCSV = [][];
//   var dataCSV = [];
//   d3.csv("tstCsv.csv",(d) =>{
//     //console.log(d);
//     var i = 0;
//     d.forEach(function(d,i){
//       // console.log(d.ID + " " + d.name);
//       dataCSV[i].ID += d.ID;
//       dataCSV[i].name += d.name;
//       i+=1;
//     })
//
//   })
//   ;
// console.log(dataCSV);

  // d3.select("#work-block")
  //   .data(dataCSV)
  //   .enter()
  //   .filter((d,i) => d<=3)
  //   .append("span")
  //   .html(function(d,i){return "I am  :" + d.name;})
  //   .append("span")
  //   .html("again here")
  //   ;
  d3.select("body")
    .append("div")
    .style("border","1px blue solid")
    .html("Hello World!")
    ;
  d3.select("div")
    .style("background-color","green")
    .style("font-size","12px")
    .attr("id","newDivID")
    .attr("class","divClass")
    .on("click",() => {
      window.alert("I was clicked!");
    })
}

function ch01_ex02(){
//Create svg
d3.select("body").html("");

  d3.select("body")
    .append("svg")
    .attr("width","100%")
    .attr("height","100%")
    ;

    //begin circle
  d3.select("svg")
    .append("circle")
    .attr("cx","15")
    .attr("cy","15")
    .attr("r",10)
    .style("fill","red");
    //text
  d3.select("svg")
    .append("text")
    .attr("id","a")
    .attr("x","15")
    .attr("y","15")
    .text("begin")
    .style("opacity",0)
    ;


//line
  d3.select("svg")
    .append("line")
    .attr("x1",15)
    .attr("y1",15)
    .attr("x2",400)
    .attr("y2",400)
    .attr("stroke","black")
    .attr("stroke-width","2px")
    ;

    //end circle

  d3.select("svg")
    .append("circle")
    .attr("cx",400)
    .attr("cy",400)
    .attr("r",100)
    .style("fill","lightblue")
    ;
    //text
  d3.select("svg")
    .append("text")
    .attr("id","b")
    .attr("x","400")
    .attr("y","400")
    .text("end")
    .style("opacity",0)
    ;


  d3.selectAll("circle").transition().duration(3000).attr("cy",200);
  d3.selectAll("line").transition().duration(3000)
          .attr("y1",200)
          .attr("y2",200);
  d3.selectAll("text").transition().duration(3000)
          .attr("y",200);
  d3.selectAll("text").transition().duration(3000)
          .attr("y",200);
  // d3.select("#a").transition().delay(1000).style("opacity",1);
  // d3.select("#b").transition().delay(3000).style("opacity",1);
}
