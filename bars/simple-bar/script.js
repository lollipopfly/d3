var data = [1, 4, 8, 15, 16, 23, 42,];

var h = 420,
		marginRight = 5,
		barWidth = 40 + marginRight,
		w = barWidth * data.length;

var yScale = d3.scaleLinear()
		.domain([0, d3.max(data) * 1.05]) /* исходный диапозон 0 - макс числа в массиве + lil padding top */
		.range([0, h]); /* результирующий диапазон данных. */

var xScale = d3.scaleBand()
		.domain(data)
		.rangeRound([0, w])

var chart = d3.select(".chart")
		.attr("height", h)
		.attr("width", w - marginRight);

var bar = chart.selectAll("g")
	.data(data)
	.enter().append("g")

bar.append("rect")
		.attr("width", barWidth - marginRight)
		.attr('x', xScale) // like return x(d)
		.attr("y", function (d, i) {
			return h;
		})
		.attr("height", 0)
		.transition()
		.duration(500)
		.attr("y", function (d, i) {
			return h - yScale(d);
		})
		.attr("height", function (d, i) {
			return yScale(d);
		});

bar.append("text")
		.attr("y", function(d) { return h - 2; })
		.attr('x', function(d) {
			return (xScale(d) + (barWidth / 2) - (marginRight / 2));
		})
		.attr("dx", ".35em")
		.text(function(d) { return d; });
