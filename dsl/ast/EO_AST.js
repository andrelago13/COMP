var EvalResult = require('dsl/ast/EvalResult').EvalResult;

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

// Returns an object with the type (static/dynamic) and the evaluated order for nodes to be removed
EO_AST.prototype.eval = function(graph) {
	var result = new EvalResult();
	
	this.root.eval(graph, result);
	
	return result;
};

exports.EO_AST = EO_AST;