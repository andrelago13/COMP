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

EO_AST_NodeManual.prototype.eval = function(graph, result, vars) {
	result.init(graph.nodes.length);
	result.setType(EvalResult.Type.STATIC);
	
	if(this.children.length != graph.nodes.length) {
		var str = "";
		for(var i = 0; i < graph.nodes.length - 1; ++i) {
			str += "" + i + ", ";
		}
		str += "" + (graph.nodes.length-1);
		
		errors.push({
			offendingSymbol: str,
			msg: "Manual node must have exactly as many node indexes as graph nodes.",
		});
		return;
	}
	
	var indexes = [];
	for(var i = 0; i < graph.nodes.length - 1; ++i) {
		indexes[i] = 0;
	}
	
	for(var i = 0; i < this.children.length; ++i) {
		if(this.children[i] < graph.nodes.length) {
			indexes[this.children[i]]++;
		}
	}
	
	var problem = false;
	for(var i = 0; i < indexes.length - 1; ++i) {
		if(indexes[i] < 1) {
			problem = true;
			break;
		}
	}
	if(problem) {
		var str = "";
		for(var i = 0; i < graph.nodes.length - 1; ++i) {
			str += "" + i + ", ";
		}
		str += "" + (graph.nodes.length-1);
		
		errors.push({
			offendingSymbol: str,
			msg: "Manual node must have exactly as many node indexes as graph nodes, and specify all indexes from 0 to the last node.",
		});
		return;
	}
	
	result.setOrder(this.children);
}

exports.EO_AST_NodeManual = EO_AST_NodeManual;