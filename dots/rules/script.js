var dataSet = [
	{
		name: 'Nabisco',
		color: '2877b4',
		protein: 12,
		calories: 10,
	},
	{
		name: 'Quaker Oats',
		color: 'f77f11',
		protein: 4,
		calories: 20,
	},
	{
		name: 'Kelloggs',
		color: '2ca02c',
		protein: 8,
		calories: 78,
	},
	{
		name: 'Ralston Purina',
		color: 'd62729',
		protein: 0,
		calories: 0,
	},
];
var circleRadius = 10;

// Get max value of calories (x axis)
var maxX = d3.max(dataSet, function(d) {
	return d.calories;
});

// Fake request
d3.json("https://api.myjson.com/bins/4sw50", function(error, data) {
	var data = dataSet; // Use data from variable

	var margin = {top: 30, right: 20, bottom: 20, left: 50},
		h = 500,
		w = 600;

	// X scale
	var xScale = d3.scaleLinear()
			.domain([0, d3.max(data, function(d, i) {
				return d.calories;
			})])
			.rangeRound([0, w]);

	// Y scale
	var yScale = d3.scaleLinear()
			.domain([0, d3.max(data, function(d, i) {
				return d.protein;
			})])
			.range([h, 0]);

	// Make chart
	var chart = d3.select(".chart")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom )

	var bar = chart.selectAll("g")
		.data(data)
		.enter().append("g");

	var topOffset = h + margin.bottom;
	// Make X rule
	chart.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(45," + topOffset + ")")
		.call(d3.axisBottom(xScale));

	// Make Y rule
	chart.append("g")
			.attr("class", "axis axis--y")
			.attr("transform", "translate(45, " + margin.bottom + ")")
			.call(d3.axisLeft(yScale).ticks(10))

	// LEGEND Y
	chart.append("g")
		.call(yScale)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 50)
		.attr("x", -margin.bottom)
		.attr("font-size", 14)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Protein (g)");

	// LEGEND X
	chart.append("g")
		.call(xScale)
	.append("text")
		.attr("y", h)
		.attr("x", w + margin.left)
		.attr("font-size", 14)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Calories");

	// Add Rect
	bar.append("circle")
		.attr('cx', function(d) {
			// lil margin
			if(d.calories >= maxX) {
				return xScale(d.calories) + margin.left;
			}

			return margin.left + xScale(d.calories) + circleRadius/2 + 5;
		})
		.attr('cy', function(d) {
			// lil margin
			if(d.protein === 0) {
				return yScale(d.protein);
			}

			return yScale(d.protein) + margin.top;
		})
		.attr('r', circleRadius)
		.attr('fill', function(d) {
			return '#' + d.color;
		})
});
