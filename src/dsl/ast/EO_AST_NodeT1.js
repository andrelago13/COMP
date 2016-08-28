/**
 * Represents node "T1" of the grammar.
 * 
 * Usage example:
 * 
 * 		["TYPE", EO_AST_NodeF (, EO_AST_NodeT1 ) ]
 * 
 * 	"TYPE" - one of EO_AST_NodeT1.ASTERISK, EO_AST_NodeT1.SLASH
 * 
 * @module Grammar
 * @class EO_AST_NodeT1
 */

var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EvalResult = require('dsl/ast/EvalResult').EvalResult;
var VarMap = require('dsl/ast/VarMap').VarMap;

EO_AST_NodeT1.ASTERISK = '*';
EO_AST_NodeT1.SLASH = '/';

function EO_AST_NodeT1(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeT1.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeT1.prototype.constructor = EO_AST_NodeT1;

EO_AST_NodeT1.prototype.eval = function(graph, result, vars) {
	var temp_result = new EvalResult();
	temp_result.init(graph.nodes.length);
	var tempvars = VarMap.cloneSet(vars);
	
	this.children[1].eval(graph, temp_result, tempvars);
	
	var type = this.children[0];
	switch(type) {
	case EO_AST_NodeT1.ASTERISK:
		result.operation(temp_result.getScores(), EvalResult.Operation.MUL);
		break;
	case EO_AST_NodeT1.SLASH:
		result.operation(temp_result.getScores(), EvalResult.Operation.DIV);
		break;
	}

	if(this.children.length === 2) {	// EO_AST_NodeT1 not present
		return;
	}
	tempvars = VarMap.cloneSet(vars);
	this.children[2].eval(graph, result, tempvars);
}

exports.EO_AST_NodeT1 = EO_AST_NodeT1;
