var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		[ "TYPE", EO_AST_NodeT ( , EO_AST_NodeE1 ) ]
 * 
 * 	"TYPE" is one of EO_AST_NodeE1.PLUS, EO_AST_NodeE1.MINUS
 */

EO_AST_NodeE1.PLUS = '+';
EO_AST_NodeE1.MINUS = '-';

function EO_AST_NodeE1(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeE1.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeE1.prototype.constructor = EO_AST_NodeE1;

EO_AST_NodeE1.prototype.eval = function(graph, result) {
	// TODO implement
}

exports.EO_AST_NodeE1 = EO_AST_NodeE1;