var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EvalResult = require('dsl/ast/EvalResult').EvalResult;
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

EO_AST_NodeT1.prototype.eval = function(graph, result, vars) {
	this.children[1].eval(graph, result, vars);
	if(this.children.length === 2) {	// EO_AST_NodeT1 not present
		return;
	}
	
	var temp_result = new EvalResult();
	temp_result.init(graph.nodes.length);
	this.children[2].eval(graph, temp_result, vars);
	
	var type = this.children[2].children[0];
	switch(type) {
	case EO_AST_NodeT1.ASTERISK:
		result.operation(temp_result.getScores(), EvalResult.Operation.MUL);
		break;
	case EO_AST_NodeT1.SLASH:
		result.operation(temp_result.getScores(), EvalResult.Operation.DIV);
		break;
	}
}

exports.EO_AST_NodeT1 = EO_AST_NodeT1;
