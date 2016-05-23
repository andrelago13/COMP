var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EvalResult = require('dsl/ast/EvalResult').EvalResult;

/*
 * Usage example:
 * 
 * 		["INT", "INT", ...]
 * 
 * 	"INT" - number with the node's id
 */

function EO_AST_NodeManual(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeManual.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeManual.prototype.constructor = EO_AST_NodeManual;

EO_AST_NodeManual.prototype.eval = function(graph, result) {
	result.init(graph.nodes.length);
	result.setType(EvalResult.Type.STATIC);
	result.setOrder(this.children);
}

exports.EO_AST_NodeManual = EO_AST_NodeManual;