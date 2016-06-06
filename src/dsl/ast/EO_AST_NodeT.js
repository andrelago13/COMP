var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EO_AST_NodeT1 = require('dsl/ast/EO_AST_NodeT1').EO_AST_NodeT1;
var EvalResult = require('dsl/ast/EvalResult').EvalResult;
var VarMap = require('dsl/ast/VarMap').VarMap;

/*
 * Usage example:
 * 
 * 		[ EO_AST_NodeF ( , EO_AST_NodeT1 )]
 * 
 * 	If no NodeT1 exists, replaces itself by EO_AST_NodeF
 */

function EO_AST_NodeT(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeT.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeT.prototype.constructor = EO_AST_NodeT;

EO_AST_NodeT.prototype.eval = function(graph, result, vars) {
	var tempvars = VarMap.cloneSet(vars);
	this.children[0].eval(graph, result, tempvars);
	if(this.children.length === 1) {	// EO_AST_NodeT1 not present
		return;
	}

	tempvars = VarMap.cloneSet(vars);
	this.children[1].eval(graph, result, tempvars);
	
	/*var temp_result = new EvalResult();
	temp_result.init(graph.nodes.length);
	this.children[1].eval(graph, temp_result, vars);
	
	var type = this.children[1].children[0];
	switch(type) {
	case EO_AST_NodeT1.ASTERISK:
		result.operation(temp_result.getScores(), EvalResult.Operation.MUL);
		break;
	case EO_AST_NodeT1.SLASH:
		result.operation(temp_result.getScores(), EvalResult.Operation.DIV);
		break;
	}*/
}

exports.EO_AST_NodeT = EO_AST_NodeT;
