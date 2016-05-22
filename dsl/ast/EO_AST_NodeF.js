var EO_AST_Node = require('dsl/ast/EO_AST_Node');

function EO_AST_NodeF(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeF.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeF.prototype.constructor = EO_AST_NodeF;

exports.EO_AST_NodeF = EO_AST_NodeF;