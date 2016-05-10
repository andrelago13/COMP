function isNodeFinal(node) {
	return node.peripheries === 2 || node.shape === "doublecircle"
}

function addEdge(fa, from, to, label) {
	var idLength = 512;
	var edge = {
			arrows: "to",
			from: fa.nodes[from].id,
			fromID: from,
			id: Array(idLength+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, idLength),
			to: fa.nodes[to].id,
			toId: to
	}
	if (label) edge.label = label;
	fa.edges.push(edge);
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