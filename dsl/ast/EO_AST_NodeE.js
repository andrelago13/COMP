var EO_AST_Node = require('dsl/ast/EO_AST_Node');

EO_AST_NodeE.PLUS = '+';
EO_AST_NodeE.ASTERISK = '*';
EO_AST_NodeE.MINUS = '-';
EO_AST_NodeE.SLASH = '/';

function EO_AST_NodeE(father) {
	EO_AST_Node.EO_AST_Node.call(this, father);
	
	this.operators = [];
	
	return this;
}

EO_AST_NodeE.prototype = Object.create(EO_AST_Node.EO_AST_Node.prototype);
EO_AST_NodeE.prototype.constructor = EO_AST_NodeE;

EO_AST_NodeE.prototype.process = function() {
	if(this.children.length == 0)
		return;
	
	var new_children = [];
	
	for(var i = 0; i < this.operators.length; ++i) {
		new_children.push(this.children[i]);
		new_children.push(this.operators[i]);
	}
	new_children.push(this.children[this.children.length-1]);
	
	this.children = new_children;
}

EO_AST_NodeE.prototype.addOperator = function(op) {
	this.operators.push(op);
}

exports.EO_AST_NodeE = EO_AST_NodeE;