function EO_AST_NODE() {
	this.children = [];
	this.father = null;
	
	return this;
}

EO_AST_NODE.prototype.constructor = EO_AST_NODE;

EO_AST_NODE.prototype.addChild = function(son) {
	this.addUnrepeated(son);
};

EO_AST_NODE.prototype.addUnrepeated = function(node) {
	var found = false;
	for(var i = 0; i < this.children.length; ++i) {
		if(this.children[i] == node) {
			found = true;
			break;
		}
	}
	if(!found)
		this.children.push(node);
};


exports.EO_AST_NODE = EO_AST_NODE;