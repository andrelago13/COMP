/**
 * Represents node "Random" of the grammar.
 * 
 * Usage:
 * 
 * 		"random"
 * 
 * @module Grammar
 * @class EO_AST_NodeRandom
 */

var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EvalResult = require('dsl/ast/EvalResult').EvalResult;

function EO_AST_NodeRandom(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeRandom.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeRandom.prototype.constructor = EO_AST_NodeRandom;

EO_AST_NodeRandom.prototype.eval = function(graph, result, vars) {
	result.init(graph.nodes.length);
	result.setType(EvalResult.Type.STATIC);
	
	var temp_nodes = [];
	for(var i = 0; i < graph.nodes.length; ++i) {
		temp_nodes.push(i);
	}
	var order = [];
	while(temp_nodes.length > 0) {
		var index = Math.floor(Math.random() * temp_nodes.length);
		order.push(temp_nodes[index]);
		temp_nodes.splice(index, 1);
	}
	result.setOrder(order);
}

exports.EO_AST_NodeRandom = EO_AST_NodeRandom;