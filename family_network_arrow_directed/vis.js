
function visualizeNetwork(width, height, nodes, links) {

    console.log(links);

    const centerX = width / 2;
    const centerY = height / 2;

    // this is what aligns our graph
    let force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

    // this is where our graph is going to be on the page
    let svg = d3.select(".graph-container").append("svg")
        .attr("width", width)
        .attr("height", height);

// build the arrows
    let markers = svg.append("svg:defs").selectAll("marker")
        .data(['end'])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 36)
        .attr("refY", -4)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

// add the links and the arrows
    let path = svg.append("svg:g").selectAll("path")
        .data(force.links())
        .enter().append("svg:path")
        //    .attr("class", function(d) { return "link " + d.type; })
        .attr("class", "link")
        .attr('stroke', (link) => link.color)
        .attr("marker-end", "url(#end)");

// define the nodes
    let node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

// add text

    const text = svg
        .selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('pointer-events', 'none')
        .text((node) => node.name);

// add the nodes
    node.append("circle")
        .attr("r", 20)
        .attr('fill', (node) => node.color);


// add the curvy lines
    function tick() {
        text.attr('x', (node) => node.x).attr('y', (node) => node.y);
        text.attr('x', (node) => node.x).attr('y', (node) => node.y);
        path.attr("d", function (d) {
            let dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
        });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
    }
}

