var dataSet = [
  { receive_date: '2013-11-04', responses: '100' },
  { receive_date: '2013-11-05', responses: '200' },
  { receive_date: '2013-11-06', responses: '300' },
  { receive_date: '2013-11-07', responses: '350' },
  { receive_date: '2013-11-08', responses: '100' },
  { receive_date: '2013-11-09', responses: '1200' },
  { receive_date: '2013-11-10', responses: '12' },
  { receive_date: '2013-11-11', responses: '360' },
  { receive_date: '2013-11-12', responses: '337' },
  { receive_date: '2013-11-13', responses: '121' }
];

d3.json('https://api.myjson.com/bins/4sw50', function(error, data) {
  var data = dataSet; // Use data from variable

  var margin = { top: 20, right: 20, bottom: 10, left: 50 },
    h = 500,
    w = 600,
    barWidth = 40;

  // Make chart
  var chart = d3
    .select('.chart')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom);

  // X scale
  var xScale = d3
    .scaleBand()
    .domain(
      data.map(function(d, i) {
        return d.receive_date;
      })
    )
    .rangeRound([0, w]);

  // Y scale
  var yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function(d, i) {
        return parseInt(d.responses);
      })
    ])
    .range([h, 0]);

  // Add container for bars
  var bars = chart.append('g').attr('class', 'bars');
  var bar = bars
    .selectAll('rect')
    .data(data)
    .enter();

  // Make X rule
  var offsetXRule = h + 10;
  chart
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(45,' + offsetXRule + ')')
    .call(d3.axisBottom(xScale));

  // Make Y rule
  chart
    .append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(45, 10)')
    .call(d3.axisLeft(yScale).ticks(10));

  // Add Rect
  bar
    .append('rect')
    .attr('width', barWidth)
    .attr('x', function(d) {
      return margin.left + xScale(d.receive_date) + 5;
    })
    .attr('y', function(d, i) {
      return yScale(d.responses) + 10;
    })
    .attr('height', function(d, i) {
      return h - yScale(d.responses);
    });
});
