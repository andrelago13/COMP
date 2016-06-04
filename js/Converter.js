var EvalResult = require('dsl/ast/EvalResult').EvalResult;
Converter.prototype = Object.create(Converter.prototype);
Converter.prototype.constructor = Converter;

function Converter(fa, ast) {
	this.fa = fa;
	this.ast = ast;
}

Converter.prototype.convert = function() {
	var faHistory = [{
		fa: FAClone(this.fa),
		explanation: "Initial FA."
	}];
	
	faHistory.push({
		fa: this.fixStartingState(faHistory.slice(-1)[0].fa),
		explanation: "Inserted auxiliary starting state."
	});
	faHistory.push({
		fa: this.fixFinalState(faHistory.slice(-1)[0].fa),
		explanation: "Inserted auxiliary final state."
	});
	var result = this.ast.eval(faHistory.slice(-1)[0].fa);
	var order = result.getOrder();
	var type = result.getType();
	while (faHistory.slice(-1)[0].fa.nodes.length > 2)
	{
		if (result.getType() == EvalResult.Type.DYNAMIC) {
			order = this.ast.eval(faHistory.slice(-1)[0].fa).getOrder();
		} else {
			order = this.ast.eval(faHistory[0].fa).getOrder();
		}
		
		var stateID;
		var lastFa = faHistory.slice(-1)[0].fa;
		do {
			stateID = order.shift();
		} while (stateID == lastFa.startID || isNodeFinal(lastFa.nodes[stateID]));
		faHistory.push({
			fa: this.eliminateState(lastFa, stateID),
			explanation: "Eliminated state '" + lastFa.nodes[stateID].label + "' (ID: '" + lastFa.nodes[stateID].id + "')."
		});
	
		// Fix IDs
		for (var i = 0; i < order.length; i++) {
			if (order[i] > stateID) order[i]--;
		}
	}
	
	console.log(faHistory);
	return { steps: faHistory, regex: faHistory.slice(-1)[0].fa.edges[0].label };
}

Converter.prototype.convertNodeIDArrayToNodeArrayIndex = function(oldArray) {
	var newArray = [];
	for (var i = 0; i < array1.length; i++) {
		newArray.push(this.fa.nodes[i].id);
	}
	return newArray;
}

Converter.prototype.fixStartingState = function(fa) {
	var newFa = FAClone(fa);
	var oldStartID = findNodeByID(newFa, "START");
	for (var i = 0; i < newFa.edges.length; i++) {
		if (newFa.edges[i].from === "START")
			newFa.edges[i].from = newFa.nodes[oldStartID].id;
		if (newFa.edges[i].to === "START")
			newFa.edges[i].to = newFa.nodes[oldStartID].id;
	}
	newFa.nodes.push({
		id: randomString(32),
		inEdges: [],
		label: "START",
		outEdges: [newFa.edges.length],
		shape: "circle"
	});
	newFa.edges.push({
		arrows: "to",
		from: newFa.nodes[newFa.nodes.length - 1].id,
		fromID: newFa.nodes.length - 1,
		id: randomString(32),
		label: EPSILON,
		to: newFa.nodes[oldStartID].id,
		toID: oldStartID
	})
	newFa.nodes[oldStartID].inEdges.push(newFa.edges.length - 1);
	newFa.startID = newFa.nodes.length - 1;
	return newFa;
}

Converter.prototype.fixFinalState = function(fa) {
	var newFa = FAClone(fa);
	
	// Push final states and make them non-final
	var finalIDs = [];
	for (var i = 0; i < newFa.nodes.length; i++) {
		if (isNodeFinal(newFa.nodes[i])) {
			finalIDs.push(i);
			makeNodeNotFinal(newFa.nodes[i]);
		}
	}

	// Create new final state
	var newID = newFa.nodes.length;
	newFa.nodes.push({
		id: newID,
		inEdges: [],
		label: "FINAL",
		outEdges: [],
		shape: "doublecircle",
		peripheries: 2
	});

	// Create new edges
	for (var i = 0; i < finalIDs.length; i++) {
		var node = newFa.nodes[finalIDs[i]];
		var edgeID = newFa.edges.length;
		newFa.edges.push({
			arrows: "to",
			from: node.id,
			fromID: finalIDs[i],
			id: randomString(32),
			label: EPSILON,
			to: newID,
			toID: newID
		});
		node.outEdges.push(edgeID);
		newFa.nodes[newID].inEdges.push(edgeID);
	}
	return newFa;
}

Converter.prototype.getMergedTransitionsLabel = function(fa, srcID, dstID) {
	var label = "";
	for (var i = 0; i < fa.nodes[srcID].outEdges.length; i++) {
		var edgeID = fa.nodes[srcID].outEdges[i];
		if (fa.edges[edgeID].toID !== dstID)
			continue;
		if (label === "")
			label = fa.edges[edgeID].label;
		else
			label += "+" + fa.edges[edgeID].label;
	}
	if (label === "")
		return undefined;
	return this.removeUnnecessaryStuff(label).replace(/\s+/g, '');
}

Converter.prototype.eliminateState = function(fa, stateID) {
	console.log(fa, stateID);
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
			
			var label = "";
			if (typeof beforeLabel != 'undefined') {
				if (this.needsParenthesis(beforeLabel))
					label += "(" + beforeLabel + ")";
				else
					label += beforeLabel;
			}
			if (typeof loopLabel != 'undefined') {
				if (loopLabel.length > 1)
					label += "(" + loopLabel + ")*";
				else
					label += loopLabel + "*";
			}
			if (typeof afterLabel != 'undefined') {
				if (this.needsParenthesis(afterLabel))
					label += "(" + afterLabel + ")";
				else
					label += afterLabel;
			}
			label = this.removeUnnecessaryStuff(label);

			if (label === "") label = undefined;

			if (typeof label != 'undefined' || fa.edges[inEdgeID].fromID !== fa.edges[outEdgeID].toID)
				edgesToAdd.push([fa, fa.edges[inEdgeID].fromID, fa.edges[outEdgeID].toID, label.length > 0 ? this.removeUnnecessaryStuff(label) : undefined]);
		}
	}
	for (var i = 0; i < edgesToAdd.length; i++)
		addEdge(edgesToAdd[i][0], edgesToAdd[i][1], edgesToAdd[i][2], edgesToAdd[i][3]);
	removeNode(fa, stateID);
	return fa;
}

Converter.prototype.needsParenthesis = function(s) {
	for (var i = 0; i < s.length; i++) {
		if (s[i] === '+')
			return true;
		if (s[i] === '(')
			break;
	}
	for (var i = s.length - 1; i >= 0; i--) {
		if (s[i] === '+')
			return true;
		if (s[i] === ')')
			break;
	}
	return false;
}

Converter.prototype.removeUnnecessaryStuff = function(s) {
	return this.removeUnnecessaryEpsilons(this.removeUnnecessaryParenthesis(s));
}

Converter.prototype.removeUnnecessaryParenthesis = function(str) {
	return str;
	console.log("a", str.slice(0));
	var i=0;
	var str = (function recur(s, b) {
		var c = str.charAt(i++);      // Get next char    
		if(!c || c == ')') return s;  // End of string or end of inner part
		if(c == '(') {
			var s1 = recur('', true), // Get inner part
			s2 = recur('');       // Get following part
			return s + (!b || s2 ? '('+s1+')' : s1) + s2;
		}
		return recur(s+c);            // Continue to next char
	})('');
	console.log("b", str.slice(0));
	return str;
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