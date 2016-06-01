var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["NAME"]
 * 
 * For example "in"
 */

function EO_AST_NodeReserved(father, name) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	this.name = name;
	
	return this;
}

EO_AST_NodeReserved.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeReserved.prototype.constructor = EO_AST_NodeReserved;

EO_AST_NodeReserved.prototype.eval = function(graph, result, vars) {
	// TODO implementar
}

exports.EO_AST_NodeReserved = EO_AST_NodeReserved;