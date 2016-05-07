FALoader.prototype = Object.create(FALoader.prototype);
FALoader.prototype.constructor = FALoader;

function FALoader(dotString) {
	this.dotString = dotString;
}

FALoader.prototype.load = function() {
	var parsedData = vis.network.convertDot(this.dotString);

	var data = {
			nodes: parsedData.nodes,
			edges: parsedData.edges
	}

	this.addHelpfulInfoToNodesAndEdges(data);

	console.log(data);
	console.log("Validation result: " + this.validate(data));
	return data;
}

FALoader.prototype.addHelpfulInfoToNodesAndEdges = function(data) {
	for (var i = 0; i < data.nodes.length; i++) {
		var id = data.nodes[i].id;
		var inEdges = [];
		var outEdges = [];
		for (var j = 0; j < data.edges.length; j++) {
			if (data.edges[j].arrows === "to") {
				if (data.edges[j].from === id) {
					outEdges.push(j);
					data.edges[j].fromID = i;
				}
				if (data.edges[j].to === id) {
					inEdges.push(j);
					data.edges[j].toID = i;
				}
			}
		}
		data.nodes[i].inEdges = inEdges;
		data.nodes[i].outEdges = outEdges;
	}
}

FALoader.prototype.validate = function(fa) {
	return this.validateSingleStart(fa)
	&& this.validateFinalExistence(fa)
	&& this.validateNoUnreachable(fa)
	&& this.validateTransitions(fa);
}

FALoader.prototype.validateSingleStart = function(fa) {
	return fa.nodes.length > 0;
}

FALoader.prototype.validateFinalExistence = function(fa) {
	for (var i = 0; i < fa.nodes.length; i++) {
		if (fa.nodes[i].peripheries === 2 || fa.nodes[i].shape === "doublecircle")
			return true;
	}
	return false;
}

FALoader.prototype.validateNoUnreachable = function(fa) {
	var visited = [];
	for (var i = 0; i < fa.nodes.length; i++) {
		visited.push(false);
	}
	var stack = [0];
	while (stack.length > 0) {
		var top = stack.pop();
		
		visited[top] = true;
		for (var i = 0; i < fa.nodes[top].outEdges.length; i++) {
			var edgeID = fa.nodes[top].outEdges[i];
			
			if (!visited[fa.edges[edgeID].toID])
				stack.push(fa.edges[edgeID].toID);
		}
	}
	for (var i = 0; i < visited.length; i++) {
		if (!visited[i])
			return false;
	}
	return true;
}

FALoader.prototype.validateTransitions = function(fa) {
	// TODO
	return true;
}