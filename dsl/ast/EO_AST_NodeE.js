var EO_AST_Node = require('dsl/ast/EO_AST_Node');

EO_AST_NodeE.PLUS = '+';
EO_AST_NodeE.ASTERISK = '*';

function EO_AST_NodeE(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeE.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeE.prototype.constructor = EO_AST_NodeE;

exports.EO_AST_NodeE = EO_AST_NodeE;