var EO_AST_Node = require('dsl/ast/EO_AST_Node');

function EO_AST_NodeT(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeT.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeT.prototype.constructor = EO_AST_NodeT;

exports.EO_AST_NodeT = EO_AST_NodeT;