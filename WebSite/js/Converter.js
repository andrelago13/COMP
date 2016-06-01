Converter.prototype = Object.create(Converter.prototype);
Converter.prototype.constructor = Converter;

function Converter(fa, ast) {
	this.fa = fa;
	this.ast = ast;
}

Converter.prototype.convert = function() {
	this.fa = FAClone(this.fa);
	this.fixStartingState();
	this.fixFinalState();
	return this.eliminateState(this.fa, 2);
	// TODO
	// return regex;
}

Converter.prototype.fixStartingState = function() {
	var oldStartID = findNodeByID(this.fa, "START");
	if (isNodeFinal(this.fa.nodes[oldStartID]) || this.fa.nodes[oldStartID].inEdges.length > 0) {
		this.fa.nodes.push({
			id: this.fa.nodes.length,
			inEdges: [],
			label: "START",
			outEdges: [this.fa.edges.length],
			shape: "circle"
		});
		this.fa.edges.push({
			arrows: "to",
			from: this.fa.nodes[this.fa.nodes.length - 1].id,
			fromID: this.fa.nodes.length - 1,
			id: randomString(512),
			label: EPSILON,
			to: this.fa.nodes[oldStartID].id,
			toID: oldStartID
		})
		this.fa.nodes[oldStartID].inEdges.push(this.fa.edges.length - 1);
	}
}

Converter.prototype.fixFinalState = function() {
	// Count number of final states
	var nFinal = 0;
	for (var i = 0; i < this.fa.nodes.length; i++) {
		if (isNodeFinal(this.fa.nodes[i]))
			nFinal++;
	}

	// TODO
}

Converter.prototype.getMergedTransitionsLabel = function(fa, srcID, dstID) {
	var label = "";
	for (var i = 0; i < fa.nodes[srcID].outEdges.length; i++) {
		var edgeID = fa.nodes[srcID].outEdges[i];
		if (fa.edges[edgeID].toID !== dstID)
			continue;
		if (label === "")
			label = "(" + fa.edges[edgeID].label + ")";
		else
			label += " + (" + fa.edges[edgeID].label + ")";
	}
	if (label === "")
		return EPSILON;
	return this.removeUnnecessaryParenthesis(label).replace(/\s+/g, '');
}

Converter.prototype.eliminateState = function(fa, stateID) {
	fa = FAClone(fa);
	for (var i = 0; i < fa.nodes[stateID].inEdges.length; i++) {
		var inEdgeID = fa.nodes[stateID].inEdges[i];
		if (fa.edges[inEdgeID].fromID === stateID)
			continue;

		var beforeLabel = this.getMergedTransitionsLabel(fa, fa.edges[inEdgeID].fromID, stateID);

		var loopLabel = this.getMergedTransitionsLabel(fa, stateID, stateID);
		
		for (var j = 0; j < fa.nodes[stateID].outEdges.length; j++) {
			var outEdgeID = fa.nodes[stateID].outEdges[j];
			if (fa.edges[outEdgeID].toID === stateID)
				continue;
			var afterLabel = this.getMergedTransitionsLabel(fa, stateID, fa.edges[outEdgeID].toID);
			
			var label = "";
			if (beforeLabel != EPSILON)
				label += "(" + beforeLabel + ")";
			if (loopLabel != EPSILON)
				label += "(" + loopLabel + ")*";
			if (afterLabel != EPSILON)
				label += "(" + afterLabel + ")";
			if (label === "") label = EPSILON;
			
			if (label !== EPSILON || fa.edges[inEdgeID].fromID !== fa.edges[outEdgeID].toID)
				addEdge(fa, fa.edges[inEdgeID].fromID, fa.edges[outEdgeID].toID, label.length > 0 ? this.removeUnnecessaryParenthesis(label) : undefined);
		}
	}
	removeNode(fa, stateID);
	return fa;
}

Converter.prototype.removeUnnecessaryParenthesis = function(s) {
   // Tokenize the pattern
   var pieces = s.split(/(\\.|\[(?:\\.|[^\]\\])+]|\((?:\?[:!=])?|\)(?:[*?+]\??|\{\d+,?\d*}\??)?)/g);
   var stack = [];
   for (var i = 0; i < pieces.length; i++) {
      if (pieces[i].substr(0,1) == "(") {
         // Opening parenthesis
         stack.push(i);
      } else if (pieces[i].substr(0,1) == ")") {
         // Closing parenthesis
         if (stack.length == 0) {
            // Unbalanced; Just skip the next one.
            continue;
         }
         var j = stack.pop();
         if ((pieces[j] == "(" || pieces[j] == "(?:") && pieces[i] == ")") {
             // If it is a capturing group, or a non-capturing group, and is
             // not followed by a quantifier;
             // Clear both the opening and closing pieces.
             pieces[i] = "";
             pieces[j] = "";
         }
      }
   }
   return pieces.join("");
}