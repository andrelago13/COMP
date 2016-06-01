var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["NAME"]
 */

function EO_AST_NodeReserved(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeReserved.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeReserved.prototype.constructor = EO_AST_NodeReserved;

EO_AST_NodeReserved.prototype.eval = function(graph, result, vars) {
	// TODO implementar
}

exports.EO_AST_NodeReserved = EO_AST_NodeReserved;