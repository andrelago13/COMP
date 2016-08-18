var EPSILON = '\u03B5';

/**
 * Useful methods for finite automata manipulation. To see the available methods
 * please consult the file, all the methods are documented there.
 * 
 * @module FAutils
 */

/*
 * Ways to measure the quality of a Regular Expression
 */
Metrics = {
	numSymbols : 0, // Number of symbol characters (excludes parenthesis, commas, ...)
	length : 1		// Actual length of the RE string
}

/*
 * Returns true if the node is an acceptance node (using "vis" criteria)
 */
function isNodeFinal(node) {
	return node.peripheries === 2 || node.shape === "doublecircle"
}

/*
 * Gives a node the visual properties of a not final node (for use with "vis")
 */
function makeNodeNotFinal(node) {
	node.peripheries = 1;
	node.shape = "circle";
}

/*
 * Returns a node from the FA "fa", with the given id
 */
function findNodeByID(fa, id) {
	for (var i = 0; i < fa.nodes.length; i++) {
		if (fa.nodes[i].id === id)
			return i;
	}
	console.error('Node "' + id + '" not found.');
}

/*
 * Returns a random string with the given length (for example, for hashing)
 */
function randomString(length) {
	return Array(length+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, length);
}

/*
 * Adds an edge to the FA "fa"
 *  - "from" is the source node
 *  - "to" is the destination node
 *  - "label" is the edge's label (used in the RE)
 *  
 *  The created edge is assigned a random id (hash)
 */
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
			id: randomString(32),
			to: fa.nodes[to].id,
			toId: to
	}
	fa.edges.push(edge);
}

/*
 * Removes the edge with id "edgeID" from the FA "fa"
 */
function removeEdge(fa, edgeID) {
	fa.edges.splice(edgeID, 1);
	addHelpfulInfoToNodesAndEdges(fa);
}

/*
 * Removes the node with id "nodeID" from the FA "fa"
 */
function removeNode(fa, nodeID) {
	fa.nodes.splice(nodeID, 1);
	for (var i = 0; i < fa.edges.length; i++) {
		if (fa.edges[i].fromID === nodeID || fa.edges[i].toID === nodeID) {
			fa.edges.splice(i, 1);
			i--;
		}
	}
	if (nodeID < fa.startID) fa.startID--;
	addHelpfulInfoToNodesAndEdges(fa);
}

/*
 * Adds some helpful information to the nodes and edges of an FA.
 * 
 * Helpful information is all sorts of node data that can be used for node evaluation:
 *  - ins - edges to which the node is the destination
 *  - outs - edges to which the node is the source
 *  - ins_nl - not looping "in" edges (in edges to which the node is not the source)
 *  - outs_nl - not looping "out" edges (out edges to which the node is not the destination)
 *  - indeg - number of elements in "ins"
 *  - outdeg - number of elements in "outs"
 *  - indeg_nl - number of elements in "ins_nl"
 *  - outdeg_nl - number of elements in "outs_nl"
 *  - nloops - number of loops in the node (edges to which the node is both source and destination)
 */
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

/*
 * Clones the FA given
 */
function FAClone(fa) {
	return jQuery.extend(true, {}, fa);
}

/*
 * Calculates the weight of a regular expression given a certain metric.
 * 
 * The metric must be a value in the Metrics enum above.
 */
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