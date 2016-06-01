var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EvalResult = require('dsl/ast/EvalResult').EvalResult;

/*
 * Usage example:
 * 
 * 		["TYPE", EO_AST_NodeE]
 * 
 * 	"TYPE" - one of EO_AST_NodeAuto.Type
 */

EO_AST_NodeAuto.Type = {
	STATIC : 'static',
	DYNAMIC : 'dynamic'
}

function EO_AST_NodeAuto(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeAuto.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeAuto.prototype.constructor = EO_AST_NodeAuto;

EO_AST_NodeAuto.prototype.eval = function(graph, result, vars) {
	switch(this.children[0]) {
	case EO_AST_NodeAuto.Type.STATIC:
		result.setType(EvalResult.Type.STATIC);
		break;
	case EO_AST_NodeAuto.Type.DYNAMIC:
		result.setType(EvalResult.Type.DYNAMIC);
		break;
	}
	
	result.init(graph.nodes.length);
	this.children[1].eval(graph, result, vars);
}

exports.EO_AST_NodeAuto = EO_AST_NodeAuto;
