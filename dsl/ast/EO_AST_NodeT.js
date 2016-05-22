var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		[ EO_AST_NodeF ( , EO_AST_NodeT )]
 * 
 * 	If no NodeT exists, replaces itself by EO_AST_NodeF
 */

function EO_AST_NodeT(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeT.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeT.prototype.constructor = EO_AST_NodeT;

EO_AST_NodeT.prototype.eval = function(graph) {
	// TODO implement
}

exports.EO_AST_NodeT = EO_AST_NodeT;