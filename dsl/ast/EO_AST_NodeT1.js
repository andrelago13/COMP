var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["TYPE", EO_AST_NodeF (, EO_AST_NodeT1 ) ]
 * 
 * 	"TYPE" - one of EO_AST_NodeT1.ASTERISK, EO_AST_NodeT1.SLASH
 */

EO_AST_NodeT1.ASTERISK = '*';
EO_AST_NodeT1.SLASH = '/';

function EO_AST_NodeT1(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeT1.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeT1.prototype.constructor = EO_AST_NodeT1;

exports.EO_AST_NodeT1 = EO_AST_NodeT1;