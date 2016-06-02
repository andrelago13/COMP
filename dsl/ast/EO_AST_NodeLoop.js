var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EO_AST_NodeReserved = require('dsl/ast/EO_AST_NodeReserved').EO_AST_NodeReserved;
var EvalResult = require('dsl/ast/EvalResult').EvalResult;
var VarMap = require('dsl/ast/VarMap').VarMap;

/*
 * Usage example:
 * 
 * 		["TYPE", "IDENTIFIER", EO_AST_NodeReserved, EO_AST_NodeE]
 * 
 * 	"TYPE" - one of EO_AST_NodeLoop.SUM, EO_AST_NodeLoop.MUL
 * 	"IDENTIFIER" - actual string with identifier's name
 */

EO_AST_NodeLoop.SUM = 'sum';
EO_AST_NodeLoop.MUL = 'mul';

function EO_AST_NodeLoop(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeLoop.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeLoop.prototype.constructor = EO_AST_NodeLoop;

EO_AST_NodeLoop.prototype.eval = function(graph, result, vars) {
	if(this.children.length != 4) {
		console.error("EO_AST_NodeLoop: expected 4 children, has " + this.children.length + ". Results may differ from expected.");
	}
	
	var type = this.children[0];
	var identifier = this.children[1];
	var reserved = this.children[2];
	var expr = this.children[3];
	
	if(!reserved.isArray()) {
		console.error("EO_AST_NodeLoop: expected reserved variable of type ARRAY, got \"" + reserved.type + "\".");
		return;
	}
	
	var reserved_arrays = reserved.eval(graph, result, vars);
	
	var num_nodes = graph.nodes.length;
	for(var node = 0; node < num_nodes; ++node) {
		var node_result = new EvalResult();
		node_result.init(num_nodes);
		
		if(type === EO_AST_NodeLoop.MUL) {
			node_result.getScores()[node] = 1;
		}
		
		for(var edge = 0; edge < reserved_arrays[node].length; ++edge) {
			var new_vars = VarMap.cloneSet(vars);
			new_vars[node].addVar(identifier, reserved_arrays[node][edge]);
			var temp_result = new EvalResult();
			temp_result.init(num_nodes);
			
			expr.eval(graph, temp_result, new_vars);
			
			switch(type) {
			case EO_AST_NodeLoop.SUM:
				node_result.operation(temp_result.getScores(), EvalResult.Operation.ADD);
				break;
			case EO_AST_NodeLoop.MUL:
				node_result.operation(temp_result.getScores(), EvalResult.Operation.MUL);
				break;
			}
		}
		
		result.getScores()[node] = node_result.getScores()[node];
	}
	
	
}

exports.EO_AST_NodeLoop = EO_AST_NodeLoop;