var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["TYPE", EO_AST_NodeE]
 * 
 * 	"TYPE" - one of EO_AST_NodeAuto.typeSTATIC, EO_AST_NodeAuto.typeDYNAMIC
 */

EO_AST_NodeAuto.typeSTATIC = 'static';
EO_AST_NodeAuto.typeDYNAMIC = 'dynamic';

function EO_AST_NodeAuto(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeAuto.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeAuto.prototype.constructor = EO_AST_NodeAuto;

EO_AST_NodeAuto.prototype.eval = function(graph, result) {
	// TODO implement
}

exports.EO_AST_NodeAuto = EO_AST_NodeAuto;