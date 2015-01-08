plugins = {};

plugins.walk = function($elem) {

  function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    } 
    if(mm<10){
      mm='0'+mm;
    } 
    return yyyy+'-'+mm+'-'+dd;
  }

  $elem.prepend("<svg class='chart'></svg>");

  var margin = { top: 10, right: 0, bottom: 25, left: 40 };
  var width = $elem.width() - margin.left - margin.right;
  var height = 300 - margin.top - margin.bottom;

  var y = d3.scale.linear()
  .range([height, 0]);

  var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("http://monitor.javierarce.com/api/month", function(error, json) {
    if (error) return console.warn(error);
    data = json;

    var barWidth = width/data.length;

    y.domain([0, d3.max(data, function(d) { return d.steps; } )]);

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

    chart.append("g")
    .attr("class", "y axis")
    .call(yAxis);

    var label = chart.append("text")
    .attr("x", function() {
      return (width/2) - (362/2) + margin.left - margin.right;
    })
    .attr("y", height)
    .attr("dy", "1.5em")
    .attr("font-size", ".7em")
    .attr("font-style", "italic")
    .text("Number of steps per day. The red bar indicates the current day.")
    .attr("text-anchor", "middle");

    var bar = chart.selectAll(".bar")
    .data(data.reverse())
    .enter()
    .append("rect")
    .attr("class", function(d) {
      var date = d.created_at.split("T")[0];
      if (date == getCurrentDate()) {
        return "bar today";
      } else {
        return "bar";
      }
    })
    .attr("transform", function(d, i) { return "translate(" + (2 + i * barWidth) + ", 0 )"; });

    bar
    .attr("y", function(d){ return d.steps ? y(d.steps) : height - 1; })
    .attr("height", function(d) { return d.steps ? height - y(d.steps) : 1; })
    .attr("width", barWidth - 1);


  });

};

