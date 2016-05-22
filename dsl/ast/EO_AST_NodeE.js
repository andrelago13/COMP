var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		[ EO_AST_NodeT ( , EO_AST_NodeE1 ) ]
 * 
 * 	If EO_AST_NodeE1 does not exist, replaces itself by EO_AST_NodeT
 */

function EO_AST_NodeE(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	return this;
}

EO_AST_NodeE.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeE.prototype.constructor = EO_AST_NodeE;

EO_AST_NodeE.prototype.eval = function(graph) {
	// TODO implement
}

exports.EO_AST_NodeE = EO_AST_NodeE;