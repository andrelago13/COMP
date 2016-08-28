/**
 * Represents node "E" of the grammar.
 * 
 * Usage example:
 * 
 * 		[ EO_AST_NodeT ( , EO_AST_NodeE1 ) ]
 * 
 * If EO_AST_NodeE1 does not exist, the node replaces itself by EO_AST_NodeT
 * 
 * @module Grammar
 * @class EO_AST_NodeE
 */

var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EvalResult = require('dsl/ast/EvalResult').EvalResult;
var EO_AST_NodeE1 = require('dsl/ast/EO_AST_NodeE1').EO_AST_NodeE1;
var VarMap = require('dsl/ast/VarMap').VarMap;

function EO_AST_NodeE(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	return this;
}

EO_AST_NodeE.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeE.prototype.constructor = EO_AST_NodeE;

EO_AST_NodeE.prototype.eval = function(graph, result, vars) {
	var tempvars = VarMap.cloneSet(vars);
	this.children[0].eval(graph, result, tempvars);
	if(this.children.length === 1) {	// EO_AST_NodeE1 not present
		return;
	}

	tempvars = VarMap.cloneSet(vars);
	this.children[1].eval(graph, result, tempvars);
	
	/*var clonevars = VarMap.cloneSet(vars);
	var clonevars2 = VarMap.cloneSet(vars);
	
	this.children[0].eval(graph, result, clonevars);
	if(this.children.length === 1) {	// EO_AST_NodeE1 not present
		return;
	}
	
	var temp_result = new EvalResult();
	temp_result.init(graph.nodes.length);
	this.children[1].eval(graph, temp_result, clonevars2);
	
	var type = this.children[1].children[0];
	switch(type) {
	case EO_AST_NodeE1.PLUS:
		result.operation(temp_result.getScores(), EvalResult.Operation.ADD);
		break;
	case EO_AST_NodeE1.MINUS:
		result.operation(temp_result.getScores(), EvalResult.Operation.SUB);
		break;
	}*/
}

exports.EO_AST_NodeE = EO_AST_NodeE;
