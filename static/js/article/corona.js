console.log('load corona.js')

function init(data){
	processDataToCountries(data);
}

function processDataToCountries(data){
	let countryData = {'UK':[],'Italy':[]}
	data.forEach(function(d){
		let country = d['#country+name'];
		let value = {'key':d['#date+event'],'value':d['#affected+deaths']}
		countryData[country].push(value);
	})
	drawGraph(countryData);
}

function drawGraph(data){
	var margin = {top: 50, right: 50, bottom: 50, left: 50}
		width = $('#viz').width() - margin.left - margin.right
		height = 500 - margin.top - margin.bottom;

	var svg = d3.select('#viz').append("svg")
    	.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let italyData = data['Italy']

    var xScale = d3.scaleLinear()
	    .domain([0, italyData.length])
	    .range([0, width]);

	let yMax = d3.max(italyData,function(d){
	    	return d.value;
	    });

	var yScale = d3.scaleLog()
	    .domain([20, d3.max(italyData,function(d){
	    	console.log(d.value);
	    	return +d.value;
	    })])
	    .range([height, 0]);

	var line = d3.line()
	    .x(function(d, i) { return xScale(i); })
	    .y(function(d) { return yScale(d.value); })
	    .curve(d3.curveMonotoneX);

	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(xScale))
	   	.append("text")
	    .attr("dy", "-.75em")
	    .attr("y", 6)
	    .attr("x", width)
	    .style("text-anchor", "end")
	    .text("Days since 20 cases")
	    .attr("class",'axislabels');

	let yAxis = d3.axisLeft(yScale)
				.tickFormat(function (d) {
        			return yScale.tickFormat(15,d3.format(",d"))(d)
				});

	svg.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("transform", "rotate(-90)")
	    .attr("dy", ".75em")
	    .attr("y", 6)
	    .style("text-anchor", "end")
	    .text("Deaths")
	    .attr("class",'axislabels');

	for(country in data){
		let countryData = data[country];

		console.log(countryData);

		svg.append("path")
		    .datum(countryData)
		    .attr("class", "line"+country)
		    .attr("d", line);
	}
}