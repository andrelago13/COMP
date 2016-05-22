var EPSILON = '\u03B5';

function isNodeFinal(node) {
	return node.peripheries === 2 || node.shape === "doublecircle"
}

function makeNodeNotFinal(node) {
	node.peripheries = 1;
	node.shape = "circle";
}

function findNodeByID(fa, id) {
	for (var i = 0; i < fa.nodes.length; i++) {
		if (fa.nodes[i].id === id)
			return i;
	}
	console.error('Node "' + id + '" not found.');
}

function randomString(length) {
	return Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
}

function addEdge(fa, from, to, label) {
	for (var i = 0; i < fa.edges.length; i++) {
		if (fa.edges[i].fromID === from && fa.edges[i].toID === to) {
			label += "+" + fa.edges[i].label;
			removeEdge(fa, i);
			i--;
		}
	}
	label = Converter.prototype.removeUnnecessaryStuff(label);
	var edge = {
			arrows: "to",
			from: fa.nodes[from].id,
			fromID: from,
			label: label,
			id: randomString(512),
			to: fa.nodes[to].id,
			toId: to
	}
	fa.edges.push(edge);
}

function removeEdge(fa, edgeID) {
	fa.edges.splice(edgeID, 1);
	addHelpfulInfoToNodesAndEdges(fa);
}

function removeNode(fa, nodeID) {
	fa.nodes.splice(nodeID, 1);
	for (var i = 0; i < fa.edges.length; i++) {
		if (fa.edges[i].fromID === nodeID || fa.edges[i].toID === nodeID) {
			fa.edges.splice(i, 1);
			i--;
		}
	}
	addHelpfulInfoToNodesAndEdges(fa);
}

function addHelpfulInfoToNodesAndEdges(data) {
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

function FAClone(fa) {
	return jQuery.extend(true, {}, fa);
}