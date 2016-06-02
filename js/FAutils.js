var EPSILON = '\u03B5';

Metrics = {
	numSymbols : 0,
	length : 1
}

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
		
		// ins, outs, ins_nl, outs_nl
		var ins = [];
		var outs = [];
		var ins_nl = [];
		var outs_nl = [];
		
		for (var j = 0; j < data.edges.length; j++) {
			if (data.edges[j].arrows === "to") {
				if (data.edges[j].from === id) {
					outs.push(data.edges[j]);
					if(data.edges[j].to !== id) {
						outs_nl.push(data.edges[j]);
					}
					
					outEdges.push(j);
					data.edges[j].fromID = i;
				}
				if (data.edges[j].to === id) {
					ins.push(data.edges[j]);
					if(data.edges[j].from !== id) {
						ins_nl.push(data.edges[j]);
					}
					
					inEdges.push(j);
					data.edges[j].toID = i;
				}
			}
		}
		data.nodes[i].inEdges = inEdges;
		data.nodes[i].outEdges = outEdges;
		data.nodes[i].ins = ins;
		data.nodes[i].outs = outs;
		data.nodes[i].ins_nl = ins_nl;
		data.nodes[i].outs_nl = outs_nl;
		
		
		// indeg, outdeg
		var indeg = ins.length;
		var outdeg = outs.length;
		data.nodes[i].indeg = indeg;
		data.nodes[i].outdeg = outdeg;
		
		// nloops
		var loop_edges = [];
		for(var k = 0; k < inEdges.length; ++k) {
			if(data.edges[inEdges[k]].from === id) {
				loop_edges.push(inEdges[k]);
			}
		}
		for(var k = 0; k < outEdges.length; ++k) {
			if(data.edges[outEdges[k]].toID === id) {
				if(loop_edges.indexOf(outEdges[k]) == -1) {
					loop_edges.push(outEdges[k]);
				}
			}
		}
		var nloops = loop_edges.length;
		data.nodes[i].nloops = nloops;
		
		// indeg_nl, outdeg_nl
		data.nodes[i].indeg_nl = ins_nl.length;
		data.nodes[i].outdeg_nl = outs_nl.length;
	}
}

function FAClone(fa) {
	return jQuery.extend(true, {}, fa);
}

function calculateWeight(regex, metric) {
	if(typeof metric == 'undefined') {
		metric = Metrics.numSymbols;
	}
	
	switch(metric) {
	case Metrics.numSymbols:
		var count = 0;
		
		for(var i = 0; i < regex.length; ++i) {
			var code = regex.charCodeAt(i);
			// must be a-b,A-B,0-9,'-'
			if((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || (code === 45)) {
				++count;
			}
		}
		
		return count;
	case Metrics.length:
		return regex.length;
	default:
		return 1;
	}	
}