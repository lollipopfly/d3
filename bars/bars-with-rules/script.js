var dataSet = [{"receive_date":"2013-11-04","responses":"100"},{"receive_date":"2013-11-05","responses":"200"},{"receive_date":"2013-11-06","responses":"300"},{"receive_date":"2013-11-07","responses":"350"},{"receive_date":"2013-11-08","responses":"100"},{"receive_date":"2013-11-09","responses":"641"},{"receive_date":"2013-11-10","responses":"1232"},{"receive_date":"2013-11-11","responses":"360"},{"receive_date":"2013-11-12","responses":"337"},{"receive_date":"2013-11-13","responses":"121"}];


d3.json("https://api.myjson.com/bins/4sw50", function(error, data) {
	var data = dataSet; // Use data from variable

	var margin = {top: 20, right: 20, bottom: 10, left: 50},
		h = 500,
		w = 600,
		barWidth = 40;

	// X scale
	var yScale = d3.scaleLinear()
			.domain([0, d3.max(data, function(d, i) {
				return d.responses
			})])
			.range([h, 0]);

	// Y scale
	var xScale = d3.scaleBand()
			.domain(data.map(function(d, i) {
				return d.receive_date
			}))
			.rangeRound([0, w]);

	// Make chart
	var chart = d3.select(".chart")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)

	var bar = chart.selectAll("g")
		.data(data)
		.enter().append("g");

	// Make X rule
	chart.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(45," + h + ")")
		.call(d3.axisBottom(xScale));

	// Make Y rule
	chart.append("g")
			.attr("class", "axis axis--y")
			.attr("transform", "translate(45, 0)")
			.call(d3.axisLeft(yScale).ticks(10))

	// Add Rect
	bar.append("rect")
			.attr("width", barWidth)
			.attr('x', function(d) {
				return margin.left + xScale(d.receive_date) + 5;
			})
			.attr("y", function (d, i) {
				return yScale(d.responses);
			})
			.attr("height", function (d, i) {
				return h - yScale(d.responses);
			});
});
