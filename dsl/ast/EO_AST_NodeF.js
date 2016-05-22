var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		EO_AST_NodeV | "INT" | "REAL" | EO_AST_NodeLoop | EO_AST_NodeE
 * 
 * 	"INT" and "REAL" are actual values
 */

function EO_AST_NodeF(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeF.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeF.prototype.constructor = EO_AST_NodeF;

EO_AST_NodeF.prototype.eval = function(graph, result) {
	// TODO implement
}

exports.EO_AST_NodeF = EO_AST_NodeF;