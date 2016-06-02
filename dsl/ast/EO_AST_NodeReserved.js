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
	case '#n_loops':
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
	switch(name) {
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
	switch(name) {
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
	// TODO implementar
	
	switch(this.type) {
	case EO_AST_NodeReserved.Type.INS:
		break;
	case EO_AST_NodeReserved.Type.OUTS:
		break;
	case EO_AST_NodeReserved.Type.INDEG:
		break;
	case EO_AST_NodeReserved.Type.OUTDEG:
		break;
	case EO_AST_NodeReserved.Type.INDEG_NL:
		break;
	case EO_AST_NodeReserved.Type.OUTDEG_NL:
		break;
	case EO_AST_NodeReserved.Type.NLOOPS:
		break;
	case EO_AST_NodeReserved.Type.INS_NL:
		break;
	case EO_AST_NodeReserved.Type.OUTS_NL:
		break;
	}
}

exports.EO_AST_NodeReserved = EO_AST_NodeReserved;