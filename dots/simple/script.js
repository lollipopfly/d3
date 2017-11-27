var svg = d3
  .select('body')
  .append('svg')
  .attr('width', 200)
  .attr('height', 200);

var circle = svg.selectAll('circle').data([57, 293, 32], function(d) {
  return d;
});

circle
  .enter()
  .append('circle')
  .attr('cx', function(d, i) {
    return i * 45 + Math.sqrt(d) / 2 + 10;
  })
  .attr('cy', 90)
  .attr('r', function(d) {
    return Math.sqrt(d);
  });

circle.exit().remove();
