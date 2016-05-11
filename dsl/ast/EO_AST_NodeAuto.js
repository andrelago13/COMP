var EO_AST_Node = require('dsl/ast/EO_AST_Node');

function EO_AST_NodeAuto(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeAuto.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeAuto.prototype.constructor = EO_AST_NodeAuto;

exports.EO_AST_NodeAuto = EO_AST_NodeAuto;