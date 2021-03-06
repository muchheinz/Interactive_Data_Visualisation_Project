var data; // loaded asynchronously

//Albers projection values based on playing with ireland.json using D3's Albers Example
var proj = d3.geo.albers()
          .origin([-7.9,53.3])
          .scale(6000)
          .translate([450,270]);
var path = d3.geo.path().projection(proj);

var svg = d3.select("#chart")
  .append("svg");

var counties = svg.append("g")
    .attr("id", "ireland");

//Irish geoJSON based on https://gist.github.com/2183412
d3.json("ireland.json", function(json) {
  counties.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("class", "ireland")
      .attr("d", path);
});

d3.json("road-deaths-2010.json", function(json) {
  data = json;
  counties.selectAll("path")
      .attr("class", quantize);
});
 
function quantize(d) {
  return "q" + Math.min(8, ~~(data[d.properties.id] * 9 / 21)) + "-9";
}
