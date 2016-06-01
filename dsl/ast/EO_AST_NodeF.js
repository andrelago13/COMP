var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EO_AST_NodeV = require('dsl/ast/EO_AST_NodeV').EO_AST_NodeV;
var EO_AST_NodeLoop = require('dsl/ast/EO_AST_NodeLoop').EO_AST_NodeLoop;
var EO_AST_NodeE = require('dsl/ast/EO_AST_NodeE').EO_AST_NodeE;

/*
 * Usage example:
 * 
 * 		EO_AST_NodeV | "INT" | "REAL" | EO_AST_NodeLoop | EO_AST_NodeE
 * 
 * 	"INT" and "REAL" are actual values
 */

function EO_AST_NodeF(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	return this;
}

EO_AST_NodeF.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeF.prototype.constructor = EO_AST_NodeF;

EO_AST_NodeF.prototype.eval = function(graph, result) {
	var child = this.children[0];
	if(child instanceof EO_AST_NodeV) {
		child.eval(graph, result);
	} else if(child instanceof EO_AST_NodeLoop) {
		child.eval(graph, result);
	} else if(child instanceof EO_AST_NodeE) {
		child.eval(graph, result);
	} else {
		var score = [];
		console.log(this);
		for(var i = 0; i < graph.nodes.length; ++i) {
			score.push(child);
		}
		result.setScores(score);
	}
}

exports.EO_AST_NodeF = EO_AST_NodeF;