function fdg(){
  //Create svg
d3.select("body")
  .append("svg")
  .attr("width","100%")
  .attr("height","80%")
;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().distance(75)
        .id(function(d) { return d.value;}))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(300, 300));

var nodes = [
    {"value": 4},
    {"value": 8},
    {"value": 15},
    {"value": 16},
    {"value": 23},
    {"value": 42}
];

simulation.nodes(nodes)

var links = [
    {"source":  8, "target":  4},
    {"source": 16, "target":  4},
    {"source": 16, "target":  8},
    {"source": 23, "target":  8},
    {"source": 23, "target": 15},
    {"source": 42, "target":  4},
    {"source": 42, "target": 15},
    {"source": 42, "target": 23}
];

simulation.force("link").links(links);

var linksel = svg.append("g")
    .attr("class", "link")
    .selectAll("line").data(links).enter().append("line")
    .style("stroke","black")
    ;

var nodesel = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

nodesel.append("circle")
    .attr("r",20)
    .style("stroke","black")
    .style("fill", "white");

nodesel.append("text")
    .attr("transform","translate(0,6)")
    .text(function (d) { return d.value; })
    .style("text-anchor", "middle")
    .style("font-size", "20px");

// replace "tick" with "end" for static layout
simulation.on("tick", ticked);

function ticked() {
    linksel.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodesel.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
}

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}
function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

}
