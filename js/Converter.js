Converter.prototype = Object.create(Converter.prototype);
Converter.prototype.constructor = Converter;

function Converter(fa, ast) {
	this.fa = fa;
	this.ast = ast;
}

Converter.prototype.convert = function() {
	console.log(this.fa);
	this.fixStartingState();
	this.fixFinalState();
	this.eliminateState(this.fa, 2);
	console.log(this.fa);
	return this.fa;
	// TODO
	// return regex;
}

Converter.prototype.fixStartingState = function() {
	var oldStartID = findNodeByID(this.fa, 0);
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
			fromID: length - 1,
			id: (this.fa.edges.length - 1) + "",
			label: EPSILON,
			to: this.fa.nodes[oldStartID].id,
			toID: oldStartID
		})
	}
}

Converter.prototype.fixFinalState = function() {
	
}

Converter.prototype.eliminateState = function(fa, stateID) {
	for (var i = 0; i < fa.nodes[stateID].inEdges.length; i++) {
		var inEdgeID = fa.nodes[stateID].inEdges[i];
		if (fa.edges[inEdgeID].fromID === stateID)
			continue;
		var beforeLabel = fa.edges[inEdgeID].label;
		if (typeof beforeLabel == 'undefined')
			beforeLabel = EPSILON;
		
		var loopLabel = "";
		for (var j = 0; j < fa.nodes[stateID].outEdges.length; j++) {
			var outEdgeID = fa.nodes[stateID].outEdges[j];
			if (fa.edges[outEdgeID].toID === stateID) {
				if (loopLabel.length > 0)
					loopLabel += "+";
				loopLabel += fa.edges[outEdgeID].label + "";
			}
		}
		if (loopLabel.length === 0) loopLabel = EPSILON;
		
		for (var j = 0; j < fa.nodes[stateID].outEdges.length; j++) {
			var outEdgeID = fa.nodes[stateID].outEdges[j];
			if (fa.edges[outEdgeID].toID === stateID)
				continue;
			var afterLabel = fa.edges[outEdgeID].label;
			if (typeof afterLabel == 'undefined')
				afterLabel = EPSILON;
			
			var label = "";
			if (beforeLabel != EPSILON)
				label += "(" + beforeLabel + ")";
			if (loopLabel != EPSILON)
				label += "(" + loopLabel + ")*";
			if (afterLabel != EPSILON)
				label += "(" + afterLabel + ")";
			if (label === "") label = EPSILON;
			
			if (label !== EPSILON || fa.edges[inEdgeID].fromID !== fa.edges[outEdgeID].toID)
				addEdge(fa, fa.edges[inEdgeID].fromID, fa.edges[outEdgeID].toID, label.length > 0 ? label : undefined);
		}
	}
	removeNode(fa, stateID);
	//return newFA;
}