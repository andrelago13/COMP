FALoader.prototype = Object.create(FALoader.prototype);
FALoader.prototype.constructor = FALoader;

/**
 * This class creates a simple interface for external applications to load and validate finite automatas.
 * 
 * It includes all sort of validations to ensure the ".dot" file given is a valid file and represents a valid FA
 *  @class FALoader
 *  @module FiniteAutomata
 */

/**
 * @class FALoader
 * @constructor
 * @param dotString String with the dot files's content, which must yet be parsed
 */
function FALoader(dotString) {
	this.dotString = dotString;
	this.startNodeID = -1;
}

/**
 * Parses the dot file content using "vis".
 * After parsing, adds the usefult information to the nodes and edges (see FAutils.js)
 * 
 * @method load
 */
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

/**
 * Assign the EPSILON label to all non-labeled edges
 * 
 * @method fixEmptyTransitions
 * @param fa input finite automata
 * @return the processed automata
 */
FALoader.prototype.fixEmptyTransitions = function(fa) {
	for (var i = 0; i < fa.edges.length; i++) {
		if (typeof fa.edges[i].label == 'undefined')
			fa.edges[i].label = EPSILON;
	}
	return fa;
}

/**
 * Validates a finite automata, see:
 *  - validateSingleStart
 *  - validateFinalExistence
 *  - validateNoUnreachable
 *  - validateTransitions
 *  
 *  @method validate
 *  @param fa input finite automata
 *  @return true if the automata is valid, false otherwise
 */
FALoader.prototype.validate = function(fa) {
	return this.validateSingleStart(fa)
	&& this.validateFinalExistence(fa)
	&& this.validateNoUnreachable(fa)
	&& this.validateTransitions(fa);
}

/**
 * Ensures the finite automata has only one start node
 * 
 * @method validateSingleStart
 * @param fa input finite automata
 * @return true if the automata has only one start node, false otherwise
 */
FALoader.prototype.validateSingleStart = function(fa) {
	var count = 0;
	for (var i = 0; i < fa.nodes.length; i++) {
		if (fa.nodes[i].id === "START") {
			count++;
			this.startNodeID = i;
		}
	}
	if (count === 1)
		return true;
	
	console.error("Error parsing FA. Expected 1 node with ID 'START' but found " + count + ".");
	return false;
}


/**
 * Ensures the finite automata has at least one final node
 * 
 * @method validateFinalExistence
 * @param fa input finite automata
 * @return true if the automata has at least one final node, false otherwise
 */
FALoader.prototype.validateFinalExistence = function(fa) {
	for (var i = 0; i < fa.nodes.length; i++) {
		if (isNodeFinal(fa.nodes[i]))
			return true;
	}
	console.error("No final state found in the graph, it should have at least one final state.");
	return false;
}

/**
 * Ensures the finite automata has no unreachable nodes
 * 
 * @method validateNoUnreachable
 * @param fa input finite automata
 * @return true if the automata has no unreachable nodes, false otherwise
 */
FALoader.prototype.validateNoUnreachable = function(fa) {
	var visited = [];
	for (var i = 0; i < fa.nodes.length; i++) {
		visited.push(false);
	}
	var stack = [this.startNodeID];
	visited[this.startNodeID] = true;
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
		if (!visited[i]) {
			console.error("State with id '" + fa.nodes[i].id + "' and label '" + fa.nodes[i].label + "' is unreachable.");
			return false;
		}
	}
	return true;
}

/**
 * Ensures all edges in the finite automata have a valid label (single character)
 * 
 * @method validateTransitions
 * @param fa input finite automata
 * @return true if the automata labels all are a single character, false otherwise
 */
FALoader.prototype.validateTransitions = function(fa) {
	for (var i = 0; i < fa.edges.length; i++) {
		if (typeof fa.edges[i].label == 'undefined')
			continue; // epsilon transition
		if ((fa.edges[i].label + "").length !== 1) {
			console.error("Invalid transition label '" + (fa.edges[i].label + "") + "'.");
			return false;
		}
	}
	return true;
}