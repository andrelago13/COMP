function EO_AST_Node(father) {
	this.children = [];
	this.father = father;
	
	if(typeof father != 'undefined') {
		father.addChild(this);
	}
	
	return this;
}

EO_AST_Node.prototype.constructor = EO_AST_Node;

EO_AST_Node.prototype.addChild = function(son) {
	this.addUnrepeated(son);
};

EO_AST_Node.prototype.addUnrepeated = function(node) {
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

EO_AST_Node.prototype.removeChildIfExists = function(child) {
	var index = -1;
	
	for(var i = 0; i < this.children.length; ++i) {
		if(child === this.children[i]) {
			index = i;
			break;
		}
	}
	
	if(index >= 0) {
		this.children.splice(index, 1);
	}
}

// MUST BE OVERRIDEN BY EVERY NODE
EO_AST_Node.prototype.eval = function(graph) {
	var scores = [];
	
	for(var i = 0; i < this.children.length; ++i) {
		scores.push(this.children[i].eval(graph));
	}
	
	return scores;
}


exports.EO_AST_Node = EO_AST_Node;