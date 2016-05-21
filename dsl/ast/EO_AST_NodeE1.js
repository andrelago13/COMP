var EO_AST_Node = require('dsl/ast/EO_AST_Node');

function EO_AST_NodeE1(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeE1.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeE1.prototype.constructor = EO_AST_NodeE1;

exports.EO_AST_NodeE1 = EO_AST_NodeE1;