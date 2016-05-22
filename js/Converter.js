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
	this.fa = this.eliminateState(this.fa, 3);
	this.fa = this.eliminateState(this.fa, 2);
	console.log(this.fa);
	return this.fa;
	// TODO
	// return regex;
}

Converter.prototype.fixStartingState = function() {
	var oldStartID = findNodeByID(this.fa, "START");
	if (isNodeFinal(this.fa.nodes[oldStartID]) || this.fa.nodes[oldStartID].inEdges.length > 0) {
		this.fa.nodes[oldStartID].id = "START'";
		for (var i = 0; i < this.fa.edges.length; i++) {
			if (this.fa.edges[i].from === "START")
				this.fa.edges[i].from = this.fa.nodes[oldStartID].id;
			if (this.fa.edges[i].to === "START")
				this.fa.edges[i].to = this.fa.nodes[oldStartID].id;
		}
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
	var finalIDs = [];
	for (var i = 0; i < this.fa.nodes.length; i++) {
		if (isNodeFinal(this.fa.nodes[i]))
			finalIDs.push(i);
	}
	if (finalIDs.length === 1)
		return;

	// Create new final state
	var newID = this.fa.nodes.length;
	this.fa.nodes.push({
		id: newID,
		inEdges: [],
		label: "FINAL",
		outEdges: [],
		shape: "doublecircle",
		peripheries: 2
	});

	// Create new edges
	for (var i = 0; i < finalIDs.length; i++) {
		var node = this.fa.nodes[finalIDs[i]];
		var edgeID = this.fa.edges.length;
		this.fa.edges.push({
			arrows: "to",
			from: node.id,
			fromID: finalIDs[i],
			id: randomString(512),
			label: EPSILON,
			to: newID,
			toID: newID
		});
		node.outEdges.push(edgeID);
		this.fa.nodes[newID].inEdges.push(edgeID);
	}
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
		return undefined;
	return this.removeUnnecessaryStuff(label).replace(/\s+/g, '');
}

Converter.prototype.eliminateState = function(fa, stateID) {
	fa = FAClone(fa);
	var edgesToAdd = [];
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

			if (fa.edges[inEdgeID].fromID !== fa.edges[outEdgeID].toID)
				var directLabel = this.getMergedTransitionsLabel(fa, fa.edges[inEdgeID].fromID, fa.edges[outEdgeID].toID);

			var label = "";
			if (typeof beforeLabel != 'undefined')
				label += "(" + beforeLabel + ")";
			if (typeof loopLabel != 'undefined')
				label += "(" + loopLabel + ")*";
			if (typeof afterLabel != 'undefined')
				label += "(" + afterLabel + ")";
			/*if (typeof directLabel != 'undefined') {
				if (label === "")
					label = directLabel;
				else
					label += "+(" + directLabel +")";
			}*/
			label = this.removeUnnecessaryStuff(label);

			if (label === "") label = undefined;

			console.log(beforeLabel, "-", loopLabel, "-", afterLabel, "-", directLabel, "=", label.slice(0), label.length > 0 ? this.removeUnnecessaryStuff(label) : undefined);

			if (typeof label != 'undefined' || fa.edges[inEdgeID].fromID !== fa.edges[outEdgeID].toID)
				edgesToAdd.push([fa, fa.edges[inEdgeID].fromID, fa.edges[outEdgeID].toID, label.length > 0 ? this.removeUnnecessaryStuff(label) : undefined]);
		}
	}
	for (var i = 0; i < edgesToAdd.length; i++)
		addEdge(edgesToAdd[i][0], edgesToAdd[i][1], edgesToAdd[i][2], edgesToAdd[i][3]);
	removeNode(fa, stateID);
	return fa;
}

Converter.prototype.removeUnnecessaryStuff = function(s) {
	return this.removeUnnecessaryEpsilons(this.removeUnnecessaryParenthesis(s));
}

Converter.prototype.removeUnnecessaryParenthesis = function(s) {
	// http://codegolf.stackexchange.com/a/79440
	for(t=[],b='';
	s!=b;
	s=b.replace(/\(([^()]*)\)(?=(.?))/,(x,y,z,p)=>y.indexOf('+')<0?y:-t.push(b[p-1]=='*'|z=='*'?x:y)))
		b=s;
	for(b=0;
	s!=b;
	s=b.replace(/-\d+/,x=>t[~x]))
		b=s;
	return s;
}

Converter.prototype.removeUnnecessaryEpsilons = function(s) {
	if (s.length <= 1)
		return s;
	if (s[0] === EPSILON && s[1] !== '+')
		s = s.substring(1);
	if (s.length <= 1)
		return s;
	if (s[s.length - 1] === EPSILON && s[s.length - 2] !== '+')
		s = s.substring(0, s.length - 1);
	return s;
}