var EO_AST_Node = require('dsl/ast/EO_AST_Node');
var EO_AST_NodeM = require('dsl/ast/EO_AST_NodeManual');

function EO_AST() {
	this.root = null;
	
	return this;
}

EO_AST.prototype.constructor = EO_AST;

EO_AST.prototype.setRoot = function(node) {
	this.root = node;
};

EO_AST.prototype.getRoot = function() {
	return this.root;
};

EO_AST.prototype.addChild = function(father, son) {
	father.addChild(son);
};

exports.EO_AST = EO_AST;