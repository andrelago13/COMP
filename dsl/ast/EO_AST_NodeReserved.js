var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["NAME"]
 * 
 * See EO_AST_NodeReserved.Type
 * 
 */

EO_AST_NodeReserved.Type = {
		// Values
	INDEG : 0,		// number of "in" transitions to the state
	OUTDEG : 1,		// number of "out" transitions from the state
	INDEG_NL : 2,	// number of "in" transitions to the state without loops
	OUTDEG_NL : 3,	// number of "out" transitions from the state without loops
	NLOOPS : 4,		// number of loops in the state
		
		// Arrays
	INS : 5,		// "in" transitions of the state
	OUTS : 6,		// "out" transitions of the state
	INS_NL : 7,		// "in" transitions of the state without loops
	OUTS_NL : 8		// "out" transitions of the state without loops
}

function EO_AST_NodeReserved(father, name) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	this.type = null;
	
	switch(name) {
	case '#ins':
		this.type = EO_AST_NodeReserved.Type.INS;
		break;
	case '#outs':
		this.type = EO_AST_NodeReserved.Type.OUTS;
		break;
	case '#indeg':
		this.type = EO_AST_NodeReserved.Type.INDEG;
		break;
	case '#outdeg':
		this.type = EO_AST_NodeReserved.Type.OUTDEG;
		break;
	case '#indeg_nl':
		this.type = EO_AST_NodeReserved.Type.INDEG_NL;
		break;
	case '#outdeg_nl':
		this.type = EO_AST_NodeReserved.Type.OUTDEG_NL;
		break;
	case '#nloops':
		this.type = EO_AST_NodeReserved.Type.NLOOPS;
		break;
	case '#ins_nl':
		this.type = EO_AST_NodeReserved.Type.INS_NL;
		break;
	case '#outs_nl':
		this.type = EO_AST_NodeReserved.Type.OUTS_NL;
		break;
	}
	
	return this;
}

EO_AST_NodeReserved.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeReserved.prototype.constructor = EO_AST_NodeReserved;

EO_AST_NodeReserved.prototype.isValue = function() {
	switch(this.type) {
	case EO_AST_NodeReserved.Type.INDEG:
		return true;
	case EO_AST_NodeReserved.Type.OUTDEG:
		return true;
	case EO_AST_NodeReserved.Type.INDEG_NL:
		return true;
	case EO_AST_NodeReserved.Type.OUTDEG_NL:
		return true;
	case EO_AST_NodeReserved.Type.NLOOPS:
		return true;
	}	
	
	return false;
}

EO_AST_NodeReserved.prototype.isArray = function() {
	switch(this.type) {
	case EO_AST_NodeReserved.Type.INS:
		return true;
	case EO_AST_NodeReserved.Type.OUTS:
		return true;
	case EO_AST_NodeReserved.Type.INS_NL:
		return true;
	case EO_AST_NodeReserved.Type.OUTS_NL:
		return true;
	}	
	
	return false;
}

EO_AST_NodeReserved.prototype.eval = function(graph, result, vars) {
	switch(this.type) {
	case EO_AST_NodeReserved.Type.INS:
		var result_list = [];
		for(var i = 0; i < graph.nodes.length; ++i) {
			result_list.push(graph.nodes[i].ins);
		}
		return result_list;
	case EO_AST_NodeReserved.Type.OUTS:
		var result = [];
		for(var i = 0; i < graph.nodes.length; ++i) {
			result.push(graph.nodes[i].outs);
		}
		return result;
	case EO_AST_NodeReserved.Type.INDEG:
		var scores = result.getScores();
		
		for(var i = 0; i < graph.nodes.length; ++i) {
			scores[i] = graph.nodes[i].indeg;
		}
		
		return;
	case EO_AST_NodeReserved.Type.OUTDEG:
		var scores = result.getScores();
		
		for(var i = 0; i < graph.nodes.length; ++i) {
			scores[i] = graph.nodes[i].outdeg;
		}
		
		return;
	case EO_AST_NodeReserved.Type.INDEG_NL:
		var scores = result.getScores();
		
		for(var i = 0; i < graph.nodes.length; ++i) {
			scores[i] = graph.nodes[i].indeg_nl;
		}
		
		return;
	case EO_AST_NodeReserved.Type.OUTDEG_NL:
		var scores = result.getScores();
		
		for(var i = 0; i < graph.nodes.length; ++i) {
			scores[i] = graph.nodes[i].outdeg_nl;
		}
		
		return;
	case EO_AST_NodeReserved.Type.NLOOPS:
		var scores = result.getScores();
		
		for(var i = 0; i < graph.nodes.length; ++i) {
			scores[i] = graph.nodes[i].nloops;
		}
		
		return;
	case EO_AST_NodeReserved.Type.INS_NL:
		var result_list = [];
		for(var i = 0; i < graph.nodes.length; ++i) {
			result_list.push(graph.nodes[i].ins_nl);
		}
		return result_list;
	case EO_AST_NodeReserved.Type.OUTS_NL:
		var result_list = [];
		for(var i = 0; i < graph.nodes.length; ++i) {
			result_list.push(graph.nodes[i].outs_nl);
		}
		return result_list;
	}
}

exports.EO_AST_NodeReserved = EO_AST_NodeReserved;