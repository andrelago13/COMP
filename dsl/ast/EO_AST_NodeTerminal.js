var EO_AST_Node = require('dsl/ast/EO_AST_Node');

/*
 * Usage example:
 * 
 * 		["NAME"]
 */

function EO_AST_NodeTerminal(father, name, value) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	this.name = name;
	this.value = value;
	
	return this;
}

EO_AST_NodeTerminal.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeTerminal.prototype.constructor = EO_AST_NodeTerminal;

EO_AST_NodeTerminal.prototype.eval = function(graph, result, vars) {
	// TODO implementar
	var scores = result.getScores();
	for(var i = 0; i < scores.length; ++i) {
		scores[i] = this.value;
	}
}

exports.EO_AST_NodeTerminal = EO_AST_NodeTerminal;