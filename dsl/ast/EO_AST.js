var EO_AST_NODE = require('dsl/ast/EO_AST_NODE');

function EO_AST() {
	this.allNodes = [];
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
	this.addUnrepeated(son);
};

EO_AST.prototype.addUnrepeated = function(node) {
	var found = false;
	for(var i = 0; i < this.allNodes.length; ++i) {
		if(this.allNodes[i] == node) {
			found = true;
			break;
		}
	}
	if(!found)
		this.allNodes.push(node);
};

exports.EO_AST = EO_AST;