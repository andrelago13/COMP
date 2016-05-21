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

	this.fixEmptyTransitions(data);
	addHelpfulInfoToNodesAndEdges(data);

	console.log("Validation result: " + this.validate(data));
	return data;
}

FALoader.prototype.fixEmptyTransitions = function(fa) {
	for (var i = 0; i < fa.edges.length; i++) {
		if (typeof fa.edges[i].label == 'undefined')
			fa.edges[i].label = EPSILON;
	}
	return fa;
}

FALoader.prototype.validate = function(fa) {
	return this.validateSingleStart(fa)
	&& this.validateFinalExistence(fa)
	&& this.validateNoUnreachable(fa)
	&& this.validateTransitions(fa);
}

FALoader.prototype.validateSingleStart = function(fa) {
	var count = 0;
	for (var i = 0; i < fa.nodes.length; i++) {
		if (fa.nodes[i].id === "START")
			count++;
	}
	return count === 1;
}

FALoader.prototype.validateFinalExistence = function(fa) {
	for (var i = 0; i < fa.nodes.length; i++) {
		if (isNodeFinal(fa.nodes[i]))
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
	/*for (var i = 0; i < fa.edges.length; i++) {
		if (typeof fa.edges[i].label == 'undefined')
			continue; // epsilon transition
		if ((fa.edges[i].label + "").length > 1)
			return false;
	}*/
	return true;
}