var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["TYPE", "IDENTIFIER", EO_AST_NodeV, EO_AST_NodeE]
 * 
 * 	"TYPE" - one of EO_AST_NodeLoop.SUM, EO_AST_NodeLoop.MUL
 * 	"IDENTIFIER" - actual string with identifier's name
 */

EO_AST_NodeLoop.SUM = 'SUM';
EO_AST_NodeLoop.MUL = 'MUL';

function EO_AST_NodeLoop(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeLoop.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeLoop.prototype.constructor = EO_AST_NodeLoop;

EO_AST_NodeLoop.prototype.eval = function(graph) {
	// TODO implement
}

exports.EO_AST_NodeLoop = EO_AST_NodeLoop;