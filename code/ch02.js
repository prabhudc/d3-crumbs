function ch02_ex01() {
  d3.csv("files/cities.csv", (e, d) => {
    console.log(d);
  });
  d3.json("files/tweets.json", (e, d) => {
    // console.log(d.tweets);
    d.tweets.forEach(function(d) {
      console.log("User : " + d.user);
      console.log("Content : " + d.content);
      console.log("Timestamp : " + Date(Date.parse(d.timestamp)));
      d.retweets.forEach(function(d) {
        console.log("Retweets : " + d);
      });
      d.favorites.forEach(function(d) {
        console.log("Favorites : " + d);
      });
    });

  });
};

function ch02_ex02() {
  console.clear();
  var testArray = [88, 10000, 1, 75, 12, 35];
  // Gets the minimum
  d3.csv("files/cities.csv", data => {
        console.log(d3.min(data, function(el) {
          return el.population;
        }));

          console.log(d3.min(data, e1 => e1.population));
          //Gets the minimum and maximum

          console.log(d3.extent(data, function(el) {
            return el.population;
          }));
        });


      }

  function ch02_ex03(){
    d3.csv("files/cities.csv",function(error, data){
      if(error){
        console.log(error);
      }else{
        dataViz(data);
      };
    });

    function dataViz(data){
      console.log(data);
      d3.select("body")
        .selectAll("div.cities")
        .data(data)
        .enter()
        .append("div")
        .attr("class","cities")
        .html(d => d.label)
        .transition().duration(3000)
        ;

      d3.select("body").append("svg");

var yScale = d3.scaleLinear().domain([0,5555]).range([0,100]);

      d3.select("svg")
      .selectAll("rect")
      //.data([14, 68, 24500, 430, 19, 1000, 5555])
      .data([ 4500, 1000, 5555])
      .enter()
      .append("rect")
      .attr("class","rect-1")
      .attr("width",10)
      .attr("height",d => yScale(d))
      .attr("x", (d,i) => { return i += i*11; })
      .attr("y", d => 100-yScale(d))
      .style("opacity",1)
      ;


var yScale2 = d3.scaleLinear().domain([0,50,24500]).range([0,100]);

d3.select("body").append("svg").attr("class","svg-2");
  d3.select("svg.svg-2")
  .selectAll("rect")
  //.data([14, 68, 24500, 430, 19, 1000, 5555])
  .data([ 14, 68, 24500, 430, 19, 1000, 5555])
  .enter()
  .append("rect")
  .attr("class","rect-2")
  .attr("width",10)
  .attr("height",d => yScale2(d))
  .attr("x", (d,i) => { return i += i*11; })
  .attr("y", d => 100-yScale2(d))
  .style("opacity",1)
  .clamp(true)
  ;
    }
  }


  function ch02_ex04(){
    d3.csv("files/cities.csv",(error,data) => {
      if(error){
        console.log(error);
      }
      else {
        dataViz3(data);
      }
    });

    function dataViz3(data){

      var maxPop = d3.max(data, function(d){
        return parseInt(d.population);
      } );
      console.log(maxPop);
      var yScale = d3.scaleLinear().domain([0,12300000,maxPop]).range([0, 500]);

      d3.select("body").append("svg").attr("width","100%").attr("height",600);

      d3.select("svg")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", 20)
        .attr("height",(d) => yScale(parseInt(d.population)))
        .attr("x",(d,i) => { return (  i*22);})
        .attr("y",(d,i) => {
          return 500 - yScale(parseInt(d.population));
        })
        .style("fill","steelblue")
        .clamp(true)
        ;
    }
  }


  function ch02_ex05(){

    d3.json("files/tweets.json",(error,data) => {
      dataViz(data.tweets);
    });

    function dataViz(data) {
      nestedTweets = d3.nest()
                        .key( d => {
                          return d.user
                        })
                        .entries(data)
      ;

      nestedTweets.forEach(function (d){
        d.numTweets = d.values.length;
      } );


      var maxTweets = d3.max(nestedTweets, function (d){
        return d.numTweets;
      });

      // d3.select("body").style("background-color","#b29f94");
      d3.select("body").append("svg").attr("width","100%").attr("height","600");
      yScale = d3.scaleLinear().domain([0,maxTweets]).range([0,500]);

      d3.select("svg")
        .selectAll("rect")
        .data(nestedTweets)
        .enter()
        .append("rect")
        .attr("width","50")
        .attr("height",d => yScale(d.numTweets))
        .attr("x",(d,i) => i*52)
        .attr("y",d => 500 - yScale(d.numTweets))
        .style("fill","steelblue")
        .style("stroke-width","2px")
        ;



      console.log(maxTweets);
    };



  }
